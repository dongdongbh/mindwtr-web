# Apple Shortcuts

Mindwtr supports Apple Shortcuts through native App Intents on iPhone and iPad. The first scope focuses on reliable capture and navigation.

## Availability

| Surface | Supported |
| --- | --- |
| Shortcuts app | Yes |
| Siri | Yes |
| Spotlight suggestions | Yes |
| Action Button running a shortcut | Yes |
| Apple Watch direct actions | No |
| CarPlay | No |

## Capture to Mindwtr

Use Capture to Mindwtr to send a task into Mindwtr's Inbox capture flow.

| Parameter | Required | Notes |
| --- | --- | --- |
| Task | Yes | Empty titles are rejected. |
| Note | No | Added as task description. |
| Tags | No | Comma-separated tags are normalized when saving. |
| Project | No | Matches an active project by title, or creates one when saved. |

The shortcut opens Mindwtr and shows the capture screen. The app writes the task through its normal local store, revision, and sync path.

## Open a list

Open Mindwtr List can jump to Inbox, Focus, Waiting For, Someday, Projects, Review, or Calendar.

## URL scheme fallback

Use URL schemes when another automation tool cannot see native App Intents:

```txt
mindwtr://capture?title=Buy%20groceries
mindwtr://capture?title=Buy%20groceries&note=From%20store
mindwtr://open-feature?feature=focus
mindwtr://open-feature?feature=review
```

## Limits

Shortcuts do not currently provide background task creation, find/edit/delete actions, batch operations, Apple Watch direct actions, or CarPlay support.

## See also

- [Mobile guide](/use/mobile)
- [GTD workflow](/use/gtd-workflow)
