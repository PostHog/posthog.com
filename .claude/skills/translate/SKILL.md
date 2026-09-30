---
name: translate
description: Translate or review posthog.com copy in a locale file under src/i18n/locales (for example pt.yml). Reads the style rules at the top of the locale file and applies them. Use when the user asks to translate a string, add a key to a locale, add a new locale, review or fix a translation, or apply translation review comments from a PR.
---

# Translate posthog.com copy

The home page is translated with one YAML file per locale in `src/i18n/locales/`. `en.yml` is the source of truth. Read `src/i18n/README.md` first for keys, tags, placeholders, and what not to translate.

## Every locale has its own style rules

The comment at the top of each locale file (for example `src/i18n/locales/pt.yml`) lists the style rules for that language: tone, grammar choices, which English words to keep, and how to localize jokes. **Read that comment before you write or review a single string.** These rules come from native-speaker review, and they win over a literal translation and over your own sense of what is "correct".

## Steps

1. Read `src/i18n/README.md`.
2. Read the header comment of the target locale file. If the locale has no rules yet, ask the user for them before you translate.
3. Read the English text in `en.yml` for each key you touch. Translate the meaning and the joke, not the words.
4. Keep every `<tag>`, `<tag/>`, `{placeholder}`, Markdown link, and URL. You can move a tag in the sentence, because word order changes.
5. Keep product names, brand names, code, and commands in English, as the README says.
6. Check the rest of the file for the same pattern. When you fix one string, fix the others that break the same rule.
7. When a review comment applies to more than one string, add it as a bullet to the header comment, so the next translator follows it.

## Add a new locale

Follow "Add a locale" in the README. Then add a header comment with the style rules for the language. Ask the user (or a native speaker on the team) for the tone they want. Do not copy the rules of another locale, because they are specific to that language.
