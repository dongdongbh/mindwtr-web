# Obsidian integration

Mindwtr can work with Obsidian-oriented task data when you want tasks and notes to stay connected.

## Scope

The integration focuses on importing and linking task-like Markdown content. Mindwtr remains the GTD system of record for task state.

## Supported patterns

- Inline Markdown tasks.
- TaskNotes-style task notes where supported.
- Links between Mindwtr tasks/projects and note references.
- Deep links back into Obsidian where source data supports them.

## Write-back behavior

Write-back should be used carefully. Mindwtr avoids silent destructive rewrites of note files. Review the current build behavior before relying on automatic updates to an Obsidian vault.

## What gets skipped

Mindwtr should skip ambiguous note content, unsupported metadata, malformed tasks, and content inside code blocks.

## See also

- [Markdown links](/use/markdown-links)
- [Import and migrate](/import/)
- [Local API](/power-users/local-api)
