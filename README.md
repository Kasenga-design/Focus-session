# Still & Steady — Christian Focus Website

A mobile-friendly Christian focus timer built with plain HTML, CSS and JavaScript. There is no build step or package installation.

## Included

- A welcoming home page and a full-screen focus room.
- Three colour palettes: midnight, warm cream and soft sky.
- A clickable session clock that cycles through digital, minimal and analogue styles.
- Focus sessions from 10 to 240 minutes.
- An automatic break suggestion. For example, 60 minutes with five-minute breaks becomes four 11:15 focus blocks and three 5:00 breaks. Breaks are included in the selected total time.
- A pause/resume control, progress bar, automatic focus/break transitions and session completion state.
- Forty built-in KJV verses with manual next/previous controls and an automatic verse interval.
- Optional NIV, NKJV and NLT fetching through API.Bible.
- A circular retro player for direct audio URLs and audio files selected from the current device.
- A Spotify playlist/album/track embed.
- Responsive layouts for phones, tablets and desktop screens.

## Run locally

You can open `index.html` directly for most features. For the best experience, run a small local web server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder (`index.html`, `css/`, `js/`, `assets/` and this README) to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your default branch (usually `main`) and the `/ (root)` folder, then save.
6. Open the Pages URL GitHub provides. The paths in this project are relative, so it also works when published at a repository URL such as `https://username.github.io/repository-name/`.

## Bible translations

The forty KJV verses are bundled in `js/app.js`, so they work without an account or internet API. KJV text is public domain in the United States; copyright rules can vary by country.

NIV, NKJV and NLT are copyrighted translations. To use them:

1. Create an account at [API.Bible](https://api.bible/) and check which translations your key is permitted to access.
2. Open the website's Settings (gear icon).
3. Paste your API.Bible key and save it in that browser.
4. Select NIV, NKJV or NLT. The app looks up the translation ID available to your key and requests the selected verse as needed.

**Important:** The key is saved in that browser's local storage, not in the repository. Anyone with access to that browser profile may be able to inspect it. Do not paste a private or shared production key into a public site's visitor-facing browser. For a public multi-user deployment, route API.Bible requests through a server-side/serverless proxy and keep the key in that service's environment variables. API access, translation availability and required copyright notices depend on your API.Bible account and agreement. If a translation is unavailable, the app falls back to the bundled KJV text.

API documentation:
- [API.Bible authentication](https://docs.api.bible/quick-start/authentication/)
- [API.Bible passage requests](https://docs.api.bible/guides/passages/)

## Music

### Your own audio

Open the small arrow beside the playlist selector in the focus room. You can:
- Add a direct MP3, OGG or WAV URL. The URL is saved in the current browser.
- Choose one or more audio files from your phone or computer. Those file selections are local to the current browser session and are not uploaded.

The round previous, play/pause and next buttons operate this local audio playlist. If a local audio track is already selected, the app attempts to start it when you start the focus session. A browser may still require a separate tap to begin playback.

### Spotify

Paste a Spotify playlist, album, track, artist, show or episode link into the Spotify field and select **Load**. The Spotify embed appears beneath the circular player. Spotify's own embedded controls handle Spotify playback and track skipping; the custom circular transport buttons control the local audio playlist, not Spotify. Playback may require a tap and an active Spotify session depending on the browser and account.

Spotify integration uses Spotify's official embed player. A full custom Spotify Connect player requires a separate Spotify developer app, OAuth setup and the Web Playback SDK; it is not enabled by this static starter project.

References:
- [Spotify embeds](https://developer.spotify.com/documentation/embeds)
- [Spotify iFrame API](https://developer.spotify.com/documentation/embeds/references/iframe-api)

## Background image

`assets/mountain-strip.jpg` is a cropped version of the dawn/mountain reference image supplied for this project. It is used as a background layer behind the welcome and focus views. Replace it with another appropriately licensed image by keeping the same filename or updating the CSS paths in `css/style.css`.

## File structure

```text
still-and-steady/
├── index.html
├── README.md
├── assets/
│   └── mountain-strip.jpg
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Customisation

- Colours, layout and responsive breakpoints: `css/style.css`.
- Verse list, break suggestion logic, timer and music integrations: `js/app.js`.
- Page content and interface controls: `index.html`.

The project uses no framework and no external build dependencies. Google Fonts are loaded from Google Fonts when an internet connection is available; system serif/sans-serif fallbacks are included.
