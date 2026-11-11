# Security Policy — Smart Event Platform

The **Smart Event Management & Marketplace Platform** team takes security, user privacy, and system integrity seriously. 

This document outlines our security policies, development standards, credential handling guidelines, and vulnerability reporting procedures.

---

## Supported Versions

During active development and graduation capstone evaluation, security reviews and updates apply to the active integration branches:

| Version / Branch | Supported | Notes |
|---|---|---|
| `main` | ✅ Supported | Official releases and stable milestone builds |
| `develop` | ✅ Supported | Active integration branch |
| `feature/*` | ❌ Untracked | Local development branches |

---

## Core Security Standards

### 1. Environment Variables & Secret Protection
- **No Hardcoded Secrets:** API keys, database credentials, JWT secrets, encryption keys, and third-party tokens must **never** be hardcoded in application source code.
- **`.env` Exclusion:** All environment files (`.env`, `.env.local`, `*.local`) are ignored via `.gitignore`.
- **Reference Templates Only:** Only sanitized `.env.example` files containing dummy placeholder keys (e.g., `DATABASE_URL="mysql://user:pass@localhost:3306/db"`) may be checked into the repository.
- **Secret Scanning:** All developers are expected to maintain Git pre-commit hygiene to prevent accidental secret leakage.

### 2. Authentication & Authorization (Auth & RBAC)
- **Token Protection:** Authentication is driven by JSON Web Tokens (JWT). Access tokens must remain short-lived with secure refresh mechanisms.
- **Role Verification:** Endpoints must validate user roles (`Attendee`, `Organizer`, `Vendor`, `Admin`) at the controller and service layer before executing any business logic.
- **Password Hashing:** User passwords must be hashed using industry-standard hashing algorithms (e.g., Argon2id or bcrypt with appropriate salt rounds). Plaintext passwords must never be logged or stored.

### 3. QR Ticketing & Anti-Fraud Mechanisms
- **Signed Tokens:** QR ticket payloads must contain cryptographically signed tokens to prevent attendee counterfeiting.
- **Anti-Replay Gate Verification:** Check-in endpoints must employ atomic database transactions ensuring a ticket is updated to `USED` exactly once, rejecting any subsequent duplicate scans immediately.

### 4. Vendor KYC & Sensitive Data Privacy
- **Compliance Storage:** Legal company documents (commercial registers, tax identification cards) must be stored in secure, access-restricted storage locations inaccessible via public URLs without authentication.
- **Least-Privilege Database Access:** Database connections should use separate application credentials with only required CRUD privileges.

### 5. API Protection & Input Sanitization
- **Strict Schema Validation:** All incoming request bodies must be validated using type-safe schemas (e.g., Zod, Joi, or Pydantic) before processing.
- **Rate Limiting:** Authentication, search, payment checkout, and check-in endpoints must implement rate limiting to mitigate brute-force and Denial-of-Service (DoS) risks.
- **SQL Injection Prevention:** Prisma ORM parameterized queries must be used exclusively; raw SQL queries are prohibited unless thoroughly audited and parameterized.

---

## Reporting a Security Vulnerability

If you discover a security vulnerability or accidental credential exposure in the project repository:

1. **Do Not Open a Public Issue:** To protect users and platform integrity, please **do NOT** submit vulnerabilities through public GitHub Issues or Pull Requests.
2. **Private Disclosure:** Report the issue directly and privately to the **Project Supervisor** or **Project Lead / Maintainers** via the internal team communication channel.
3. **Include Detailed Information:**
   - Description of the vulnerability and affected components (`frontend`, `backend`, `ai-service`, `database`).
   - Detailed, step-by-step instructions to reproduce the issue.
   - Proof of Concept (PoC) code or requests, if applicable.
   - Potential impact assessment.
4. **Acknowledgement & Remediation:** The project maintainers will acknowledge receipt promptly, investigate the findings, and collaborate on a secure remediation patch before any public release.

