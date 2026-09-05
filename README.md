# Human Utility Assessment

An art-game by Andrew Sheerin. Site: [getassessed.org](https://getassessed.org) (when live).

Play happens in the player’s own AI agent. This repository is a static site that publishes the procedure and certifies assessments **locally in the browser**.

## v1 surfaces

- `/` — service landing (assessment has not started)
- `/assess/` — flat stepped pages (`index.html`, `step1.html`…`step4.html`, `complete.html`)
- `/procedure/` — print-and-play single sheet
- `/certify/` — intro; `paste.html` / `certificate.html` (steps 1–2)
- `/about/` — out-of-world credit and privacy note

Shared mast and nav live in `includes/` and are injected by `js/chrome.js` (same pattern as humoludens). Report is deferred past v1. Visual exploration lives under `directions/` (archive; not linked from the live nav).

## Local preview

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/`. Fetch includes need a local server — do not open files via `file://`.

## License

[CC BY-NC 4.0](LICENSE)
