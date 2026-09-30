# i18n

Translations for the home page. There is one YAML file per locale in `locales/`. The build turns each file other than `en.yml` into a copy of the home page at `/<code>`. For example, `pt.yml` becomes `/pt`.

## How it works

| Part | File | What it does |
|---|---|---|
| Strings | `locales/en.yml` | The English text for every key. This is the source of truth. |
| Translations | `locales/<code>.yml` | The same keys in another language. A key that is not in the file shows the English text. |
| Pages | `gatsby/i18n.ts` | Reads the YAML files. Creates `/` with `locale: 'en'`, and `/<code>` with `locale` and `messages` in its page context. |
| Lookup | `index.tsx` | `I18nProvider` reads a page's context. `useTranslation()` gives `t()` and `rich()`. |
| Routing | `middleware.ts` | Sends a visitor from `/` to `/<code>` when their `Accept-Language` ranks that locale above English. |

English ships in the JS bundle, so every page can show it. A translation ships only in the page data of its own `/<code>` page.

Each window gets the language of its own page. The taskbar and the desktop get the language of the current page.

## Keys

The keys match the labels in the home page translation spec: `meta.*`, `hero.*`, `section.<n>.*`, and `cookie.*`. For example, `hero.cta.button.1` is the "Get started" button in the hero. The YAML nests them, so `hero.cta.button.1` is `hero:` → `cta:` → `button:` → `1:`.

Some labels in the spec are also the start of other labels, for example `hero.cta.button.2` and `hero.cta.button.2.body`. YAML cannot nest these, so the text of the shorter label goes under `label`: `hero.cta.button.2.label`.

In the spec, text in `<…>` is not translated. Write it as-is inside the translation. A label that is only `<…>`, such as a product name or a command, has no key.

`meta.title` and `meta.description` also fill the Open Graph and Twitter tags.

## Use it in a component

```tsx
import { useTranslation } from 'i18n'

const Example = () => {
    const { t, rich } = useTranslation()

    return (
        <>
            <h2>{t('hero.body.2')}</h2>
            <p>{rich('hero.body.1', { highlight: (text) => <mark>{text}</mark> })}</p>
        </>
    )
}
```

- `t(key, vars?)` returns a string. `{name}` placeholders take their values from `vars`.
- `rich(key, tags, vars?)` returns React nodes. Use it for copy that has inline markup. `<tag>text</tag>` calls `tags.tag(text)`, and `<tag/>` calls `tags.tag('')`. Tags do not nest.

Keep the markup in the YAML, not the JSX, so a translator can move it. Word order is different in each language.

## What not to translate

Product names stay in English in every locale, for example "Product analytics", "Session replay", and "Feature flags". Also keep brand names, code, commands, and URLs in English. Window titles that look like file names, such as `home.mdx`, stay as they are. Do not add keys for them. Keep them in the JSX or in the product data (`src/hooks/useProducts.tsx`).

When a translated sentence contains a product name, write the name in English inside the translation.

## Add a string

