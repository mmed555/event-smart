# Smart Event

A multi-sided B2B2C event management platform connecting attendees, event organizers, execution companies, and administrators through AI-powered workflows, logistics planning, and real-time gate operations.

## Language

**Attendee**:
A person who discovers events, books tickets, and attends events. The consumer-facing (B2C) user role.
_Avoid_: Customer (DB table name only), Client, Visitor, Guest

**Organizer**:
A person or organization that creates, manages, and runs events on the platform.
_Avoid_: Host, Creator, Event Manager

**Vendor**:
An execution company that provides event services (audio, lighting, catering, security, etc.) and bids on RFQs. Must pass KYC verification before operating.
_Avoid_: Supplier, Provider, Contractor, Execution Company (DB table name only)

**Admin**:
A platform administrator who moderates events, reviews vendor KYC documents, manages user accounts, and oversees system health.
_Avoid_: Super Admin (prose only), Moderator, Operator

**Event**:
A scheduled gathering with a defined lifecycle (`DRAFT` → `PENDING_APPROVAL` → `APPROVED` → `PUBLISHED` → `ACTIVE` → `COMPLETED` / `CANCELLED`).
_Avoid_: Activity, Session (use for schedule items)

**Booking**:
A reservation placed by an Attendee for one or more ticket types at an event. Has its own lifecycle (`PENDING` → `CONFIRMED` → `CANCELLED` / `COMPLETED`).
_Avoid_: Order, Purchase, Reservation

**Ticket**:
A single entry pass generated from a confirmed booking. Has its own lifecycle (`RESERVED` → `CONFIRMED` → `USED` / `CANCELLED`).
_Avoid_: Pass, Entry

**QR Pass**:
A cryptographically signed QR code token bound to a single ticket, used for gate verification.
_Avoid_: QR Code (too generic), QR Ticket (DB table name only)

**Check-in**:
The atomic gate operation that verifies a QR Pass, transitions the ticket to `USED`, records the entry, and emits a real-time attendance update.
_Avoid_: Scan, Entry Validation, Gate Verification (use in technical context only)

**RFQ (Request for Quotation)**:
A structured request issued by an Organizer for event services, broadcast to matching verified Vendors.
_Avoid_: Tender, Bid Request, Service Request (DB table name only)

**Quotation**:
A priced proposal submitted by a Vendor in response to an RFQ, containing scope, terms, and deliverables.
_Avoid_: Bid, Offer, Proposal

**Contract**:
A formal agreement created when an Organizer awards a Quotation, binding a Vendor to deliver services.
_Avoid_: Agreement, Award

**Service Order**:
An operational execution unit created from a Contract, tracking delivery progress (`PENDING` → `ACCEPTED` → `IN_PROGRESS` → `COMPLETED` / `CANCELLED`).
_Avoid_: Work Order, Task, Job

**KYC (Know Your Customer)**:
The verification process for Vendors, requiring submission and admin review of commercial register and tax card documents.
_Avoid_: Verification (too generic), Onboarding (broader concept)

**Golden Rule**:
The architectural principle that the AI Microservice has no direct business authority. All AI outputs are advisory suggestions that must be validated by the backend and confirmed by the user before business execution.
_Avoid_: AI Rule, AI Constraint
