# Sleep Journal Specification

## Project Title and Description

**Project Title**: Sleep Journal  
**Description**: A simple, privacy-conscious web application that helps users record when they wake up and go to sleep, rate the quality of their sleep, track daily energy levels, and notes about their rest. The app should make it easy to log nightly sleep data and review trends over time.

## Purpose and Target Audience

**Purpose**: Help users understand their sleep habits, identify patterns, and make informed decisions about rest and wellness.  
**Target Audience**: Individuals who want to track their sleep, caregivers supporting a loved one’s routine, and users interested in personal wellness journaling.

## User Scenarios & Testing

### User Story 1 - Sign Up for an Account (Priority: P1)

A new user wants to create a personal account so their sleep data is saved and accessible across sessions.

**Why this priority**: Account creation is the foundation for persistent journaling and personalized history.

**Independent Test**: A user can complete sign-up and immediately access their own dashboard.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** they submit a valid email and password, **Then** an account is created and they are signed in.
2. **Given** a visitor submits an invalid email or weak password, **When** they attempt sign-up, **Then** the app shows clear validation errors and does not create an account.

---

### User Story 2 - Create a Sleep Entry (Priority: P1)

A signed-in user wants to record a sleep session with date, bedtime, wake time, and notes.

**Why this priority**: Creating entries is the core value of the product.

**Independent Test**: A user can create a new entry and see it listed in their journal.

**Acceptance Scenarios**:

1. **Given** a signed-in user, **When** they submit a complete sleep entry, **Then** the entry is saved and shown in their journal.
2. **Given** a signed-in user, **When** they submit missing required information, **Then** the app prevents saving and highlights the missing fields.

---

### User Story 3 - Read Sleep Entries (Priority: P1)

A user wants to review their past sleep entries and see their history.

**Why this priority**: Reading saved entries is essential for reflection and trend awareness.

**Independent Test**: A user can open their journal and view existing entries.

**Acceptance Scenarios**:

1. **Given** a user with saved entries, **When** they open the journal, **Then** they can view a list of entries sorted by date.
2. **Given** a user with no entries, **When** they open the journal, **Then** they see an empty-state message and guidance to create their first entry.

---

### User Story 4 - Update a Sleep Entry (Priority: P2)

A user wants to edit a previously saved sleep entry if their details change.

**Why this priority**: Editing supports corrections and improved accuracy after the fact.

**Independent Test**: A user can update an existing entry and see the new value reflected in the journal.

**Acceptance Scenarios**:

1. **Given** a user with an existing entry, **When** they edit the entry and save the changes, **Then** the updated information is stored.
2. **Given** a user attempts to update an entry with invalid data, **When** they save, **Then** the app rejects the change and shows relevant errors.

---

### User Story 5 - Delete a Sleep Entry (Priority: P2)

A user wants to remove an entry that is no longer relevant or was created in error.

**Why this priority**: Deletion supports correction and user control over personal data.

**Independent Test**: A user can delete an entry and it no longer appears in their journal.

**Acceptance Scenarios**:

1. **Given** a user with an entry, **When** they delete it, **Then** the entry is removed from the journal.
2. **Given** a user confirms deletion, **When** the operation completes, **Then** the app shows a success state and updates the list.

---

### Edge Cases

- How does the system behave when a network request fails during save or delete?
- How does the system handle duplicate or conflicting entries for the same date?

## Requirements

### Project Constraints

- The solution MUST use Next.js with the App Router, TypeScript in strict mode, and Tailwind CSS.
- Server components MUST be the default; client components MUST be used only when browser interactivity is required.
- Core user flows MUST be covered by automated tests and documented with clear naming conventions.

### Functional Requirements

- **FR-001**: The system MUST allow users to create an account with a valid email and password.
- **FR-002**: The system MUST allow signed-in users to create a new sleep entry with required fields.
- **FR-003**: The system MUST allow users to view a list of their saved sleep entries.
- **FR-004**: The system MUST allow users to edit an existing sleep entry.
- **FR-005**: The system MUST allow users to delete an existing sleep entry.
- **FR-006**: The system MUST validate required data before saving entries.
- **FR-007**: The system MUST provide clear feedback for success, validation, and error states.
- **FR-008**: The system MUST ensure each user can only access their own entries.

### Key Entities

- **User**: Represents an authenticated person who owns sleep entries and manages their account.
- **SleepEntry**: Represents a recorded sleep session, including date, bedtime, wake time, duration, mood, and notes.

## API Endpoints

- **POST /api/auth/signup**: Create a new user account.
- **POST /api/auth/login**: Sign in an existing user.
- **POST /api/sleep-entries**: Create a new sleep entry.
- **GET /api/sleep-entries**: Retrieve all sleep entries for the authenticated user.
- **GET /api/sleep-entries/:id**: Retrieve a single sleep entry.
- **PATCH /api/sleep-entries/:id**: Update a single sleep entry.
- **DELETE /api/sleep-entries/:id**: Delete a single sleep entry.

## Implementation Priority

1. **P1**: Authentication and account creation
2. **P1**: Create and read sleep entries
3. **P2**: Update and delete sleep entries
4. **P2**: Validation, feedback, and empty-state handling
5. **P3**: Advanced analytics and trend summaries

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can create an account and first sleep entry in under 5 minutes.
- **SC-002**: At least 90% of newly created entries are successfully saved without validation errors.
- **SC-003**: Users can find and review their entry history without assistance.
- **SC-004**: The core workflows of sign up, create, read, update, and delete are each testable and working in the first release.
