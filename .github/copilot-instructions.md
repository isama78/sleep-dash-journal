# GitHub Copilot Instructions — Sleep Journal

## Project Context

This repository implements **Sleep Journal**, a privacy-conscious web app for tracking sleep sessions and related wellbeing signals (sleep quality, daily energy, and notes).

Copilot must prioritize the behaviors and constraints defined in `spec.md` and produce code aligned with this document.

## Required Stack and Technical Constraints

- Use **Next.js App Router**.
- Use **TypeScript with strict mode**.
- Use **Tailwind CSS** for styling.
- Prefer **Server Components by default**.
- Use **Client Components only** when browser interactivity is required (`use client` only where necessary).
- Keep implementation simple, readable, and consistent with the current codebase patterns.

## Scope and Priorities

Implement and suggest work in this order unless explicitly told otherwise:

1. **P1**: Authentication and account creation
2. **P1**: Create and read sleep entries
3. **P2**: Update and delete sleep entries
4. **P2**: Validation, feedback, and empty-state handling
5. **P3**: Analytics and trend summaries

Do not over-engineer P3 features before P1/P2 are complete.

## Core Functional Requirements (Must Preserve)

- **FR-001**: Users can create an account with valid email/password.
- **FR-002**: Authenticated users can create a sleep entry with required fields.
- **FR-003**: Users can view a list of their own sleep entries.
- **FR-004**: Users can edit an existing sleep entry.
- **FR-005**: Users can delete an existing sleep entry.
- **FR-006**: Required data is validated before persistence.
- **FR-007**: UI/API provide clear success, validation, and error feedback.
- **FR-008**: Users can only access their own entries (ownership enforcement on every read/write path).

## Domain Model

### User
Represents an authenticated person who owns sleep entries.

### SleepEntry
Represents one recorded sleep session. Include at minimum:

- `date`
- `bedtime`
- `wakeTime`
- `duration` (derived or stored consistently)
- `mood` (or sleep quality signal)
- `notes`
- `userId` (owner reference)

If schema changes are proposed, maintain backward compatibility or provide clear migration notes.

## API Contract

