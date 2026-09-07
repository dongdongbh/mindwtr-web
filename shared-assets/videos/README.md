# Website videos

These are the curated web delivery assets, copied to both sites by `bun run assets:sync`. Keep original recordings, 4K masters, narration and render caches in the separate mindwtr-video workspace.

| Stem | Content | Duration |
| --- | --- | --- |
| marketing-v7 | Corrected Mindwtr introduction | 0:55 |
| gtd-v3 | GTD in Mindwtr | 2:41 |
| features-v3 | Feature tour | 1:15 |
| desktop-short-v1 | Desktop quick tour | 5:10 |
| mobile-short-v1 | Mobile quick tour | 5:47 |

Each video has an H.264/AAC MP4, a deliberate 1280×720 WebP poster based on the custom cover, and a separate English WebVTT captions file. Landscape videos are 1080p; the mobile recording keeps its native 720×1616 portrait resolution. No video file exceeds 25 MiB. Players use same-origin URLs, controls, playsinline, and preload=none; visitors choose when to play. Posters are displayed before playback instead of an empty first frame. The portrait video uses contain sizing, never cropping the interface.

Version filenames when replacing assets, then update the corresponding source, poster and captions URLs together. Do not substitute a YouTube embed or hotlinked thumbnail. New exports should use fast-start MP4 metadata and stay below the hosting per-file limit. Verify playback, seeking, captions and poster layout in both sites. Asset documentation is excluded from public copies.
