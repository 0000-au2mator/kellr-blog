# au2mator Services V2 — Concept

Status: Draft for scoping (as of 2026-09-08)
Audience: Papatia — this document defines the **framework and boundaries**, not a full detailed spec. Unlike the Asset Management feature, we intentionally do not pre-chew every detail here; the detailed design (data types, UI/UX, field-level specs) is expected to be worked out by the dev team based on this framing.

## Table of Contents

- [Big Picture](#big-picture)
- [au2mator Simplifications — Decisions](#au2mator-simplifications--decisions-as-of-2026-09-08)
- [Proposed Data Model](#proposed-data-model-draft-for-discussion)
  - [Design-Time Model (Admin builds a Service)](#design-time-model-admin-builds-a-service)
    - [Service](#service)
    - [Steps](#steps-form--approval--automation--manual-task)
      - [Form](#form-step)
        - [Question Types](#question-types)
      - [Approval](#approval-step)
      - [Automation](#automation-step)
      - [Manual Task](#manual-task-step)
    - [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see)
  - [Runtime Model (User starts a Request)](#runtime-model-user-starts-a-request)
    - [Request](#request)
    - [RequestStepInstance](#requeststepinstance)
    - [Status Model & Error Handling](#status-model--error-handling)
    - [Unique IDs](#unique-ids)
  - [Notifications (Status-Change Webhook)](#notifications-status-change-webhook)
- [API Requirements](#api-requirements)
- [JSON Payload to the au2matorhook](#json-payload-to-the-au2matorhook)
- [Export / Import](#export--import)
- [End-User Experience](#end-user-experience)
  - [Stages](#stages-progress-overview-for-end-users)
- [Open Items for Further Design](#open-items-for-further-design)
- [Next Steps](#next-steps)

## Big Picture

A completely new, decoupled structure for how au2mator Services/Requests are created and processed.

**Problems with V1:**
- Services/Requests are rigidly coupled to the input parameters of the underlying automation (PowerShell / Azure Automation runbook). The portal reads the runbook parameters and exposes them 1:1 as form fields — very limited configurability.
- The current database/table structure for how services are created is chaotic and hard to extend.
- The end-user-facing views (forms, approval screens, result/return data) are too technical and generic, not user-friendly.

**Goal for V2:**
- Fully decouple the form from the automation.
- Introduce a dedicated **Form Builder**: configurable question types, dependencies between questions, and easy extensibility for new question types in the future.
- The completed form is submitted as **JSON** through the existing **au2matorhook** to trigger the automation (the hook mechanism already exists — it was built as groundwork for V2). No direct relation between input parameters and questions anymore (this part is already in place).
- Enable more complex, **modular workflows**: instead of today's fixed "one approval, then run the automation" pattern, a Service can consist of any sequence of form → approval → form → approval → automation → manual task steps.
- Services should be **exportable and importable as JSON**. On import, the user simply selects the target automation/runbook, and everything else (forms, images, dependencies, etc.) comes along automatically — no manual re-creation.
- A proper **API** must exist, equivalent in spirit to our existing Unified Services API: start requests, approve/reject approvals, and — importantly — **dynamically manage approvers at runtime** (add/remove/change who is responsible for a pending or future approval step, since the underlying data source for "who approves" may live outside au2mator).
- **Significantly improve the end-user experience**: the views end users interact with (request forms, approval screens, status/result views) should be visually clean and easy to understand — not technical/generic like today. This is an explicit design goal for V2, not just a side effect of the new data model.
- ⚠️ **New database tables only — hard requirement, non-negotiable.** V2 must be built entirely on new, dedicated database tables. It must NOT reuse, extend, or in any way modify the existing V1 tables/schema. This is not just a design preference — the existing V1 tables must remain completely untouched.

## au2mator Simplifications — Decisions (as of 2026-09-08)

- ✅ **1 Request = 1 Service** — no shopping-cart concept, a Request is always the runtime instance of exactly one Service.
- ✅ **No separate "Workflow" entity** — the step sequence (Form / Approval / Automation / Manual Task) is configured directly inside the Service, 1:1, not as a separate reusable object.
- ✅ **Forms are NOT reusable** — a Form belongs 1:1 to a single Form step, no separate reusable form repository (kept intentionally simple for now).
- ✅ **A Service's first step is always a Form step** — regardless of how many Form/Approval/Automation steps follow. This means "who is allowed to start a Request" is not a separate concept on the Service — it is simply the **Assignee of the first step** (see [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see) below). No separate scoping field is needed on `Service` itself.
- ✅ **Assignee is a generic concept on every step type** (not just Approval) — see [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see).
- ⏳ **Approval roles / permission model** — not yet fully decided, but a key requirement is now clear: assignees (incl. approvers) must be **dynamically configurable at runtime**, not just statically defined at design time (see API section below). Exact role/permission structure will be worked out as the concept matures.

## Proposed Data Model (draft, for discussion)

> ⚠️ **Non-negotiable constraint:** everything described below must live in **new, dedicated V2 database tables**. No existing V1 table may be reused, extended, or modified in any way.

The data model splits into two clearly separate layers:

- **Design-Time Model** — what the **Admin** builds once: `Service → Steps (Form / Approval / Automation / Manual Task)`.
- **Runtime Model** — what gets created each time an end user actually **starts a Request**: `Request → RequestStepInstance`. A `Request` references the `Service` it was started from; each `RequestStepInstance` references the specific step it corresponds to. Neither runtime entity is nested under the design-time Steps — they are separate entities that point back to the design-time model, which itself is never modified during execution.

Each level is described below, from the top down.

### Design-Time Model (Admin builds a Service)

### `Service`
The container an Admin builds: name, description, category, icon, and an ordered sequence of **Steps**. This is the single design-time entity — there is no separate "workflow" object underneath it; the step sequence lives directly on the Service. There is no separate scoping/permission field here — who is allowed to start a Request is determined by the Assignee of the first step (always a Form step, see [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see)).

### Steps (Form / Approval / Automation / Manual Task)
A Service holds an ordered sequence of steps. Each step has a position and one of these types:
- **Form** — collects input from the end user via a configured form (see [Form step](#form-step) below)
- **Approval** — someone must approve before the process continues (see [Approval step](#approval-step) below)
- **Automation** — triggers an au2matorhook / runbook (see [Automation step](#automation-step) below)
- **Manual Task** — manual completion/confirmation required before the process continues

Steps can be assembled in any order — this is the **Service Builder**: form → approval → form → approval → automation → manual task, in whatever sequence the Admin needs.

#### Form step
A Form belongs 1:1 to exactly one Form-type step (not reusable, no shared form repository). Has a name, description, and references 1..n Form Fields.

**Form Field:**
- Type — see dedicated **[Question Types](#question-types)** section below for the full pre-scoped list; the catalog of types must be extensible so new types can be added later without a structural rework.
- Type-specific configuration (e.g. dropdown options, required yes/no, validation rules)
- **Dependencies / conditional visibility**: "show field X only if field Y = value Z". V1 already supports a single condition per dependency; V2 should support **combining multiple conditions** (e.g. AND/OR logic across several source fields) for a single dependency rule.
- Position/order within the form (and page, if multi-page — see Question Types / Page Break below)

##### Question Types

This is a **preliminary, unstructured collection** of everything already noted in this document related to question/field types and form-level input behavior — captured here as a starting point to be discussed and concretized further (not a final, categorized spec yet).

###### Existing V1 Question Types (baseline)

The following question types already exist in V1 today and serve as the baseline the V2 catalog must at least cover (to be reviewed/extended, not necessarily copied 1:1):

- PowerShell (runs a script to produce/validate a value)
- Text
- Options (dropdown) — **requested change**: the display style should be configurable, not just a single fixed dropdown. At minimum: classic dropdown, **and** a horizontal button-group style (all options shown as clickable buttons side by side). Proposal to consider alongside this: also allow a vertical radio-button-list style and, for cases with many options, a searchable/filterable dropdown — since "configurable display style" naturally invites more than just two variants.
- Yes/No
- Multiline Text
- DateTime
- Password
- LDAP Query
- SQL Query
- Integer

###### New Question Types / Form Elements

- HTML (rich text / instructional block, not an input field)
- Line Separator (visual section divider)
- Seitenumbruch / Page Break (splits the form into multiple pages/steps)

###### Notes / additional types and behaviors to add on top of the V1 baseline

- No more direct relation between input parameters (of the underlying runbook/automation) and questions — this decoupling already exists today and must be preserved/built upon in V2.
- **Live regex validation** — today, regex rules configured on a question are only checked when the form is submitted. In V2, validation should happen live while typing — highlighting the field (e.g. red border) and showing the configured warning/error message immediately, not only on submit.
- **Auto-filled fields (wish/nice-to-have, not a hard requirement)** — similar in spirit to today's PowerShell question type, but fully automatic: certain fields could be pre-populated automatically (e.g. via a backing script/lookup) without the user needing to manually trigger it. Exact mechanism TBD.
- **Conditional visibility with multiple combined conditions** — V1 already supports a single condition per dependency rule ("show field X only if field Y = value Z"); V2 should support combining multiple conditions (e.g. AND/OR logic across several source fields) within a single rule.

###### Per-type improvement ideas (Michael's requests + proposals for discussion)

**Proposals for the remaining existing types (for Michael to review/decide):**

- **Integer** — allow an optional prefix/suffix (e.g. "€", "$", "%", "GB") purely for display purposes without affecting the stored numeric value; optional min/max bounds and step size (e.g. only multiples of 5).
- **Text** — optional max length with a live character counter; optional placeholder/example text shown greyed-out in the empty field.
- **Multiline Text** — configurable minimum/maximum number of visible rows; optional max length with counter (same as Text).
- **DateTime** — option to restrict to date-only, time-only, or full date+time; optional min/max date range (e.g. "no dates in the past"); configurable date format for display.
- **Password** — optional configurable complexity requirements (length, character classes) shown as a live hint, consistent with the live-regex-validation idea above; show/hide toggle for the entered value.
- **LDAP Query / SQL Query** — these are more technical/admin-facing question types; main improvement opportunity is likely a live "test query" button at form-design time (for whoever builds the service) rather than end-user-facing changes, plus clear error messages if the query returns no/invalid results at runtime.
- **PowerShell** — same idea as LDAP/SQL: a design-time "test run" capability, plus a defined timeout/error-handling behavior if the script fails or takes too long, so the form doesn't hang indefinitely for the end user.

*(To be concretized: final categorized list of question types, their individual configuration options, and how they interact with multi-page layout and conditional logic. The per-type proposals above are starting points for Michael to confirm, adjust, or reject before this is handed to Papatia.)*

#### Approval step
Someone must approve before the process continues. See [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see) for how the approver is defined and changed at runtime. Can optionally have conditions.

#### Automation step
Defines which au2matorhook / runbook is triggered, and which part of the JSON collected so far (from earlier Form steps) is passed to it. Target automation types include Azure Automation / PowerShell runbooks, Orchestrator, and — in the future — Logic Apps. No human Assignee is needed for this step type — it runs automatically.

#### Manual Task step
A step where a person or group needs to physically/manually do something outside of the system, then mark it done inside au2mator so the process can continue — e.g. "pick up the device from the storage room" or "install the device on-site". Ticket-like in spirit, but **intentionally not a full ticketing system**: no SLA tracking, no comment threads, no escalation logic.

- **Content**: free-text instructions/description shown to the Assignee (not a form — just what needs to be done).
- **Assignee**: person or group, using the same generic [Assignee](#assignee--visibility-who-can-act-who-can-see) concept as other step types.
- **Status progression**: at minimum `Pending → In Progress → Completed`. The Assignee can explicitly set the task to "In Progress" (signals "someone has picked this up") before marking it "Completed" — not just a single completed/not-completed toggle.
- *(Open: whether a Manual Task needs a failure/reject path — e.g. "could not be completed" — analogous to Approval's Rejected status, or whether Completed is the only real outcome and problems are handled outside the system. To be confirmed — see Open Items.)*

### Assignee & Visibility (who can act, who can see)

Two related but distinct concerns apply across all step types:

**Assignee (who can act on a step) — write access:**
- Every step type that requires human interaction (**Form**, **Approval**, **Manual Task**) has an **Assignee**: person / role / group defining who is allowed to act on that specific step when it becomes active. **Automation** steps run automatically and need no Assignee.
- The Assignee is the generalized version of "who approves" — the same concept applies to a Form step (who is allowed to fill it out) and a Manual Task step (who must confirm it), not just Approval.
- Assignees must be **dynamically changeable at runtime via the API** (add/remove/reassign), not just fixed at design time — since the source of truth for "who is responsible" may live in an external system and can change after a Request has already started.
- **"Who is allowed to start a Request" is just the Assignee of a Service's first step** (always a Form step, see [au2mator Simplifications](#au2mator-simplifications--decisions-as-of-2026-09-08)) — no separate scoping concept is needed on `Service` itself.
- A Service can have multiple Form steps assigned to different people at different points in the process (e.g. end user fills the first form → automation runs → internal IT fills a second form → automation runs → a different end user completes a third form).

**Visibility (who can see a step's data) — read access:**
- Separate from Assignee: once multiple people are involved across the lifetime of a Request (e.g. the original requester, IT, an approver), the question of **who can see the data submitted in earlier steps** needs its own answer — this is not automatically the same as who can edit/act on a step.
- **Default:** anyone who is (or has been) an Assignee on any step of a given Request can see all data submitted so far in that Request — i.e. visibility is shared/transparent by default among everyone involved in that Request, similar to a shared ticket.
- **Optional per-step override:** a step can be flagged as **confidential** — if set, that step's submitted data is only visible to that step's own Assignee(s), not to other people involved in earlier or later steps of the same Request (e.g. a Form step collecting sensitive personal data that should not be shown to a later IT-fulfillment step, or vice versa).
- This is intentionally kept simple (one flag per step) rather than building a full field-level ACL system (which is possible but adds significant complexity — see Open Items).

### Runtime Model (User starts a Request)

These two entities are **not** nested under the design-time Steps — they are separate, runtime-only entities that reference the design-time model above (a `Request` points to the `Service` it was started from; a `RequestStepInstance` points to the specific step it corresponds to). They exist purely to track the state of an in-progress or completed request; the design-time model itself is never modified during execution.

### `Request`
A concrete instance of a Service being run by an end user. References the Service it was started from, holds the current state (which step is active, status — see [Status Model & Error Handling](#status-model--error-handling) below). Accumulates the JSON from all Form steps completed so far — this is ultimately the payload sent to the au2matorhook.

**Versioning: a running Request is a snapshot, not a live link.** When a Request is started, it uses the Service's step configuration exactly as it is at that moment in time. If the Admin edits the **Service definition** afterwards (adds/removes/reorders steps, changes a Form, changes a design-time default Assignee, etc.), **already-running Requests are not affected** — they keep executing against the version of the Service they were started with. Only Requests started *after* the change pick up the new configuration. This means a `Request` needs to capture enough of the Service's step configuration at start time (e.g. a snapshot/copy, or a version reference) rather than just pointing live at the current `Service` definition.

⚠️ **This is distinct from runtime Assignee reassignment via the API** (see [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see) and [API Requirements](#api-requirements)): reassigning the Assignee of a specific pending `RequestStepInstance` on an already-running Request through the API is an explicit, intentional runtime action on that Request itself — it is not a Service edit, and it is exactly how a running Request *is* allowed to change after it started. The snapshot rule only means edits to the `Service` template do not retroactively ripple into already-running Requests; it does not mean a running Request is frozen from all change.

### `RequestStepInstance`
Links a Request to the specific step (Form / Approval / Automation / Manual Task) it corresponds to. Has its own status (see [Status Model & Error Handling](#status-model--error-handling) below), who acted on it, when. For Form steps: the actual submitted form data (JSON) for that specific step. For Approval steps: the currently assigned approver(s). In all cases, the currently assigned Assignee(s) must support being reassigned/updated while the step is pending (see [Assignee & Visibility](#assignee--visibility-who-can-act-who-can-see)).

### Status Model & Error Handling

**Step status (`RequestStepInstance`):**
- `Pending` — not yet reached (waiting for earlier steps to complete)
- `Waiting` — active, waiting for the Assignee to act (e.g. fill out a Form, decide an Approval)
- `InProgress` — actively running (e.g. an Automation step executing)
- `Completed` — finished successfully
- `Rejected` — Approval step only: declined
- `Error` — failed (e.g. Automation/runbook error, timeout)

**Step-to-step activation rule:** when a step reaches `Completed`, the *next* step in the sequence is automatically activated — moved out of `Pending` into either `Waiting` or `InProgress`, depending on its step type:
- **Form, Approval, Manual Task** → next status is `Waiting` (a human Assignee needs to act before it can proceed).
- **Automation** → next status is `InProgress` directly (it starts executing immediately, no human action needed to kick it off).

**Request status (aggregated across its steps):**
- `InProgress` — running, at least one step is still open/active
- `Completed` — all steps finished successfully
- `Rejected` — an Approval step was declined → the Request stops/closes as Rejected
- `Error` — **default behavior: as soon as any step goes into `Error`, the Request as a whole automatically goes into `Error` too** — a Request never stays "green" while one of its steps is broken.

**Error is not terminal — retry is a first-class capability, same as in V1:**
- An Admin can manually **re-run a failed step** (most commonly an Automation step) after fixing the underlying issue (e.g. a runbook parameter problem, an external system being down).
- Re-running a failed step moves that `RequestStepInstance` (and the parent `Request`) back from `Error` to `InProgress`.
- This implies `RequestStepInstance` needs to track retry history (e.g. number of attempts, timestamps) so the Admin has visibility into how many times a step has been retried and when.

**How Request status stays in sync with Step status (implementation requirement, not just a suggestion):**

`Request.Status` is a **derived/aggregated value**, never an independent piece of state. It must never be set directly by application code as an isolated write — it is always recomputed from the status of that Request's `RequestStepInstance`s, using one single, consistently applied rule set (roughly: any step `Error` → Request `Error`; else any step `Rejected` → Request `Rejected`; else all steps `Completed` → Request `Completed`; else Request `InProgress`).

This recomputation must be triggered automatically every time a `RequestStepInstance`'s status changes — including on retry. This way, retry needs no special-case handling: a step going `Error → InProgress` runs through the exact same recompute rule and the parent Request naturally falls back out of `Error` into `InProgress`, with no separate "un-error the request" logic required.

For performance (avoiding recomputing from scratch on every read, e.g. in list/overview views), `Request.Status` should still be a **stored/denormalized field** — kept in sync by this single recompute step, not computed live on every query. The exact mechanism (application-level service call vs. DB trigger vs. event-driven update) is an implementation detail for the dev team, but the rule — single source of truth, one recompute path, no direct writes to `Request.Status` — must hold regardless of mechanism.

### Unique IDs

V1 gives each Request a simple sequential number. **V2 needs a new numbering scheme that spans all runtime objects, not just Requests** — both `Request` and `RequestStepInstance` need a unique, human-readable identifier, and (unlike ServiceNow's RITM/TASK numbers, which each have their own independent counter) au2mator V2 uses **one single global counter shared across all object types**.

- Example sequence: Request `SR1001` → its Step `MA1002` → next Step `MA1003` → next Request `SR1004` → ... — the numeric part never repeats or resets per type, it just keeps counting up across every object, regardless of whether it's a Request or a Step.
- The **prefix** (e.g. `SR` for Service Request, `MA`/`MS` for Manual Activity/Step) is purely cosmetic/informational — it identifies the object type for humans, but the underlying uniqueness guarantee comes from the shared global counter, not from the prefix.
- **Prefixes should be configurable per customer/tenant** (a Settings table/setting), with au2mator shipping a sensible default set of prefixes out of the box. Customers who want different prefix conventions can override them.
- Implementation implication: this requires a single, shared ID/sequence generator used by both `Request` and `RequestStepInstance` creation (not two independent auto-increment columns on two separate tables) — exact mechanism (DB sequence, dedicated counter table, etc.) is up to the dev team, but the shared/global nature of the counter is the fixed requirement.

### Notifications (Status-Change Webhook)

**Decision: no built-in email/notification sender in the portal.** The portal itself will **not** get its own mail-sending logic (auth, SMTP config, deliverability, etc. would add real complexity for little benefit). Today, only the automation itself sends email (e.g. a runbook step emailing the requester) — V2 needs a proper answer for how people get notified about **Approval** and **Manual Task** steps waiting for them, without the portal becoming a mail server.

**Chosen approach: a generic status-change webhook, not a built-in mailer.**
- On **every** `RequestStepInstance` status change (not just Approval/Manual Task — any step, any status transition), the portal fires a generic outbound webhook carrying the event + relevant context (which Request, which Step, old/new status, current Assignee(s), a link back into the portal, etc.).
- This webhook is the mirror image of the existing inbound **au2matorhook**: instead of an external trigger calling into au2mator to start an automation, this is au2mator calling *out* on every status change.
- The receiving side (e.g. a Logic App, Power Automate flow, or Azure Automation runbook) is fully responsible for turning that event into an actual notification — Teams message, email, or anything else. All the notification/mail-sending logic that used to live inside the triggered automation itself can now instead live in whatever consumes the status-change webhook, decoupled from the Automation step that does the actual fulfillment work.
- **Not yet fixed / still to be worked out:** exact webhook payload shape, whether it's a single global webhook target or configurable per Service/step, retry/delivery-guarantee behavior if the receiving endpoint is down, and whether step-level filtering ("only fire for these steps/statuses") is needed. Michael explicitly wants this refined further before being finalized — flagged in Open Items.

## API Requirements

V2 needs a proper API, in the same spirit as the existing **Unified Services API**, supporting at minimum:
- Starting/triggering a Request
- Approving/rejecting a pending Approval step
- **Dynamically managing Assignees at runtime** — adding, removing, or reassigning who is responsible for a given (current or future) step in an in-flight Request, for any step type that has an Assignee (Form, Approval, Manual Task). This is important because the source of truth for "who is responsible" may live in an external system, and assignments may need to change after a Request has already started.
- **Dynamically enabling/disabling individual steps at runtime via the API** — not just conditional visibility of form fields, but conditional execution of entire steps. Example: only require an Approval step if a specific answer/value was submitted in an earlier Form step (e.g. "only run the approval step if field XY in the form was set to a certain value"). This means the API must support skipping/enabling steps in an in-flight Request based on external or form-driven conditions, in addition to design-time conditional logic within forms.

## JSON Payload to the au2matorhook

Same principle as already used in V1 — no change needed here. The accumulated JSON from all form answers is submitted to the au2matorhook (potentially at multiple points if a Service has several Automation steps). The structure follows the form's field layout (field name → value), not the runbook's parameter structure.

## Export / Import

Services should be fully **exportable and importable as JSON**, including forms, images/icons, dependencies, and the step sequence. On import, the user only needs to select/re-map the target automation/runbook — everything else is restored automatically from the JSON package. This enables sharing Service templates between environments/tenants.

## End-User Experience

A core goal of V2 (not just a nice-to-have) is that all end-user-facing screens — request forms, approval views, status/result displays — should be visually polished and easy to understand. Today's V1 experience is considered too technical and generic; V2 should feel modern and end-user-friendly by design, not just structurally cleaner on the backend.

### Stages (optional progress overview for end users)

Inspired by ServiceNow's "Stages" concept, but layered **on top of**, not instead of, the step status — end users **do** see the status of the individual steps (e.g. "in progress", "waiting for approval"); Stages are an additional, higher-level view, not a replacement/hiding mechanism.

- Stages sit **between steps** in the sequence, not as a 1-or-more-steps-map-to-one-stage grouping. Configuring a Stage means placing a named milestone marker at a point between two steps in the Service Builder (e.g. a "Submitted" stage right after the initial Form step, an "Approved" stage right after the Approval step, a "Completed" stage at the end).
- A Request's current Stage is simply **the last Stage marker it has passed** as it moves through the step sequence — giving end users a coarse-grained sense of overall progress (e.g. as a simple progress bar) in addition to the detailed step status.
- **Stages are entirely optional** — the Admin does not have to configure any for a given Service; a Service can run perfectly well with no Stages defined at all.
- Data model implication: a `Stage` is a named marker positioned between two steps in a Service's sequence, and `Request` needs a current-stage indicator reflecting the last Stage marker passed.

## Open Items for Further Design

1. Assignee roles / permission model — static assignment vs. dynamic runtime reassignment; how external data sources for assignee/approver information are integrated.
2. Final categorized list of Question Types and their individual configuration options (see Question Types section above — currently just a raw collection, needs to be concretized and organized).
3. Visibility model details — is a single "confidential" flag per step enough, or are there cases needing more granular (e.g. field-level) visibility control? Note: ServiceNow supports field-level visibility via Access Control Lists, but this is considered one of its more cumbersome, script-heavy areas — au2mator V2 intentionally starts with the simpler step-level flag described above and should only move to something more granular if a concrete need arises.
4. Notifications/status-change webhook — exact payload shape, single global target vs. per-Service/per-step configuration, delivery-guarantee/retry behavior if the receiving endpoint is unavailable, and whether filtering by step/status is needed (see [Notifications](#notifications-status-change-webhook) above — direction is fixed, details still to be worked out).
5. Manual Task failure/reject path — does a Manual Task need a "could not be completed" outcome (analogous to Approval's Rejected), or is Completed the only real outcome? To be confirmed with Michael (see [Manual Task step](#manual-task-step) above).
6. Default ID prefixes — exact default prefix set per object type (e.g. `SR` for Service Request, `MA`/`MS` for Manual Activity/Step, and prefixes for Form/Approval/Automation steps) still needs to be defined (see [Unique IDs](#unique-ids) above — mechanism is fixed, default values are not).
7. Migration/compatibility from V1 to V2: parallel operation? Migration of existing services?
8. UX for the Service Builder (drag & drop? ordered list? something else?).
9. Exact structure/versioning of the export/import JSON format.
10. Exact scope and endpoint design of the V2 API (relationship to/reuse of the existing Unified Services API).

## Next Steps

- Papatia to review this framing and propose a detailed technical design (data schema, API contracts, UI/UX) based on the boundaries defined above.
