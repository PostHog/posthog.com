---
title: Publishing videos
sidebar: Handbook
showTitle: true
---

## Google Drive

We maintain a master copy of videos in <PrivateLink url="https://drive.google.com/drive/u/1/folders/1H71ElMxG4B55sFGOVHA10Zu2g1Re2J7T">Google Drive</PrivateLink>.

## Publishing externally

### YouTube

We publish most videos to [our YouTube channel](https://youtube.com/@posthog). Post in <PrivateLink url="https://posthog.slack.com/archives/C08CG24E3SR">#marketing</PrivateLink> if you need access to YouTube Studio.

### Website

Our Wistia account houses videos we publish to our website. They're used in product presentations ([example](/experiments#how-posthog-uses-posthog)) and the changelog.

The benefits of Wistia include more control over the video player, analytics, and the ability to upload new versions of videos. Credentials for Wistia are stored in 1Password.

Note in this screenshot how the subtitles appear outside the video player. After uploading a video, it's always worth reviewing the transcription, as "PostHog" is commonly mistranscribed as potshot.

![Wistia video](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/pasted_image_2025_10_21_T14_02_55_568_Z_9d3f3652db.png)

#### Adding a video

If adding a video manually, use the `<WistiaCustomPlayer />` component. The `mediaId` is the ID of the video in Wistia. You can find it in the URL when viewing the video in Wistia. (Note: use the _video_ ID, not the _folder_ ID.)

```jsx
import WistiaCustomPlayer from '@/components/WistiaCustomPlayer'

<WistiaCustomPlayer mediaId="{VIDEO_ID}" autoPlay={true} startTime={0} />
```

The process for adding videos is different when adding to product presentations or changelog. Ask in <PrivateLink url="https://posthog.slack.com/archives/C08UABF7PB7">#posthogdotcom</PrivateLink> if you have questions.