1. Add the key and the English text to `locales/en.yml`.
2. Call `t()` or `rich()` with the key.
3. Do not edit the other locale files. After your PR merges, a workflow translates the key into each locale (see [Keep translations up to date](#keep-translations-up-to-date)). The page shows English until the translation merges.

If a key must stay in English in every locale, add it to the `untranslated` list at the top of `en.yml`.

The build warns about a key in a translation file that `en.yml` does not have. In development, the browser console warns about a key that `en.yml` does not have.

## Keep translations up to date

When a change to `locales/en.yml` merges to `master`, the [Sync translations](../../.github/workflows/i18n-sync.yml) workflow runs `scripts/i18n-sync.ts` for each locale:

1. It finds the keys whose English text is new or changed. `locales/.source/<code>.yml` records the English text that each translation came from. The script generates this file. Do not edit it.
2. It sends only those keys to Claude, with the rules in [What not to translate](#what-not-to-translate). A translation that loses or adds a tag or a `{placeholder}` fails. A failed key stays out of the file, so the page shows English, and the next run tries it again.
3. It keeps the translation of a renamed or moved key when the English text is the same, and it removes keys that `en.yml` no longer has.
4. It commits to the branch `i18n/sync-<code>` and opens a draft PR for that locale. There is only one open PR for each locale. If the PR is still open, the next English change goes into the same PR.
5. It posts one message to the volunteer reviewers' Slack channel, with a link to each PR.

Then the review has two stages:

1. **Volunteers.** A volunteer reviews the PR for their locale in GitHub (see [How to review a translation](#how-to-review-a-translation)). A maintainer commits their suggestions, then marks the PR **Ready for review**.
2. **Website team.** CODEOWNERS then requests a review from @PostHog/website, and the [Translation review done](../../.github/workflows/i18n-ready.yml) workflow changes the label from `needs-translation-review` to `translations-reviewed`. If the English changes again before the merge, the sync workflow converts the PR back to a draft, because the new keys need a volunteer review too.

The `Translations` check runs `pnpm i18n:sync --check` on each PR that changes a locale file. It fails when a locale file has a key that `en.yml` does not have, or when a translation does not have the same tags and placeholders as its English text.

For a large change, such as a home page revamp, build it on a long-lived branch. Then run the sync workflow by hand with `base` set to that branch. The locale PRs target that branch, so the volunteers can review before the launch.

To run the script locally:

```bash
pnpm i18n:sync --dry-run              # list the keys that each locale needs, with no API calls
pnpm i18n:sync --locale pt            # translate them. Needs ANTHROPIC_API_KEY
pnpm i18n:sync --check                # validate the locale files
```

The workflow needs these repository secrets: `ANTHROPIC_API_KEY`, `I18N_BOT_CLIENT_ID` and `I18N_BOT_PRIVATE_KEY` (a GitHub App with write access to contents and pull requests), and `SLACK_WEBHOOK_TRANSLATION_REVIEW`. It also needs the labels `translations`, `needs-translation-review`, and `translations-reviewed`.

## How to review a translation

This section is for volunteer reviewers. You need a GitHub account. You do not need write access to the repository.

1. In Slack, reply to the message in the thread with the locale you take, so two people do not review the same PR.
2. Open the PR. Its description has a table of the keys that it changes, with the English text and the new translation.
3. Open **Files changed** and go to `src/i18n/locales/<code>.yml`.
4. On a line that is wrong, click **+**, then **Add a suggestion**. Write the correct text in the suggestion block. For a question, write a normal comment.
5. When you are done, click **Review changes**, then **Comment** or **Approve**. Tell the Slack thread that you are done.

When you write a suggestion:

- Keep product names, brand names, code, commands, and URLs in English. See [What not to translate](#what-not-to-translate).
- Keep each tag, such as `<highlight>…</highlight>` or `<logo/>`. You can move a tag with its words.
- Keep each `{placeholder}` as it is.
- Keep the key and the indentation. Change only the text after the colon. If the text starts with a quote, keep the quotes.

## Add a locale

1. On a new branch, create `locales/<code>.yml` with a `name` and an empty `messages: {}`. Use the ISO 639-1 code, for example `es`.
   If the text is for one region, add `lang` with the full tag, for example `lang: pt-BR`. `lang` goes into `<html lang>` and hreflang. The URL keeps the short code.
2. Push the branch. Run the Sync translations workflow by hand with `base` set to your branch. It translates every key and opens a PR against your branch for the volunteers to review. You can also run `pnpm i18n:sync --locale <code>` locally.
3. Add the code to `TRANSLATED_LOCALES` in `middleware.ts`. The Edge runtime cannot read YAML. `pnpm test:middleware` fails when the list and the files disagree.
4. Restart `pnpm start`. The dev server reads the YAML files only when it starts.

The middleware matches the primary language subtag only, so `pt` matches `pt-BR` and `pt-PT`. It also sends locale-shaped paths such as `/pt-BR`, `/pt_br`, and `/PT` to `/pt` with a 301.

## A/B tests

Home page A/B tests run on English only for now. A translated page must show the control.

- For a test in code, check `locale === 'en'` from `useTranslation()` before you read the flag. Otherwise, render the control.
- Window settings experiments in `src/context/App.tsx` (the `experiment` key) do not apply to `/<code>`. The window uses the settings of `/` without its experiments.
- For a no-code experiment in PostHog, set the URL condition to match `/` exactly, not "contains".

## Opt out

On a translated page, the taskbar shows "View in English". It sets the `ph_skip_translation` cookie and opens `/`. While the cookie is set, the middleware always serves English at `/`. A visitor can still open `/<code>` directly.
