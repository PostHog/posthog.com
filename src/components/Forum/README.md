# Forum

The `/forum` app. Forum posts are Squeak questions with a `forumTopic`, so the forum reuses the question and reply APIs and components. The full API contract lives in `docs/forum-api.md` in [squeak-strapi](https://github.com/PostHog/squeak-strapi).

## Routes

| URL | View | Page file |
| --- | --- | --- |
| `/forum` | All posts | `src/pages/forum/index.tsx` |
| `/forum/following` | Posts from subscribed topics and tags | `src/pages/forum/following.tsx` |
| `/forum/drafts` | The signed-in user's drafts | `src/pages/forum/drafts.tsx` |
| `/forum/new` | New post; `?draft=<id>` edits a draft | `src/pages/forum/new.tsx` |
| `/forum/t/:topic` | One topic, pinned posts first | `src/pages/forum/t/[topic].tsx` |
| `/forum/t/:topic/tags` | A topic's tags (staff) | `src/pages/forum/t/[topic]/tags.tsx` |
| `/forum/p/:permalink` | One post and its comments | `src/pages/forum/p/[permalink].tsx` |
| `/forum/alerts` | Slack alerts for each topic and tag (staff) | `src/pages/forum/alerts.tsx` |

The page files return `null`. `Router` in `src/components/AppWindow/index.tsx` renders one `<Forum />` for every `/forum` path, so the sidebar and any open modal survive navigation. `t/` and `p/` are client-only routes; `vercel.json` rewrites them to their page HTML. Post permalinks live under `p/`, so no permalink can collide with `new`, `following`, or `t`.

## Files

| File | Contents |
| --- | --- |
| `index.tsx` | The app: picks the view from the URL, lays out the sidebar and main pane, and owns the modal state |
| `context.tsx` | `useForumActions()`: opens the topic form, delete dialog, and subscriptions dialog |
| `hooks.ts` | Data: `useForumTopics`, `useForumTags`, `useForumSubscriptions`, `useForumFeed`, `useForumPost` |
| `Sidebar.tsx` | New post, search, nav, topic list with staff menus, and the off-ramps. Collapses to a top bar below `@2xl` |
| `Feed.tsx`, `PostRow.tsx` | A post list with sorts (Latest, Active, Popular), the tag filter, infinite scroll, and empty states. Active and Popular sort by scores that Strapi stores on each post |
| `Thread.tsx` | One post: vote box, body, author edits, the Moderate menu, and the shared Squeak replies |
| `Composer.tsx` | The new post form, which also saves, edits, and publishes drafts. Authors choose only a topic; the server chooses tags when a post goes live |
| `Drafts.tsx`, `DeletePostDialog.tsx` | The drafts list, and the confirmation for deleting a post or draft |
| `FilterMenu.tsx` | Tag filter with a subscribe bell for each tag. On All posts it groups the tags by topic |
| `TopicSubscribeButton.tsx`, `ManageSubscriptions.tsx` | The bell beside a topic's name (a daily digest), and the subscription list, where moderators can choose "Every post" |
| `TopicForm.tsx`, `DeleteTopicDialog.tsx` | Staff tools for topics |
| `TopicTags.tsx` | Staff page for one topic's tags: search, add, edit the name and description, and delete or move to another tag |
| `ForumAlerts.tsx` | Staff page that sets which teams get a Slack message for each topic and tag. Saves with `PUT /api/teams/:id` |
| `LegacyQuestionsRedirect.tsx` | Sends old `/questions` paths to the forum inside the app. `vercel.json` has the same redirects for visitors who arrive from outside |
| `ForumMenu.tsx`, `VoteBox.tsx`, `TopicIcon.tsx` | Small shared pieces |

## Reused code

- **Replies:** `Replies`, `Reply`, and the reply `QuestionForm` read `CurrentQuestionContext`. `Thread` fills it from `useQuestion`, the same as `Question.tsx`. `Reply` uses `forumTopic.solutionsEnabled` to decide if a comment can be marked as the solution.
- **Suggestions:** the Squeak editor (`RichText`) opens a menu as you type. `@` finds people and inserts an `@name/id` mention. In forum posts, `#` also finds topics, tags, and posts, and inserts a normal Markdown link: `/forum/t/:topic`, `/forum/t/:topic?tag=:tag`, or `/forum/p/:permalink`. `:` and two letters finds emoji by shortcode, as in Slack, and a full shortcode such as `:tada:` turns into its emoji as you type the closing colon. The menus live in `Squeak/components/Suggestions.tsx`. The feed reads `?tag=` and turns that tag filter on.
- **New posts:** the Squeak `QuestionForm` with its `forum` option. On docs and other pages, the same form creates a forum post with "Choose for me" (or `#questions` if Jev cannot choose) and keeps the page slug. On blog-style pages (`/blog`, `/newsletter`, and others), it creates a comment that is not in the forum. The form keeps its sign-in step, image uploads, and spam field, and sends only the fields that the forum create route accepts.
- **Feeds:** `useQuestions` with the `sort`, `fields`, and `populate` options. The forum's conditions go inside `$and`, so the archive `$or` that `useQuestions` adds stays in place.
- **Search:** `AlgoliaSearchResults`, filtered to `type:question` and `isForum:true`. Hits open in the forum window at `/forum/p/:permalink`.

## Roles

| Role | Can |
| --- | --- |
| Anyone | Read, search, and filter |
| Signed in | Post, save drafts, delete their own posts, comment, upvote, follow a post, and subscribe to topics and tags (daily digest) |
| Community moderator (`isForumModerator`) | Also pin, lock, archive, move posts, edit their tags, and choose "Every post" emails |
| Staff moderator (`isModerator`) | Also delete any post, create, edit, and delete topics and tags, and ask Max to reply |

The server enforces every rule. The UI only hides controls that a role cannot use. Deleting a post also deletes every comment on it.

## Drafts

"Save draft" creates the post with `publishedAt: null`. Only its author and moderators can read it: for everyone else the server returns published posts only. "Publish" sets `publishedAt`, which is when the post earns its reputation and points and sends its new-post alerts.

## Topic data

- `icon` is the export name of a `@posthog/icons` icon, such as `IconRocket`. `TopicIcon` falls back to `IconMessage`.
- Tags belong to exactly one topic (`topic.tags`). A topic has at most 30. The server refuses a post tag from another topic, and a post that moves to another topic loses its tags and gets new ones from Jev.
- `solutionsEnabled` turns "Mark as solution" on for the topic. `aiRepliesEnabled` lets Max reply to new posts automatically; the thread only asks Max when it is on.
- Deleting a topic with posts moves them to another topic or deletes them. The API can also detach posts, but the forum does not offer that.
