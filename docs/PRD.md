# Product Requirements Document (PRD)

> **Authoritative baseline:** [`assets/details/pdf_content.txt`](../assets/details/pdf_content.txt) & [`assets/phase1-analysis/phase1.md`](../assets/phase1-analysis/phase1.md). This document is the **living engineering reference** kept in sync with every PR.

---

## 1. Actors

| Role | Description | Primary Scope |
|---|---|---|
| **Attendee** | Discovers events, books tickets, attends via QR, writes reviews | B2C consumer interface |
| **Organizer** | Creates events, manages schedules/speakers/sponsors, issues RFQs, scans gates | Event lifecycle & procurement |
| **Vendor** | Registers company, uploads KYC, publishes service catalog, bids on RFQs, delivers service orders | B2B marketplace |
| **Admin** | Reviews KYC, moderates events, manages users/roles, monitors platform health | Governance & oversight |

---

## 2. Functional Requirements

### A — Auth & RBAC
| ID | Requirement |
|---|---|
| FR-A01 | Register a new user with initial role selection (Attendee / Organizer / Company) |
| FR-A02 | Login/Logout with JWT sessions, token expiration, and refresh tokens |
| FR-A03 | RBAC enforcement on every protected endpoint via `roles` and `permissions` |
| FR-A04 | Forgot/Reset password via email link |
| FR-A05 | Email verification for account activation |
| FR-A06 | Profile management: personal data, interest preferences, notification preferences |
| FR-A07 | Admin user management: review, suspend, reactivate accounts |

### B — Events Management
| ID | Requirement |
|---|---|
| FR-E01 | Create/edit events: title, description, category, format (In-Person/Online/Hybrid), date, capacity, cover image |
| FR-E02 | Manage schedules (`event_schedules`), speakers, and sponsors |
| FR-E03 | Define ticket tiers: name, price, capacity, cancellation policy |
| FR-E04 | Event state machine: `DRAFT` → `PENDING_APPROVAL` → `APPROVED`/`REJECTED` → `PUBLISHED` → `ACTIVE` → `COMPLETED`/`CANCELLED` |
| FR-E05 | Admin moderation: approve or reject events with reason before public visibility |
| FR-E06 | Browse events with multi-attribute filtering (category, location, date, price, format) |
| FR-E07 | Conditional external search: internal DB first, then external APIs if enabled and results insufficient |

### C — Ticketing & Payments
| ID | Requirement |
|---|---|
| FR-T01 | Create booking: select ticket types and quantities, compute total, create `PENDING` booking |
| FR-T02 | Mock payment gateway with client-agnostic interface extensible to Stripe/Paymob |
| FR-T03 | On payment success: confirm booking (`CONFIRMED`), generate signed QR tickets |
| FR-T04 | Waiting list when sold out, with notification on availability |
| FR-T05 | Cancellation and refund per ticket-type policy |
| FR-T06 | Digital ticket wallet for attendees |

### D — QR Check-in & Gate System
| ID | Requirement |
|---|---|
| FR-Q01 | Generate unforgeable signed QR token per ticket |
| FR-Q02 | Scanner UI using device camera for gate staff |
| FR-Q03 | Atomic verification: valid+unused → `USED` + `checkins` record; reject duplicates |
| FR-Q04 | Real-time Socket.IO broadcast of `attendance_update` to organizer dashboards |

### E — B2B Marketplace & RFQ
| ID | Requirement |
|---|---|
| FR-M01 | Vendor onboarding: company data, services, service areas, KYC document upload |
| FR-M02 | Admin KYC review: `VERIFIED` / `REJECTED` / `REVISION_REQUESTED` |
| FR-M03 | Organizer creates RFQ: budget, requirements, deadline, quantities |
| FR-M04 | AI vendor matching: rank verified vendors by 6-factor score |
| FR-M05 | Vendors submit quotations: price, scope, duration, terms, deliverables |
| FR-M06 | Organizer compares quotations side-by-side and awards contract |
| FR-M07 | Service orders: `PENDING` → `ACCEPTED` → `IN_PROGRESS` → `COMPLETED` / `CANCELLED` |
| FR-M08 | Vendor service catalog management |

### F — Interactions, Analytics & Notifications
| ID | Requirement |
|---|---|
| FR-I01 | Dual ratings: attendees rate events, organizers rate vendors after service completion |
| FR-I02 | Favorites: attendees bookmark events |
| FR-I03 | Notification engine: in-app and email alerts for all roles |
| FR-I04 | Analytics dashboards: organizer sales/attendance, vendor RFQ performance, admin platform health |

---

## 3. Non-Functional Requirements

| ID | Property | Criterion |
|---|---|---|
| NFR-01 | Security | Argon2/bcrypt hashing, JWT auth, RBAC, HTTPS, env-var secrets |
| NFR-02 | API Protection | Rate limiting on auth, payment, search, and check-in endpoints |
| NFR-03 | Anti-Fraud | Atomic replay prevention for QR check-in |
| NFR-04 | Performance | QR gate verification < 1s; REST API responses < 200ms |
| NFR-05 | Real-Time | Stable Socket.IO for gate counters and live notifications |
| NFR-06 | Architecture | Modular Monolith + AI Microservice; client-agnostic REST API |
| NFR-07 | Database | MySQL 8.0, 3NF, Prisma ORM with type-safe queries |
| NFR-08 | UI/UX | WCAG 2.1, fully responsive (desktop/tablet/mobile), bilingual AR/EN |
| NFR-09 | Fallback | Backend falls back to keyword search if AI service is down |

---

## 4. User Stories

39 user stories covering all four actors. Full details with acceptance criteria in [`assets/phase1-analysis/phase1.md`](../assets/phase1-analysis/phase1.md) §2.

---

## 5. UI Screen Inventory

78 screens across 5 domains. Full inventory with component breakdowns in [`assets/phase1-analysis/phase1.md`](../assets/phase1-analysis/phase1.md) §7.

| Domain | Screen Range | Count |
|---|---|---|
| Attendee | A01–A15 | 15 |
| Organizer | O01–O25 | 25 |
| Vendor | V01–V16 | 16 |
| Admin | AD01–AD12 | 12 |
| Shared/System | S01–S10 | 10 |
