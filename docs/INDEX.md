# Smart Event Platform — Central Documentation Index

> **Welcome to the central documentation index for the Smart Event Management & Marketplace Platform.**  
> This directory catalogs all technical specifications, academic book chapters, interactive architecture portals, and visual assets across the repository.

---

## 📑 Directory Navigation Map

```text
event-smart/
│
├── README.md                           # Master project overview & system summary
├── CONTRIBUTING.md                     # Engineering workflows, git guidelines & PR rules
├── CODE_OF_CONDUCT.md                  # Community & team collaboration standards
├── SECURITY.md                         # Security policy & credential protection rules
├── LICENSE                             # License status notice (Pending owner decision)
│
├── docs/                               # Engineering documentation guides
│   ├── INDEX.md                        # Master documentation catalog (This file)
│   └── GITHUB_SETUP.md                 # Remote GitHub configuration checklist
│
└── assets/                             # Primary documentation & media repository
    ├── Book_Chapters/                  # Academic graduation thesis chapters
    │   ├── CHAPTER 1.docx              # Introduction & Project Motivation
    │   ├── CHAPTER 2.docx              # Background, Literature Review & Gap Analysis
    │   ├── CHAPTER 3.docx              # Planning, Feasibility Study & Methodology
    │   ├── CHAPTER 4.docx              # System Design, Architecture & UI/UX
    │   └── Smart Event AI-Powered.pdf  # Compiled academic document draft
    │
    ├── details/                        # Foundational project definition
    │   ├── pdf_content.txt             # Complete text of Master Project Summary
    │   └── 📘 Smart Event.pdf          # Approved Master Specification document
    │
    ├── phase1-analysis/                # Detailed engineering analysis package
    │   ├── phase1.md                   # Full requirements, 39 user stories, 3NF schema, 78 screen inventory
    │   ├── index.html                  # Interactive web reader for Phase 1 analysis
    │   ├── app.js                      # Reader interactivity script
    │   └── style.css                   # Reader styling
    │
    ├── portal/                         # Interactive engineering & UML portal
    │   └── index.html                  # Full-featured architecture & diagram navigator
    │
    └── presentation/                   # Interactive slide deck & visual assets
        ├── index.html                  # 18-slide interactive presentation engine
        ├── app.js                      # Presentation navigation & 3D card animation engine
        ├── style.css                   # Presentation stylesheet
        └── assets/
            ├── diagrams/               # High-resolution architectural diagrams & Chen ERD
            ├── team/                   # Team member avatars and profile assets
            └── ui/                     # High-fidelity Figma screen mockups & dashboards
```

---

## 📚 1. Core Foundational Specifications

