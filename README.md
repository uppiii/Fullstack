# Cynbit project-fit planner

## Problem

Cynbit's homepage introduces a broad set of capabilities—AI automation, custom software, cloud infrastructure, and digital growth—and invites visitors to start a discovery conversation. A visitor who is still working out what they need has little help turning that interest into a concise, useful starting brief.

## Improvement

This prototype adds a two-step, self-guided project-fit planner. It lets a visitor select a project focus, describe the team and time involved in a repetitive workflow, and choose a preferred starting timeframe. It then recommends a service-specific discovery step, provides an explicitly illustrative time-back estimate, and prepares a project brief that can be copied or used when contacting Cynbit.

The estimate is a transparent heuristic (team size × hours per person per week × 60%), not a promise or a prediction of project results. The prototype does not transmit or persist answers.

## Technical stack

- Semantic HTML for structure and form controls.
- CSS for responsive layout, visual states, focus indicators, and reduced-motion support.
- Plain JavaScript for input state, navigation, recommendation logic, estimate calculation, and clipboard interaction.
- No dependencies, backend, tracking, or external runtime assets.

## Implementation

- Four selectable service areas map to distinct recommendations and suggested discovery actions.
- Keyboard-operable radio choices, labeled range inputs, live output values, inline validation, and status messages support accessible interaction.
- The result view explains the estimate assumption and links to Cynbit's contact page.
- “Copy my brief” prepares a shareable summary locally and reports when browser clipboard permissions are unavailable.
- Layout adapts to narrow screens and honors the user's reduced-motion preference.

## Results and validation

The prototype is designed to give visitors a more concrete next step than a generic contact prompt while keeping all answers in their browser. A browser walkthrough verified required-focus validation, navigation, slider updates, the 60% estimate (3 people × 5 hours × 60% = 9 hours per week), a tailored automation recommendation, copying the brief, restarting, and a 375-pixel-wide layout. No conversion, performance, or customer outcome claims are made: those require deployment and user testing.

## Running locally

Serve this folder with any static-file server and open its `index.html`. For example:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Deployment status

This workspace was empty and had no project Git repository or configured hosting remote when the prototype was created. The source and report are ready for review, but this prototype has not been pushed to GitHub or deployed. A repository destination and hosting access are required to publish a live URL. This is a standalone concept prototype and is not integrated into Cynbit's production website.
