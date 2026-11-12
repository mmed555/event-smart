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
├── AGENTS.md                           # AI agent operating rules for this repository
├── GLOSSARY.md                         # Canonical domain vocabulary
├── LICENSE                             # License status notice (Pending owner decision)
│
├── docs/                               # Engineering documentation guides
│   ├── INDEX.md                        # Master documentation catalog (This file)
│   ├── PRD.md                          # Product Requirements Document (living)
│   ├── ARCHITECTURE.md                 # System architecture, schema, API contracts (living)
│   ├── ROADMAP.md                      # Implementation phases & success criteria (living)
│   ├── GITHUB_SETUP.md                 # Remote GitHub configuration checklist
│   ├── adr/                            # Architecture Decision Records
│   │   ├── 0001-modular-monolith-with-fastapi-ai.md
│   │   └── 0002-advisory-ai-golden-rule-and-fallback.md
│   └── agents/                         # Agent skill configuration
│       ├── issue-tracker.md            # GitHub Issues via gh CLI
│       ├── triage-labels.md            # Canonical triage label vocabulary
│       └── domain.md                   # Domain doc consumer rules
│
├── .github/                            # GitHub repository configuration
│   ├── workflows/
│   │   └── ci.yml                      # CI pipeline (repo checks + per-service builds)
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── task.md
│   └── PULL_REQUEST_TEMPLATE.md
│
└── assets/                             # Primary documentation & media repository
    ├── Book_Chapters/                  # Academic graduation thesis chapters
    ├── details/                        # Master summary specification & foundational PDF
    ├── phase1-analysis/                # Requirements, user stories, ERD, and API contracts
    ├── portal/                         # Interactive architecture & UML documentation portal
    └── presentation/                   # Project presentation slides, team info, and diagrams
```

---

## 📚 1. Living Engineering Documents

| Document | Purpose |
|---|---|
| [`docs/PRD.md`](./PRD.md) | Product requirements, functional/non-functional, user stories, and screen inventory |
| [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) | System architecture, database schema (3NF, 6 domains), REST/Socket.IO/AI API contracts |
| [`docs/ROADMAP.md`](./ROADMAP.md) | Implementation phases (0–7) with success criteria and dependency graph |
| [`GLOSSARY.md`](../GLOSSARY.md) | Canonical domain vocabulary — the single source of naming truth |
| [`docs/adr/`](./adr/) | Architecture Decision Records for significant, hard-to-reverse technical choices |

---

## 📐 2. Foundational Specifications (Phase 1 Baseline)

| Document | Format | Description & Purpose |
|---|---|---|
| [`assets/details/pdf_content.txt`](../assets/details/pdf_content.txt) | Plain Text | **The authoritative Single Source of Truth** for the project baseline |
| [`assets/details/📘 Smart Event.pdf`](../assets/details/%F0%9F%93%98%20Smart%20Event.pdf) | PDF | The original master summary document |
| [`assets/phase1-analysis/phase1.md`](../assets/phase1-analysis/phase1.md) | Markdown | **Phase 1 Complete Engineering Specification:** FR, NFR, 39 user stories, 3NF schema, 78 screen inventory, API contracts |
| [`assets/phase1-analysis/index.html`](../assets/phase1-analysis/index.html) | Web App | Interactive reader for the Phase 1 Analysis |

---

## 🏛️ 3. Architecture & UML Diagram Portal

Open [`assets/portal/index.html`](../assets/portal/index.html) in your browser to interactively view the system models:
system architecture, AI pipeline, DFD, use cases, activity diagrams, sequence diagrams, state machines, class diagrams, ERD, and schema cards.

---

## 🎓 4. Academic Graduation Project Book

Located in [`assets/Book_Chapters/`](../assets/Book_Chapters/):

| Chapter File | Chapter Title |
|---|---|
| `CHAPTER 1.docx` | Introduction |
| `CHAPTER 2.docx` | Literature Review |
| `CHAPTER 3.docx` | Planning & Analysis |
| `CHAPTER 4.docx` | System Design |
| `Smart Event AI-Powered.pdf` | Consolidated thesis draft |

---

## 🖥️ 5. Interactive Presentation & Visual Assets

Located in [`assets/presentation/`](../assets/presentation/):
- **Interactive Presentation Deck:** `assets/presentation/index.html` (18 slides)
- **High-Resolution Diagrams:** `assets/presentation/assets/diagrams/`
- **UI Screen Captures:** `assets/presentation/assets/ui/`
