# PlaceAutocomplete

A location text field with a Mapbox place-suggestion dropdown. It's the same suggest API and dropdown behavior the people map search box uses, so a location picked here forward-geocodes to a pin on `/people/map`.

## Why it exists

Profiles store location as free text (`location`) plus an ISO country code (`country`). The map resolves a pin by geocoding `"{location}, {country}"` (see `components/HogMap/usePeopleGeo.ts`), which silently falls back to London when the text isn't a place Mapbox knows. Picking from suggestions means the stored string came out of Mapbox's own gazetteer, so it round-trips, and the suggestion also gives us the country code for the flag.

## Usage

```tsx
import PlaceAutocomplete from 'components/PlaceAutocomplete'

<PlaceAutocomplete
    label="Location"
    name="location"
    value={values.location || ''}
    onChange={(value) => setFieldValue('location', value)}
    onSelect={(place) => {
        setFieldValue('location', place.label)
        if (place.countryCode) setFieldValue('country', place.countryCode)
    }}
    error={errors.location}
/>
```

`onChange` fires on every keystroke, so free text still works – someone can type "Planet Earth" and save it. `onSelect` fires only when a suggestion is picked.

## Props

| Prop          | Default                              | Notes                                                       |
| ------------- | ------------------------------------ | ----------------------------------------------------------- |
| `value`       | –                                    | Current field value (controlled)                            |
| `onChange`    | –                                    | Called with the new string on typing and on selection        |
| `onSelect`    | –                                    | Called with the picked `PlaceSuggestion`                     |
| `label`       | `Location`                           |                                                             |
| `name`        | `location`                           |                                                             |
| `placeholder` | `Start typing a city or country…`    |                                                             |
| `token`       | `process.env.GATSBY_MAPBOX_TOKEN`    | Without a token it degrades to a plain text input            |
| `types`       | `country,region,place`               | Mapbox feature types (`place` is a city/town)                |
| `direction` / `size` / `dataScheme` / `description` / `tooltip` / `error` | – | Passed through to `OSInput` |

Keyboard: up/down to move through suggestions, enter to pick the highlighted one, escape to close. Clicking outside closes the dropdown. The dropdown only opens while typing, and suggestions are only fetched while it's open, so loading a saved location costs no Mapbox requests.

## `usePlaceSuggestions`

The debounced suggest call lives in `usePlaceSuggestions.ts` and is shared with `components/HogMap/PeopleMapSearch.tsx`. It returns `{ suggestions, resetSession }`:

-   `suggestions` – `{ id, name, subtitle, countryCode, label }[]`. `label` is `"{name}, {region}"` (or just the name for city-states), which is what we store as a location; `subtitle` is Mapbox's full hierarchy, shown as the second line in the dropdown.
-   `resetSession` – rotates the Mapbox Search Box session token, per Mapbox's session semantics, after a selection.

Options: `types`, `limit`, `minLength`, `debounceMs`, and `enabled` (set false to pause requests, e.g. while a dropdown is closed).
