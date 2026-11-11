# Smart Event: AI-Powered Multi-Sided Event Management, Recommendation & Logistics Marketplace

> **A comprehensive, multi-sided B2B2C event ecosystem connecting Attendees, Event Organizers, Execution Companies, and Platform Administrators through intelligent AI workflows, automated logistics planning, and real-time gate operations.**

---

## 📑 Table of Contents

- [1. Project Description & Overview](#1-project-description--overview)
- [2. Problem Statement](#2-problem-statement)
- [3. Proposed Solution](#3-proposed-solution)
- [4. Project Vision & Objectives](#4-project-vision--objectives)
- [5. Key Features](#5-key-features)
- [6. Main System Modules](#6-main-system-modules)
- [7. User Roles & Permissions](#7-user-roles--permissions)
- [8. System Architecture](#8-system-architecture)
- [9. Technology Stack](#9-technology-stack)
- [10. Frontend Overview](#10-frontend-overview)
- [11. Backend Overview](#11-backend-overview)
- [12. AI Service Overview & Golden Rule](#12-ai-service-overview--golden-rule)
- [13. Database Architecture & Schema Domains](#13-database-architecture--schema-domains)
- [14. System Workflows & Sequence Flows](#14-system-workflows--sequence-flows)
- [15. Security & Fraud Prevention](#15-security--fraud-prevention)
- [16. Project Directory Structure](#16-project-directory-structure)
- [17. Documentation Guide & Navigation](#17-documentation-guide--navigation)
- [18. Development Roadmap & Status](#18-development-roadmap--status)
- [19. Installation & Local Setup Guide](#19-installation--local-setup-guide)
- [20. Development & Contribution Standards](#20-development--contribution-standards)
- [21. Team & Academic Supervision](#21-team--academic-supervision)
- [22. Project Status](#22-project-status)
- [23. Licensing Information](#23-licensing-information)

---

## 1. Project Description & Overview

**Smart Event** is an enterprise-grade, multi-sided B2B2C event ecosystem designed to unify the entire event lifecycle into a single collaborative platform. 

The platform bridges the gap between:
- **B2C Consumer Space:** Event discovery, conversational natural language search, personalized recommendations, ticket booking, and tamper-proof digital QR check-in.
- **B2B Commercial Marketplace:** Event administration, agenda and speaker curation, AI-powered logistics resource planning, Request for Quotation (RFQ) distribution, vendor matching, quotation bidding, service contracts, and operational execution orders.

### Platform Philosophy
- **Modular Monolith Core:** The core business domain is housed in an organized, maintainable Node.js / Express backend to minimize operational overhead while preserving clean domain separation.
- **Dedicated AI Microservice:** Machine learning and NLP capabilities reside in an isolated Python / FastAPI microservice that communicates synchronously via REST APIs.
- **Real-Time Critical Layer:** WebSockets (Socket.IO) are leveraged specifically for mission-critical operations such as real-time gate entry scanning, live attendance tracking, and instant alerts.
- **Client-Agnostic Design:** The backend REST API is strictly client-agnostic to support the Phase 1 Web Application and enable future native mobile clients without backend modifications.

---

## 2. Problem Statement

In the traditional events industry, the lifecycle of an event is fragmented across disconnected tools, spreadsheets, manual communications, and third-party services:

1. **For Attendees:**
   - Scattered discovery requiring manual search across various social channels and listing portals.
   - Rigid search interfaces that fail to parse natural human inquiries (e.g., *"Tech conference in Cairo next weekend under 1,000 EGP"*).
   - Lack of unified digital ticket management and slow physical check-in lines.
2. **For Event Organizers:**
   - Administrative overhead juggling agendas, speakers, sponsors, tier pricing, and capacity constraints across separate tools.
   - Significant difficulty estimating logistical requirements (audio, lighting, staging, catering, security) for varying audience sizes.
   - Unstructured vendor procurement involving unstandardized emails, phone calls, and price haggling without verifiable ratings or transparent quotation comparisons.
3. **For Execution Companies (Vendors):**
   - High customer acquisition friction and lack of a verified professional showcase for service packages.
   - Inefficient RFQ discovery without structured bidding mechanisms or standardized service contracts.
   - Absence of an authentic, verified review history to build trust and market reputation.

---

## 3. Proposed Solution

Smart Event eliminates industry fragmentation by introducing a unified four-way marketplace and operational portal:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SMART EVENT PLATFORM                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[ ATTENDEE ]                  [ ORGANIZER ]                 [ VENDOR ]
 • AI Natural Search           • Event Lifecycle Management  • Verified Profile (KYC)
 • Smart Recommendations       • AI Logistics Resource Plan  • RFQ Opportunity Inbox
 • Secure Booking & Mock Pay   • RFQ Creation & Broadcast    • Quotation Submission
 • Digital QR Ticket Wallet    • Side-by-Side Bidding Matrix • Service Order Milestones
 • Post-Event Reviews          • Real-Time Gate Scanner      • Client Feedback & Rating
    │                               │                               │
    └───────────────────────────────┼───────────────────────────────┘
                                    │
                                    ▼
                            [ SUPER ADMIN ]
                             • Vendor KYC Review & Verification
                             • Event Moderation & Governance
                             • System Health & Platform Analytics
```

---

## 4. Project Vision & Objectives

### Vision
To establish an intelligent, trusted, and unified event management standard that empowers organizers with AI-driven operational efficiency, provides attendees with tailored event discovery, and fosters a transparent B2B vendor marketplace.

### Core Objectives
1. **Unify Operational Silos:** Consolidate ticketing, planning, vendor procurement, and attendee management into one coordinated system.
2. **Harness Practical AI:** Deliver real value through conversational search, slot extraction, hybrid recommendation models, automated equipment planning, and supplier matching.
3. **Guarantee Gate Reliability:** Deliver sub-second (< 1s) QR check-in with atomic anti-replay protection and live WebSocket attendance synchronizations.
4. **Enforce Trust & Transparency:** Implement mandatory Know Your Customer (KYC) document reviews for service providers and verified double-sided rating systems.
5. **Architect for Extensibility:** Build a robust 3NF relational data model and clean API interfaces that smoothly accommodate future native mobile apps and live payment gateways.

---

## 5. Key Features

| Category | Key Capabilities |
|---|---|
| **Attendee Discovery** | NLP-powered conversational assistant, multi-attribute filter matrix, personalized hybrid recommendations, event favoriting. |
| **Ticketing & Gate** | Multi-tier ticketing (VIP, Regular, Early Bird), mock payment pipeline, signed QR code generation, camera-based gate scanner, anti-replay fraud prevention. |
| **Organizer Management**| 5-stage event creation wizard, schedule/agenda builder, speaker & sponsor management, live attendee monitoring dashboard. |
| **AI Logistics Planner** | Automated equipment recommendations (sound, lighting, staging, screens, catering, security) based on venue, capacity, and budget. |
| **B2B Marketplace & RFQs**| Structured RFQ publishing, AI vendor matching score (%), side-by-side quotation comparison, formal contract generation, execution tracking. |
| **Vendor Hub & KYC** | Official onboarding, commercial registration & tax card submission, dynamic service catalog, RFQ inbox, milestone execution updates. |
| **Platform Governance** | Admin review queues for vendor KYC and event publication, dispute resolution, role management, audit logging, system health analytics. |

---

## 6. Main System Modules

The platform is structured into six functional business modules:

```mermaid
graph TD
    SE[Smart Event Core] --> M1[1. Identity & RBAC Module]
    SE --> M2[2. Event Lifecycle & Catalog Module]
    SE --> M3[3. Ticketing, Booking & Gate Check-in]
    SE --> M4[4. B2B Marketplace & RFQ Procurement]
    SE --> M5[5. AI Intelligence Microservice]
    SE --> M6[6. Notification & Real-Time Engine]
```

1. **Identity & Access Management (IAM):** JWT-based authentication, password hashing, account verification, and Role-Based Access Control (RBAC).
2. **Event Catalog & Management:** Event creation, scheduling, speaker/sponsor tracking, draft-to-published state machine, and admin moderation.
3. **Ticketing & Gate Operations:** Ticket inventory management, reservation checkout, signed QR ticket generation, and high-concurrency gate validation.
4. **B2B Marketplace & Operations:** KYC verification pipeline, service catalog, RFQ issuance, vendor quotation submission, and service order tracking.
5. **AI Intelligence Engine:** Standalone FastAPI microservice providing intent parsing, recommendation scoring, logistics estimation, and supplier matching.
6. **Notification & Live Sync:** In-app activity feed, email notifications, and Socket.IO broadcast rooms for gate check-ins.

---

## 7. User Roles & Permissions

The system defines four discrete actors with distinct capabilities:

```mermaid
flowchart LR
    User([System User]) --> Attendee[1. Attendee / Customer]
    User --> Organizer[2. Event Organizer]
    User --> Vendor[3. Execution Company / Vendor]
    User --> Admin[4. Super Admin]
```

| Role | Primary Responsibilities | Access Scope |
|---|---|---|
| **Attendee** | Browses events, converses with AI assistant, books tickets, manages QR passes, writes post-event reviews. | Public discovery, personal bookings, ticket wallet, personal profile & preferences. |
| **Event Organizer** | Creates events, configures schedules and ticket tiers, accesses AI logistics planner, issues RFQs, awards contracts, scans tickets. | Organizer dashboard, owned events, RFQ management, quotation reviews, gate check-in scanner. |
| **Execution Company (Vendor)** | Sets up company profile, uploads KYC compliance documents, publishes service packages, bids on RFQs, delivers service orders. | Vendor dashboard, service catalog, RFQ inbox, quotation proposals, active project tracking. |
| **Super Admin** | Moderates event listings, reviews KYC legal documents, manages user roles and account statuses, oversees disputes and platform analytics. | Comprehensive administration suite, verification queues, taxonomy controls, audit logs. |

---

## 8. System Architecture

Smart Event adheres to a **Modular Monolith + AI Microservice** architectural pattern. This combines clear domain modularity with minimal deployment complexity.

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend Client Layer (Vite + React + TS)"]
        Web[Responsive Web Application]
        Scanner[Mobile Web Camera QR Scanner]
        FutureApp["[Future] Native Mobile App (iOS / Android)"]
    end

    subgraph GatewayLayer["API & Communication Layer"]
        HTTP[RESTful HTTPS API Endpoints]
        WS[Socket.IO WebSocket Gateway]
    end

    subgraph CoreBackend["Core Business Monolith (Node.js + Express + TS)"]
        AuthMod[Auth & RBAC Module]
        EventMod[Event Management Module]
        TicketMod[Ticketing & Check-in Module]
        MarketMod[Marketplace & RFQ Module]
        NotifMod[Notification Engine]
        ValEngine[Business Validation Engine]
    end

    subgraph AIService["AI Microservice (Python 3.11+ + FastAPI)"]
        NLP[Conversational NLP & Slot Extraction]
        Rec[Hybrid Recommendation Engine]
        Logistics[AI Logistics Resource Planner]
        Matching[Vendor Matching Engine]
    end

    subgraph DataStorage["Persistence & External Services"]
        MySQL[(MySQL 8.0 Database via Prisma ORM)]
        Filesystem[Local Storage / Document Vault]
        ExtAPIs["[Configurable] External Event & Notification APIs"]
    end

    ClientLayer --> HTTP
    ClientLayer --> WS
    HTTP --> CoreBackend
    WS --> CoreBackend

    ValEngine <-->|Internal REST API| AIService
    CoreBackend --> MySQL
    CoreBackend --> Filesystem
    CoreBackend -.-> ExtAPIs
```

---

## 9. Technology Stack

### Frontend Application
- **Framework & Core:** React.js 18+ with TypeScript
- **Build System:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **State Management & Data Fetching:** React Hooks / Context API / Axios
- **Real-Time Client:** Socket.IO Client
- **Icons & Visuals:** FontAwesome 6 / Lucide Icons

### Core Backend Service
- **Runtime Environment:** Node.js (LTS 20.x+)
- **Application Framework:** Express.js with TypeScript
- **Database ORM:** Prisma ORM (Type-Safe schema management)
- **Real-Time Engine:** Socket.IO
- **Security & Validation:** JWT (jsonwebtoken), Argon2 / bcrypt, Zod / Joi validation, Helmet, CORS, Express Rate Limit

### AI Microservice
- **Language & Runtime:** Python 3.11+
- **Web Framework:** FastAPI (Asynchronous high-performance REST APIs)
- **Server:** Uvicorn ASGI
- **Data & ML Libraries:** Pydantic (data validation), NumPy, Pandas, scikit-learn (similarity & scoring), NLTK / spaCy (tokenization & text processing)

### Database & Persistence
- **RDBMS:** MySQL 8.0+
- **Normalization:** Third Normal Form (3NF) relational design
- **Schema Management:** Prisma Migrations

---

## 10. Frontend Overview

The frontend is a single-page responsive web application covering **78 unique screen states** across five primary functional domains:

1. **Attendee Interface (A01–A15):** Landing page, multi-filter discovery, AI conversational assistant, personalized recommendations, multi-step booking, mock checkout, ticket wallet, full-screen digital ticket with QR, booking history, favorites, profile, and event reviews.
2. **Organizer Interface (O01–O25):** KPI metrics dashboard, event wizard (schedule, speakers, sponsors, tiers), event command center, real-time gate monitor, camera QR scanner, AI logistics planner inputs & results, marketplace search, RFQ creation, vendor match scoring, quotation comparison matrix, and service order tracking.
3. **Execution Company Interface (V01–V16):** Onboarding wizard, KYC document uploader, vendor metrics dashboard, public showcase profile editor, service package catalog, RFQ opportunity inbox, quotation submission form, quotation status tracker, and milestone execution hub.
4. **Super Admin Suite (AD01–AD12):** Global health dashboard, user management table, KYC document verification queue & inspection viewer, event moderation queue, taxonomy manager, dispute tracking, system broadcasts, and configuration settings.
5. **Shared & System Screens (S01–S10):** Unified login, role-selection register, password reset flow, email verification, FAQ/Help center, 403 Forbidden, 404 Not Found, 500 Server Error, and terms of service.

---

## 11. Backend Overview

The backend is built as a **Modular Monolith** in Node.js / Express with TypeScript. It serves as the single source of truth for business operations, data validation, and transactional persistence.

### Core Architectural Responsibilities
- **Authentication & RBAC:** Enforces strict role verification on every endpoint using bearer JWTs.
- **Transactional Consistency:** Guarantees atomic operations for booking checkouts, seat decrements, and gate check-in status updates.
- **Client-Agnostic REST APIs:** Standardized JSON responses with uniform envelope structures (`success`, `data`, `meta`, `error`).
- **Real-Time Gateway:** Manages WebSocket connections for live gate attendance counting and role-targeted system notifications.
- **AI Integration Gateway:** Translates user requests into structured internal payloads for the AI microservice, validates returned suggestions, and prompts user confirmation before committing state changes.

---

## 12. AI Service Overview & Golden Rule

### ⚠️ The Golden Rule of AI Architecture
> **The AI Microservice has NO direct Business Authority.**  
> Artificial Intelligence outputs are strictly treated as **advisory suggestions**.  
> The system enforces an uncompromised validation chain:
>
> $$\text{AI (Suggest)} \longrightarrow \text{Node.js (Validate \& Apply Rules)} \longrightarrow \text{User (Explicit Confirmation)} \longrightarrow \text{Business Execution}$$

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Organizer / Attendee)
    participant Core as Node.js Core Backend
    participant AI as FastAPI AI Microservice
    participant DB as MySQL Database

    User->>Core: Natural Request (Search / Logistics Planning)
    Core->>AI: Structured Payload with Context Data
    Note over AI: NLP Parsing / Recommendation / Matching
    AI-->>Core: Advisory Suggestions & Match Scores
    Core->>Core: Enforce Business Validation & Constraints
    Core-->>User: Present Recommendations for Review
    User->>Core: Explicit Confirmation & Acceptance
    Core->>DB: Execute Transaction & Persist State
```

### Core AI Capabilities
1. **AI-01: Conversational Assistant:** Natural language dialogue engine capable of parsing Arabic and English inquiries.
2. **AI-02: Intent & Slot Extraction:** Extracts search parameters (`Category`, `Location`, `Date`, `Budget`, `Format`) from unstructured text.
3. **AI-03: Hybrid Recommendation Engine:** Multi-factor scoring combining content similarity, user preference history, event popularity, and user ratings.
4. **AI-04: Logistics Resource Planner:** Automatically predicts required equipment quantities (audio, lighting, staging, screens, catering, security) based on audience size, event format, and budget.
5. **AI-05: Vendor Matching Engine:** Evaluates execution companies using a 6-factor matching criteria:
   $$\text{Match Score} = f(\text{Services}, \text{Location}, \text{Availability}, \text{Rating}, \text{Experience}, \text{Cost})$$

---

## 13. Database Architecture & Schema Domains

The database is built on **MySQL 8.0** in strict **Third Normal Form (3NF)** managed through Prisma ORM. It is partitioned into six logical domains:

```mermaid
erDiagram
    ROLES ||--o{ USERS : "assigned to"
    ROLES ||--o{ ROLE_PERMISSIONS : "defines"
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : "grouped in"
    USERS ||--o| CUSTOMERS : "extends (Attendee)"
    USERS ||--o| ORGANIZERS : "extends (Organizer)"
    USERS ||--o| EXECUTION_COMPANIES : "extends (Vendor)"
    USERS ||--o{ NOTIFICATIONS : "receives"

    ORGANIZERS ||--o{ EVENTS : "creates"
    EVENT_CATEGORIES ||--o{ EVENTS : "classifies"
    VENUES ||--o{ EVENTS : "hosts"
    EVENTS ||--o{ EVENT_SCHEDULES : "schedules"
    EVENTS ||--o{ TICKET_TYPES : "offers"
    EVENTS ||--o{ SPONSORS : "has"
    SPEAKERS ||--o{ EVENT_SPEAKERS : "speaks at"
    EVENTS ||--o{ EVENT_SPEAKERS : "features"

    CUSTOMERS ||--o{ BOOKINGS : "places"
    EVENTS ||--o{ BOOKINGS : "receives"
    BOOKINGS ||--o{ BOOKING_ITEMS : "contains"
    TICKET_TYPES ||--o{ BOOKING_ITEMS : "specifies"
    BOOKINGS ||--o{ TICKETS : "generates"
    TICKETS ||--|| QR_TICKETS : "signed with"
    TICKETS ||--o| CHECKINS : "validated by"
    BOOKINGS ||--o{ PAYMENTS : "paid via"

    ORGANIZERS ||--o{ SERVICE_REQUESTS : "issues RFQ"
    EVENTS ||--o{ SERVICE_REQUESTS : "needs services"
    SERVICE_CATEGORIES ||--o{ SERVICES : "categorizes"
    SERVICES ||--o{ COMPANY_SERVICES : "offered by"
    EXECUTION_COMPANIES ||--o{ COMPANY_SERVICES : "provides"
    SERVICE_REQUESTS ||--o{ QUOTATIONS : "bids on"
    EXECUTION_COMPANIES ||--o{ QUOTATIONS : "submits"
    QUOTATIONS ||--o| CONTRACTS : "awarded as"
    CONTRACTS ||--o{ SERVICE_ORDERS : "executed via"

    CUSTOMERS ||--o{ REVIEWS : "reviews event"
    ORGANIZERS ||--o{ REVIEWS : "reviews vendor"
    CUSTOMERS ||--o{ FAVORITES : "bookmarks"
    CUSTOMERS ||--o{ AI_CONVERSATIONS : "chats with"
    AI_CONVERSATIONS ||--o{ AI_MESSAGES : "logs"
    CUSTOMERS ||--o{ AI_RECOMMENDATIONS : "receives"
```

### Logical Domains Overview
1. **Identity & Access:** `users`, `roles`, `permissions`, `role_permissions`, `customers`, `organizers`, `execution_companies`.
2. **Events & Catalogs:** `events`, `event_categories`, `venues`, `event_schedules`, `speakers`, `event_speakers`, `sponsors`.
3. **Ticketing & Gate Operations:** `ticket_types`, `bookings`, `booking_items`, `tickets`, `qr_tickets`, `checkins`, `payments`.
4. **Marketplace & RFQ Procurement:** `service_categories`, `services`, `company_services`, `service_requests` (RFQs), `quotations`, `contracts`, `service_orders`.
5. **Interactions & Feedback:** `reviews`, `favorites`, `notifications`, `notification_preferences`.
6. **AI Logs & Analytics:** `ai_conversations`, `ai_messages`, `ai_recommendations`, `event_analytics`.

---

## 14. System Workflows & Sequence Flows

### 1. Attendee Booking & Digital Ticket Issuance
```
Browse / AI Search ──> Select Tickets ──> Create Booking (PENDING) ──> Mock Payment
                                                                            │
      Gate Check-in <── Wallet Display <── Generate QR <── Confirm Booking <┘
```

### 2. Organizer RFQ Procurement & Vendor Contracting
```
Event Created ──> AI Logistics Suggestions ──> Issue RFQ ──> AI Vendor Matching
                                                                   │
      Execute Order <── Sign Contract <── Side-by-Side Review <── Receive Bids
```

### 3. Real-Time Gate Check-in Flow
```mermaid
sequenceDiagram
    autonumber
    actor Gate as Gate Staff
    participant Scanner as Mobile / Web Scanner
    participant Core as Node.js Backend
    participant DB as MySQL Database
    participant Live as Socket.IO Live Gate

    Gate->>Scanner: Scans Attendee QR Code
    Scanner->>Core: POST /api/v1/checkins/verify { token }
    Core->>Core: Decrypt & Validate JWT Signature
    Core->>DB: Query Ticket & Status Check
    alt Ticket Valid & Unused
        Core->>DB: ATOMIC UPDATE: status = 'USED' & INSERT checkin record
        Core->>Live: Emit 'attendance_update' (Checked-in + 1)
        Core-->>Scanner: 200 OK: Valid Entry (Attendee Name & Tier)
        Live-->>Gate: Live Counter Updated on Dashboard
    else Already Used
        Core-->>Scanner: 400 Bad Request: ALREADY_USED (Timestamp details)
    else Invalid / Tampered
        Core-->>Scanner: 400 Bad Request: INVALID_TOKEN
    end
```

---

## 15. Security & Fraud Prevention

- **Token Security:** Asymmetric signing for QR passes to eliminate forgery; short-lived access tokens with rotating refresh tokens for user authentication.
- **Anti-Replay Gate Controls:** Database-level atomic transactions prevent concurrent or duplicate entry attempts using the same QR pass.
- **Role-Based Access Control (RBAC):** Middleware checks verify user permissions before allowing route execution on all protected API paths.
- **Rate Limiting:** Defenses against brute-force attacks and volumetric DoS on authentication, checkout, and gate validation endpoints.
- **Data Protection:** Passwords secured with Argon2/bcrypt; sensitive configurations managed via isolated environment files; zero secret leakage in client builds.
- **Document Integrity:** Vendor KYC documents (commercial registers and tax cards) stored in protected directories with access restricted to authorized administrators.

---

## 16. Project Directory Structure

```text
event-smart/
│
├── .github/                         # GitHub repository configuration templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md            # Standardized bug reporting template
│   │   ├── feature_request.md       # New feature proposal template
│   │   └── task.md                  # Development task tracking template
│   └── PULL_REQUEST_TEMPLATE.md     # Comprehensive pull request checklist
│
├── docs/                            # Central project engineering documentation
│   ├── INDEX.md                     # Comprehensive documentation index & catalog
│   └── GITHUB_SETUP.md              # Future GitHub repository setup checklist
│
├── assets/                          # Core reference documents & media assets
│   ├── Book_Chapters/               # Academic graduation book draft chapters (1-4)
│   ├── details/                     # Master summary specification & foundational PDF
│   ├── phase1-analysis/             # Requirements, user stories, ERD, and API contracts
│   ├── portal/                      # Interactive architecture & UML documentation portal
│   └── presentation/                # Project presentation slides, team info, and diagrams
│
├── ai-service/                      # Python / FastAPI AI Microservice (Planned)
├── backend/                         # Node.js / Express / TypeScript Core Backend (Planned)
├── frontend/                        # React / TypeScript / Vite / Tailwind Frontend (Planned)
│
├── .gitignore                       # Multi-stack ignore patterns
├── CODE_OF_CONDUCT.md               # Professional team collaboration standard
├── CONTRIBUTING.md                  # Branching, commits, PRs, and review guidelines
├── LICENSE                          # Project licensing advisory notice
├── README.md                        # Master project documentation overview (This file)
└── SECURITY.md                      # Security vulnerability reporting & best practices
```

---

## 17. Documentation Guide & Navigation

The `assets/` directory houses the primary documentation and architectural assets:

| Documentation Path | Document Description | Primary Purpose |
|---|---|---|
| [`assets/details/pdf_content.txt`](file:///d:/programming/laragon/www/event-smart/assets/details/pdf_content.txt) | **Master Project Summary** (Single Source of Truth) | Authoritative scope, rules, and system definitions. |
| [`assets/details/📘 Smart Event.pdf`](file:///d:/programming/laragon/www/event-smart/assets/details/%F0%9F%93%98%20Smart%20Event.pdf) | Original Master Document | Foundational academic and technical blueprint. |
| [`assets/phase1-analysis/phase1.md`](file:///d:/programming/laragon/www/event-smart/assets/phase1-analysis/phase1.md) | **Phase 1 Engineering Specification** | Functional requirements, 39 user stories, 3NF schema, 78 screen inventory, API contracts. |
| [`assets/portal/index.html`](file:///d:/programming/laragon/www/event-smart/assets/portal/index.html) | **Interactive Architecture Portal** | Interactive Mermaid and SVG viewer for DFD, Use Cases, Sequence, Activity, and Class diagrams. |
| [`assets/presentation/index.html`](file:///d:/programming/laragon/www/event-smart/assets/presentation/index.html) | **Interactive Slide Deck Engine** | 18-slide interactive presentation with team roster, visual mockups, and architectural overviews. |
| [`assets/Book_Chapters/`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/) | Graduation Project Book Drafts | Academic report chapters: Introduction, Background, Planning/Analysis, and Design. |
| [`docs/INDEX.md`](file:///d:/programming/laragon/www/event-smart/docs/INDEX.md) | **Documentation Catalog & Index** | Central index referencing all available project files, schemas, and diagrams. |
| [`docs/GITHUB_SETUP.md`](file:///d:/programming/laragon/www/event-smart/docs/GITHUB_SETUP.md) | Future GitHub Configuration Guide | Step-by-step checklist for when the repository is created on GitHub. |

---

## 18. Development Roadmap & Status

| Phase | Milestone Description | Implementation Status | Verification |
|---|---|:---:|---|
| **Phase 0: Project Definition** | Scope definition, problem analysis, master summary | **Completed** | Approved Master Document |
| **Phase 1: Analysis & Modeling** | Requirements, user stories, 3NF database, UI inventory | **Completed** | `phase1-analysis/phase1.md` |
| **Phase 2: Local Repo Preparation**| Gitignore, guidelines, templates, documentation index | **Completed** | Local preparation package |
| **Phase 3: Core Backend** | Node.js / Express / Prisma API, JWT, RBAC, CRUD | *Planned* | Test suite execution |
| **Phase 4: AI Microservice** | FastAPI, conversational NLP, hybrid recommendation | *Planned* | Model evaluation benchmarks |
| **Phase 5: Frontend Web App** | React / Vite / Tailwind UI screens, dashboard states | *Planned* | UI/UX component tests |
| **Phase 6: Integration & Real-Time**| Socket.IO check-in, end-to-end booking flow, RFQs | *Planned* | E2E integration test runs |
| **Phase 7: Academic Book & Defense**| Complete graduation thesis chapters, live demo deck | *In Progress* | Chapters 1-4 documented |

---

## 19. Installation & Local Setup Guide

> [!NOTE]
> The source modules in `backend/`, `frontend/`, and `ai-service/` are currently in the planning and initial setup phase. Once implementation starts, use the instructions below to configure your local development environment.

### Prerequisites
- **Node.js:** v20.x or later (LTS recommended)
- **Python:** v3.11 or later
- **Database:** MySQL Server 8.0+
- **Package Managers:** `npm` or `pnpm` for Node.js, `pip` with `venv` for Python

### 1. Database Setup
```bash
# Log in to MySQL and create the database
mysql -u root -p
CREATE DATABASE event_smart_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Core Backend Setup (`backend/`)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local MySQL credentials:
# DATABASE_URL="mysql://root:password@localhost:3306/event_smart_db"
# JWT_SECRET="your-development-jwt-secret"
npx prisma migrate dev --name init
npm run dev
```
*Backend runs on: `http://localhost:5000` (Default API Base: `/api/v1`)*

### 3. AI Microservice Setup (`ai-service/`)
```bash
cd ai-service
python -m venv .venv

# Activate virtual environment:
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```
*AI service runs on: `http://localhost:8000` (Internal Docs: `/docs`)*

### 4. Frontend Application Setup (`frontend/`)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 20. Development & Contribution Standards

All team members must follow these standards when contributing to the repository:

- **Branching Strategy:** Work strictly on dedicated branches:
  - `feature/<module>-<description>` for new capabilities
  - `fix/<module>-<description>` for defect resolutions
  - `docs/<description>` for documentation adjustments
- **Conventional Commits:** Adhere strictly to the standard format:
  ```text
  feat(backend): implement QR ticket signature verification
  fix(frontend): adjust responsive layout on mobile ticket view
  docs(phase1): update ERD diagram notes
  ```
- **Code Reviews & Pull Requests:** Every PR must use the local [PULL_REQUEST_TEMPLATE.md](file:///d:/programming/laragon/www/event-smart/.github/PULL_REQUEST_TEMPLATE.md) and receive review prior to integration.
- For in-depth guidelines, consult [CONTRIBUTING.md](file:///d:/programming/laragon/www/event-smart/CONTRIBUTING.md).

---

## 21. Team & Academic Supervision

### Academic Supervision
- **Project Supervisor:** Dr. Abeer Zidan
- **Teaching Assistant:** Eng. Alaa Emad

### Engineering Team & Responsibilities
- **Abdulrahman Mohamed:** UI & UX Designer
- **Youssef Amr:** Frontend Developer
- **Kermina Zaref:** Frontend Developer
- **Karim Abbas:** Backend Developer
- **Mohamed Mohi:** Full Stack Developer
- **Zaid Ahmed:** AI Developer
- **Faisel Farag:** Mobile Application Developer

---

## 22. Project Status

| Metric | Status Value |
|---|---|
| **Current Stage** | Phase 1 (Analysis & Design Completed) / Phase 2 (Local Repo Prepared) |
| **Source Code State** | Empty project structure ready for development |
| **Documentation State** | 100% Complete & Baselined |
| **Git & Remote Repository** | Local preparation only (Pending initial GitHub link & push) |

---

## 23. Licensing Information

This project is currently developed as an academic graduation capstone project. 

The software license selection is **pending authorization and formal confirmation by the Project Owner and Academic Supervisors**. Until a formal license agreement is committed, all rights are reserved and unauthorized distribution or commercial use is prohibited. See [LICENSE](file:///d:/programming/laragon/www/event-smart/LICENSE) for details.

