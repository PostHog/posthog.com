# EventsOnline

Online-event features for `/events`. **Status: demo / prototype.** Nothing here writes to Strapi.

## Try it

Open `/events`. On this prototype branch, demo mode is on by default. It adds fake online, live, and recorded events (see `demoEvents.ts`) so every feature has data, and a "Demo data" badge shows under the view toggle. Open `/events?demo=0` to see real events only.

## Pieces

| File | What it does |
|---|---|
| `RetroTV.tsx` | A CRT TV. It plays a YouTube video, or shows the event photo or graphic, or shows animated static. `size="sm"` is the version in the map corner. It also exports `LiveBadge`. |
| `OnlineRoom.tsx` | The "Online" view of the events page: an on-air banner, the TV, a guide of upcoming online events, the tape shelf, and the photo wall. |
| `VhsShelf.tsx` | Recordings (events with a `video`) shown as VHS tapes. Hover a tape to pull it out, click it to play it on the TV. |
| `PolaroidWall.tsx` | The first photo of each past in-person event, shown as a pinned polaroid. Click a photo to zoom. Click the caption to open the event. |
| `EventPassport.tsx` | The "Passport" view of the events page. It is a book in the PostHog Airlines style: a cover, a data page, and stamp pages that flip on swipe, arrow keys, or the ‹ › buttons. It also exports `useEventPassport()` (stamps in `localStorage`) and `Stamp`. |
| `PassportStamp.tsx` | Seven SVG rubber-stamp designs (seal, dashed oval, cloud, postage, sunrise oval, label, wavy badge), after the Figma. Each design has its own ink from a project color token. An event always gets the same design. |
| `EventDetailExtras.tsx` | `EventTime` (a toggle between the visitor's time and the event's time) and `AddToCalendar` (an `.ics` download and a Google Calendar link). |
| `utils.ts` | Start and end times, live detection, `.ics` and Google Calendar builders, and colors and tilts per event. |

## Rules

- **Live** means `online && start <= now < end`. In-person events are never live. When an event has no end time, it is live for 60 minutes after it starts.
- When an event is live at page load, the page opens in the Online view.
- Tapes use the same hue as the event's generated graphic (`eventGraphicStyleIndex`). Stamps use the ink of their design.

## Gaps before this can be real

- **Timezone:** Strapi events have no timezone field. The toggle only shows for demo events.
- **Recordings:** No real events have a `video` yet.
- **Photos:** Most events have only a flyer as their photo, so the wall shows flyers.
- **Passport:** Stamps are saved only in the visitor's browser. A real version must save them to the community profile.
- **Live link:** "Join the stream" uses `event.link`. A real stream URL field would be better.