Prefer implementing/maintaining these endpoints:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/sleep-entries`
- `GET /api/sleep-entries`
- `GET /api/sleep-entries/:id`
- `PATCH /api/sleep-entries/:id`
- `DELETE /api/sleep-entries/:id`

### API Behavior Rules

- Return consistent HTTP status codes (`2xx`, `4xx`, `5xx`) and JSON response shapes.
- Validate request payloads on the server.
- Never leak another user’s data.
- For `:id` routes, verify resource ownership before returning/updating/deleting.
- Provide actionable error messages for validation and network failures.

## UI/UX Behavior Rules

### Date/Time Formatting
- **Display dates**: `DD/MM/YYYY` (e.g., "22/07/2026")
- **Display times**: 24-hour format (e.g., "22:30", "08:15")
- **Duration display**: "Xh Ym" format (e.g., "7h 30m", "5h 45m")

### Entry Management (Issues #2, #3, #5)
- Journal list should be sorted by date (most recent first).
- Provide an explicit empty state when no entries exist ("No sleep entries yet. Create your first entry!").
- Show clear success/error states for create/update/delete actions.
- **Edit behavior**: Show modal with prefilled form. On save, show loading state. On success, close modal and refresh list.
- **Delete behavior**: Show confirmation dialog with entry details. On confirm, show loading state. On success, remove entry from list.
- Prevent form submission when required fields are missing.
- **Form validation**: Show field-level error messages inline (below field, red text).
- **Success feedback**: Toast notification (top-right) after successful create/update/delete.
- **Error feedback**: Toast notification with actionable message if operation fails.
- Preserve accessibility basics (labels, keyboard interaction, focus visibility, semantic elements).
- Handle network failures gracefully: show retry button and helpful message.

## Component Architecture

### Essential Components
Build these components to satisfy issues #2, #3, #5:

- **JournalEntryCard** (Issue #2)
  - Display single entry summary: date, duration, mood/quality badge
  - Show truncated notes (tooltip on hover for full text)
  - Include quick-action buttons: edit, delete
  - Visual feedback: hover state, loading state while deleting
  - Responsive: stack controls on mobile

- **JournalManagementView** (Issue #3)
  - Container for entry management functionality
  - Displays list of all user entries sorted by date (newest first)
  - Empty state when no entries exist
  - Integrate with JournalEntryCard for each entry

- **EntryEditModal/Dialog** (Issue #5)
  - Modal form for editing existing entries
  - Prefilled with current entry data
  - Reuse EntryForm component logic when possible
  - Submit and cancel buttons
  - Show loading state during submission

- **DeleteConfirmationDialog** (Issue #5)
  - Modal asking "Are you sure?" before deletion
  - Explain what will be deleted (date/duration)
  - Cancel and Confirm buttons
  - Show loading state during deletion

### Existing Components (Reuse/Refactor)
- `EntryForm.tsx` - Used for both create and edit flows (check isEditing mode)
- `EntryList.tsx` - Refactor to use JournalEntryCard internally

## Naming and Code Conventions

- Use clear, intention-revealing names (`sleepEntry`, `createSleepEntry`, `sleepEntrySchema`).
- Keep functions small and single-purpose.
- Avoid ambiguous abbreviations.
- Use consistent casing:
  - `camelCase` for variables/functions
  - `PascalCase` for components/types
  - `UPPER_SNAKE_CASE` for constants
- Prefer explicit types over `any`.
- Do not introduce new architectural patterns unless necessary and justified.

## Next.js App Router Conventions

- Keep data fetching on the server whenever possible.
- Use route handlers for API endpoints under `app/api/.../route.ts`.
- Use client components only for interactive forms, local state, and event handlers.
- Keep server-only logic (auth checks, ownership checks, DB writes) out of client components.

## Testing Expectations

For core flows (auth + CRUD), Copilot should generate or update tests with descriptive names.

Minimum coverage focus:

- Sign up success/failure validation
- Create entry success/validation failure
- Read entries list and empty state
- Update entry success/validation failure
- Delete entry success
- Authorization/ownership protection for all entry endpoints

Test naming should describe behavior, e.g.:
- `creates_sleep_entry_for_authenticated_user`
- `rejects_sleep_entry_without_required_fields`
- `prevents_access_to_another_users_entry`

## Error Handling and Edge Cases

Always account for:

- Network failures during save/delete
- Validation failures
- Duplicate/conflicting entries for same date
- Unauthorized/unauthenticated requests
- Missing resources (`404`)

## Security and Privacy Guardrails

- Treat sleep data as private personal data.
- Enforce authentication on protected routes.
- Enforce per-user authorization at query level when possible.
- Do not log sensitive user data unnecessarily.
- Do not expose internal errors directly to end users.

## Copilot Output Preferences

When generating code, Copilot should:

1. Explain assumptions briefly if implementation details are missing.
2. Produce minimal, focused diffs.
3. Reuse existing utilities and patterns before adding new abstractions.
4. Include tests for any behavior change in core flows.
5. Keep responses and code aligned with `spec.md` priorities and FR IDs where applicable.

## Definition of Done (for generated tasks)

A task is considered done when:

- It satisfies the relevant FR(s) from `spec.md`.
- It includes validation and user feedback behavior.
- It enforces authentication and ownership constraints.
- It includes/updates automated tests for critical paths.
- It does not break existing App Router/TypeScript/Tailwind conventions.

---
If instructions here conflict with explicit maintainer guidance in an issue/PR comment, follow maintainer guidance and update this file afterward to reflect the new standard.

## Definition of Done (for generated tasks)

A task is considered done when:

- It satisfies the relevant FR(s) from `spec.md`.
- It includes validation and user feedback behavior.
- It enforces authentication and ownership constraints.
- It includes/updates automated tests for critical paths.
- It does not break existing App Router/TypeScript/Tailwind conventions.

---
If instructions here conflict with explicit maintainer guidance in an issue/PR comment, follow maintainer guidance and update this file afterward to reflect the new standard.