| Document | Format | Description & Purpose |
|---|---|---|
| [`assets/details/pdf_content.txt`](file:///d:/programming/laragon/www/event-smart/assets/details/pdf_content.txt) | Plain Text | **The authoritative Single Source of Truth** for the project. Outlines the 4 system actors, core scope, modular monolith architecture, the golden rule of AI (No Business Authority), and screen inventory. |
| [`assets/details/📘 Smart Event.pdf`](file:///d:/programming/laragon/www/event-smart/assets/details/%F0%9F%93%98%20Smart%20Event.pdf) | PDF (4.03 MB) | The original master summary document submitted and approved for project baseline. |

---

## 📐 2. Engineering Analysis & Technical Specifications

| Document | Format | Description & Purpose |
|---|---|---|
| [`assets/phase1-analysis/phase1.md`](file:///d:/programming/laragon/www/event-smart/assets/phase1-analysis/phase1.md) | Markdown | **Phase 1 Complete Engineering Specification:**<br>• Functional Requirements (FR-A01 through FR-I04)<br>• Non-Functional Requirements (NFR-01 through NFR-09)<br>• 39 detailed User Stories covering Attendee, Organizer, Vendor, and Super Admin<br>• 3NF Relational Database Schema across 6 logical domains (30+ tables)<br>• REST & Socket.IO API Contracts<br>• UI Screen Inventory detailing all **78 screens** with component breakdowns |
| [`assets/phase1-analysis/index.html`](file:///d:/programming/laragon/www/event-smart/assets/phase1-analysis/index.html) | Web Application | An interactive, localized reader for browsing the Phase 1 Analysis specifications. |

---

## 🏛️ 3. Architecture & UML Diagram Portal

Open [`assets/portal/index.html`](file:///d:/programming/laragon/www/event-smart/assets/portal/index.html) in your browser to interactively view, zoom, and inspect the system models:

### Included Models:
1. **System & Storage Architecture:**
   - Overall System Architecture (Modular Monolith + FastAPI Microservice)
   - AI Microservice Architecture & NLP Pipeline
   - File Storage & Secure Document Pipeline (KYC Vault)
2. **Data Flow & Context Models:**
   - Level 0 Context Data Flow Diagram (DFD L0)
3. **Use Case Models:**
   - Main System Use Case Diagram
   - Attendee Sub-Use Case Diagram
   - Organizer Sub-Use Case Diagram
   - Execution Company Sub-Use Case Diagram
   - Super Admin Sub-Use Case Diagram
4. **Activity Diagrams:**
   - Act 1: Event Discovery & Ticket Booking
   - Act 2: Conversational AI Event Discovery
   - Act 3: RFQ Bidding, Quotations & Vendor Contracting
   - Act 4: Real-Time QR Gate Check-in
5. **Sequence Diagrams:**
   - Seq 1: Booking & Payment Flow
   - Seq 2: AI Hybrid Recommendation Engine
   - Seq 3: QR Code Verification & Gate Ingress
   - Seq 4: RFQ Issuance & Quotation Selection
6. **State Machine Diagrams:**
   - Booking State Lifecycle (`PENDING` $\to$ `CONFIRMED` $\to$ `CANCELLED`)
   - Ticket State Lifecycle (`RESERVED` $\to$ `CONFIRMED` $\to$ `USED`)
   - Event State Lifecycle (`DRAFT` $\to$ `PENDING_APPROVAL` $\to$ `PUBLISHED` $\to$ `ACTIVE` $\to$ `COMPLETED`)
7. **Class & Entity-Relationship Models:**
   - Comprehensive System Class Diagram
   - Relational Database Schema Diagram (3NF)
   - Interactive Schema Table Cards
   - Chen Notation ERD (`assets/presentation/assets/diagrams/erd-chen.jpg`)

---

## 🎓 4. Academic Graduation Project Book

Located in [`assets/Book_Chapters/`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/):

| Chapter File | Chapter Title | Core Content |
|---|---|---|
| [`CHAPTER 1.docx`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/CHAPTER%201.docx) | Chapter 1: Introduction | Background of event management, industry fragmentation problem, motivation, objectives, project scope, and report organization. |
| [`CHAPTER 2.docx`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/CHAPTER%202.docx) | Chapter 2: Literature Review | Survey of existing event platforms, recommendation systems, conversational AI in events, B2B marketplaces, QR entry systems, and competitive gap analysis. |
| [`CHAPTER 3.docx`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/CHAPTER%203.docx) | Chapter 3: Planning & Analysis | Feasibility study (technical, operational, economic, schedule), Gantt chart, stakeholder analysis, requirements specification, and constraints. |
| [`CHAPTER 4.docx`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/CHAPTER%204.docx) | Chapter 4: System Design | High-level system architecture, database design, 3NF schema tables, UML diagrams, and UI/UX design mockups. |
| [`Smart Event AI-Powered.pdf`](file:///d:/programming/laragon/www/event-smart/assets/Book_Chapters/Smart%20Event%20AI-Powered.pdf) | Academic Thesis Draft | Consolidated PDF draft combining the academic thesis report chapters. |

---

## 🖥️ 5. Interactive Presentation & Visual Assets

Located in [`assets/presentation/`](file:///d:/programming/laragon/www/event-smart/assets/presentation/):

- **Interactive Presentation Deck:** [`assets/presentation/index.html`](file:///d:/programming/laragon/www/event-smart/assets/presentation/index.html)
  - Features 18 slides with 3D card animations, laser pointer effect, fullscreen mode, and overview modal.
  - Documents academic leadership:
    - **Project Supervisor:** Dr. Abeer Zidan
    - **Teaching Assistant:** Eng. Alaa Emad
  - Documents engineering team members and assignments:
    - **Abdulrahman Mohamed:** UI & UX Designer
    - **Youssef Amr:** Frontend Developer
    - **Kermina Zaref:** Frontend Developer
    - **Karim Abbas:** Backend Developer
    - **Mohamed Mohi:** Full Stack Developer
    - **Zaid Ahmed:** AI Developer
    - **Faisel Farag:** Mobile Application Developer
- **High-Resolution Diagrams:** Located in [`assets/presentation/assets/diagrams/`](file:///d:/programming/laragon/www/event-smart/assets/presentation/assets/diagrams/)
- **UI Screen Captures:** Located in [`assets/presentation/assets/ui/`](file:///d:/programming/laragon/www/event-smart/assets/presentation/assets/ui/)

