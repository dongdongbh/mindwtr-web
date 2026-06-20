# Performance guide

Mindwtr should stay responsive with large task stores.

## Principles

- Interaction cost should be proportional to visible work, not total store size.
- Derived indexes should be computed deliberately, not repeatedly in render paths.
- Long lists should virtualize where appropriate.
- Sync and attachment work should not block normal editing.

## Hot areas

- Focus and Next Actions filtering.
- Project views with many tasks.
- Mobile lists.
- Attachment sync and hash validation.
- Search and saved searches.

## Practical checks

Use synthetic large stores, package-local profiling, and device testing. A change that feels fine on a small fixture can still regress real user data.

## See also

- [Testing strategy](/developers/testing-strategy)
- [Architecture](/developers/architecture)
