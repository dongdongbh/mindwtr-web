# What you can count on

Software projects end. Companies get acquired, funding runs out, apps go dark. When your task system holds years of commitments, that risk is worth thinking about before you rely on it. This page lists what protects you. Each item is a property you can check today, not a promise about the future.

## The license keeps every release usable

Mindwtr is released under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html). Every version that ships stays licensed under those terms. Whatever happens to the project, the release on your machine keeps running, and the source stays available for anyone to build, fork, or maintain.

## No account to depend on

The core workflow runs on your device with no account. There is nothing to sign up for and no login to clear before you can capture, clarify, and review. No Mindwtr-operated service holds your data, so there is no server whose shutdown could lock you out.

## Your data is plain files you can read

Mindwtr stores your data as SQLite and JSON on your own device. Export and backup are built in, and they stay that way: there is no paid tier, so there is nothing to gate them behind. The [database schema](/developers/database-schema) is documented, so the format stays open rather than proprietary. Storage changes ship with migrations where practical, so an upgrade carries your data forward.

## Sync is yours to choose

You decide whether Mindwtr syncs at all, and through what. The options are none, iCloud, Dropbox, WebDAV, or a server you host yourself. In every case the data moves through infrastructure you already control. No Mindwtr-operated service sits in the middle holding a copy. See [Data and sync](/data-sync/) for how each option works.

## AI stays off until you turn it on

The AI assistant is optional and off by default. It uses your own key and your own provider, and that provider can be a local endpoint such as llama.cpp or Ollama, so the data never has to leave the machine. See [AI assistant](/power-users/ai-assistant).

## Why the architecture is the guarantee

A subscription note service asks you to trust that the company behind it stays healthy and keeps paying its bills. Mindwtr asks for less trust because it needs less. The files are yours, the format is documented, the license grant cannot be revoked, and the core loop needs no server. If development stopped tomorrow, what you already have keeps working.

For how Mindwtr handles data in detail, read the [privacy policy](https://mindwtr.app/privacy).
