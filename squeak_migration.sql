-- Importing existing records

-- Import users
SELECT
    DISTINCT users.email,
    sp.first_name AS first_name,
    sp.last_name AS last_name,
    users.email AS username,
    'local' AS provider,
    users.encrypted_password AS password,
    users.confirmed_at IS NULL AS confirmed,
    false AS blocked,
    users.created_at,
    1 AS created_by_id,
    1 AS updated_by_id
FROM users
INNER JOIN (
    SELECT * FROM squeak_profiles WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
) sp on users.id = sp.user_id;

-- Import profiles
-- ALTER SEQUENCE profiles_id_seq RESTART WITH 1;
SELECT row_number() OVER (ORDER BY squeak_profiles.created_at) AS id,
       first_name,
       last_name,
       biography,
       company,
       company_role,
       github,
       linkedin,
       location,
       twitter,
       website,
       now()                                                   AS published_at,
       squeak_profiles.created_at
FROM squeak_profiles
-- INNER JOIN users u on squeak_profiles.user_id = u.id
-- INNER JOIN up_users uu on u.email = uu.email
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
ORDER BY squeak_profiles.created_at;

-- Import existing avatars (Manually done by adjusting OFFSET and LIMIT
SELECT *
FROM (SELECT DISTINCT avatar
      FROM squeak_profiles
      WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
        AND length(avatar) > 0
        AND avatar NOT ILIKE '%avatars.slack-edge.com%') ad
OFFSET 100 LIMIT 10;

-- Import questions
SELECT
    squeak_messages.id AS id,
    subject,
    CASE published WHEN TRUE THEN now() END AS published_at,
    permalink,
    resolved,
    now() AS updated_at,
    reply.body,
    created_at
FROM squeak_messages
INNER JOIN (
    SELECT id, message_id, body
    FROM (SELECT id,
                 body,
                 message_id,
                 rank() OVER (
                     PARTITION BY message_id ORDER BY created_at ASC
                     ) rank
          FROM squeak_replies) replies
    WHERE replies.rank = 1
) reply ON reply.message_id = squeak_messages.id
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import question slugs
SELECT id, unnest(slug) AS slug FROM squeak_messages WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import replies
SELECT ranked_replies.id, body, created_at, CASE published WHEN TRUE THEN now() END AS published_at
FROM (SELECT *,
             rank() OVER (PARTITION BY message_id ORDER BY created_at ASC) rank
      FROM squeak_replies
      WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626') ranked_replies
WHERE rank > 1;

-- Import topics
SELECT id, label, created_at, now() AS updated_at, now() AS published_at, 1 AS created_by_id, 1 AS updated_by_id
FROM squeak_topics
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import topic groups
SELECT id, label, created_at, now() AS published_at, 1 AS created_by_id, 1 AS updated_by_id
FROM squeak_topic_groups
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import roadmaps
SELECT id,
       title,
       date_completed,
       complete,
       NULL AS slug,
       description,
       projected_completion_date AS projected_complete,
       array_to_json(github_urls)::jsonb AS github_urls,
       category,
       milestone,
       beta_available,
       created_at,
       1                         AS created_by_id,
       1                         AS updated_by_id,
       now()                     AS published_at
FROM squeak_roadmaps
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import teams
SELECT id, name, created_at, now() AS published_at, 1 AS created_by_id, 1 AS updated_by_id
FROM squeak_teams
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';


-- Link records together


-- Connect profiles to users
SELECT uu.id AS user_id, profile_id FROM (
SELECT u.email, row_number() OVER (ORDER BY squeak_profiles.created_at) AS profile_id FROM squeak_profiles
LEFT JOIN users u on squeak_profiles.user_id = u.id
WHERE squeak_profiles.organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
ORDER BY squeak_profiles.created_at
    ) profiles
INNER JOIN up_users uu on profiles.email = uu.email;

-- Import connections between profiles and questions
SELECT rank_id AS profile_id, squeak_messages.id AS question_id FROM squeak_messages
INNER JOIN (
    SELECT *, row_number() OVER (ORDER BY created_at) rank_id FROM squeak_profiles WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626' ORDER BY created_at
) ranked_profiles ON profile_id = ranked_profiles.id
WHERE squeak_messages.organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Link avatars to profiles
SELECT
    files.id AS file_id,
    rp.rank_id AS related_id,
    'api::profile.profile' AS related_type,
    'avatar' AS field
FROM files
INNER JOIN squeak_profiles sp ON sp.avatar ILIKE '%' || name || '%'
INNER JOIN (
    SELECT *, row_number() OVER (ORDER BY created_at) rank_id FROM squeak_profiles WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626' ORDER BY created_at
) rp on rp.id = sp.id;

-- Import links between topics and topic groups
SELECT id AS topic_id, topic_group_id
FROM squeak_topics
WHERE topic_group_id IS NOT NULL
  AND organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import connections between questions and topics
SELECT question_id, topic_id, sm.created_at FROM squeak_question_topics
INNER JOIN squeak_messages sm on squeak_question_topics.question_id = sm.id
WHERE sm.organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import connection between profiles and teams into team_members_links
SELECT st.id   AS team_id,
       rank_id AS profile_id
FROM users
         INNER JOIN (SELECT *, row_number() OVER (ORDER BY created_at) AS rank_id
                     FROM squeak_profiles
                     WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
                     ORDER BY created_at) sp on users.id = sp.user_id
         INNER JOIN squeak_teams st on sp.team_id = st.id
WHERE sp.organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Import connections between teams and roadmaps
SELECT id AS roadmap_id, "teamId" AS team_id
FROM squeak_roadmaps
WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626' AND "teamId" IS NOT NULL;

-- Import connections between replies and profiles
SELECT DISTINCT ranked_replies.id AS reply_id, rank_id AS profile_id FROM (
    SELECT
        *,
        rank() OVER (PARTITION BY message_id ORDER BY created_at ASC) rank
    FROM squeak_replies
    WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
) ranked_replies
INNER JOIN (
   SELECT *, row_number() OVER (ORDER BY created_at) AS rank_id FROM squeak_profiles WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626' ORDER BY created_at
) profiles ON profile_id = profiles.id
INNER JOIN (
    SELECT up_users.id, u.id AS user_id FROM up_users
    INNER JOIN users u ON u.email = up_users.email
) joined_users ON joined_users.user_id = profiles.user_id
WHERE rank > 1;

-- Import connections between replies and questions
SELECT ranked_replies.id AS reply_id, message_id AS question_id FROM (
    SELECT
        *,
        rank() OVER (PARTITION BY message_id ORDER BY created_at ASC) rank
    FROM squeak_replies
    WHERE organization_id = 'a898bcf2-c5b9-4039-82a0-a00220a8c626'
) ranked_replies
WHERE rank > 1;

-- Import connections between questions and slugs
SELECT
    id AS entity_id,
    id AS component_id,
    'questions.slugs' AS component_type,
    'slugs' AS field
FROM squeak_messages WHERE organization_id='a898bcf2-c5b9-4039-82a0-a00220a8c626';

-- Set all user roles to 'Authenticated'
SELECT id AS user_id, 1 AS role_id FROM up_users;