# v1 is a static site; Report is deferred

## Status

Accepted

## Context

Human Utility Assessment needs a public home for Assess, Procedure, Certify, and About. Report requires moderation, storage, and consent flows. Visual direction 06 (Office of Citizen Yield) won exploration.

## Decision

Ship v1 as a static HTML/CSS/JS site promoted from `directions/06-service/`, hosted on Vercel, with `directions/` retained as an unlinked archive. Do not build Report backend or submission UI in v1. Certify remains device-local (see ADR 0001). Live pages omit exploration chrome and `noindex`. Content under CC BY-NC 4.0.

## Consequences

- Domain and contact (`contact@getassessed.org`) are configured outside the repo (DNS / email forwarding).
- Adding Report later is an additive surface with its own consent model, not a reuse of Certify paste.
