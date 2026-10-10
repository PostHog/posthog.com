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

The interactive demos on the home page show the PostHog app, and the app is in English. So app UI inside a demo stays in English too: composer placeholders, buttons, chips, empty states, timestamps, and the Inbox reports. Translate only the prose around the app, the chat conversation (PostHog AI answers in the language you ask in), and the screen-reader descriptions of the demos.

## Add a string

1. Add the key and the English text to `locales/en.yml`.
2. Call `t()` or `rich()` with the key.
3. Add the translation to each file in `locales/` that has one. Follow the style rules in the comment at the top of each file. If you do not know the translation, leave the key out. The page shows English until someone adds it.

The build warns about a key in a translation file that `en.yml` does not have. In development, the browser console warns about a key that `en.yml` does not have.

## Add a locale

1. Copy `locales/pt.yml` to `locales/<code>.yml`. Use the ISO 639-1 code, for example `es`.
   If the text is for one region, set `lang` to the full tag, for example `lang: pt-BR`. `lang` goes into `<html lang>` and hreflang. The URL keeps the short code.
2. Replace the style rules in the comment at the top with the rules for the new language. Then translate the values. Keep the keys and the tags.
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

## English-only notice

When a reader goes from a translated page to a page that only exists in English, a toast says so in the language they came from. `useEnglishOnlyNotice()` in `Wrapper` reads the text while the translated page is still open, because the English page cannot. The keys are `toast.english_only.*`. The toast shows once per browser (`ph_english_only_notice_seen` in `localStorage`), and not when the reader goes to `/`.
