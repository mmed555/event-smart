# Phase 1 — Analysis  
## SmartEvent — AI-Powered Event Management, Recommendation & Logistics Marketplace

> **المرجع الأساسي:** مستند المشروع المعتمد `📘 Smart Event.pdf` (Master Summary) وبوابة المخططات الهندسية (`portal/`).

---

## 1. تحديد الـ Requirements

### 1.1 نظرة عامة وهيكلية النظام

| البند | الوصف |
|--------|--------|
| **اسم المشروع** | **SmartEvent**: AI-Powered Multi-Sided Event Management, Recommendation & Logistics Marketplace |
| **نوع المشروع** | منصة متعددة الأطراف (Multi-Sided B2B2C) تدمج B2C (حجز واكتشاف الفعاليات) مع B2B (إدارة الفعاليات وسوق شركات التنفيذ والتجهيزات) |
| **الهدف الأساسي** | منصة موحّدة تغطي دورة حياة الفعالية بالكامل: اكتشاف ذكي ومحادثة NLP، حجز وتذاكر QR، سوق تعاقدات RFQ للموردين، وتخطيط لوجستي وتحليلات لحظية |
| **الفاعلون (Actors)** | **Attendee** (الزائر/العميل)، **Event Organizer** (منظم الفعاليات)، **Execution Company / Vendor** (شركة التنفيذ)، **Super Admin** (إدارة وحوكمة المنصة) |
| **فلسفة المعمارية** | **Modular Monolith + AI Microservice**: الـ Core Backend مبني كموديولات مترابطة لتقليل التعقيد، بينما الـ AI Microservice منفصل تماماً |
| **الطبقات التقنية** | Frontend: React.js + TypeScript + Vite + Tailwind CSS<br>Core Backend: Node.js + Express.js + TypeScript<br>Database: MySQL + Prisma ORM (3NF Normalized)<br>AI Microservice: Python 3.11+ + FastAPI |
| **الاتصال اللحظي** | **Socket.IO**: مخصص للعمليات الحرجة فقط (بوابات الدخول Gate Check-in، عداد الحضور اللحظي Live Attendance، وإشعارات النظام الفورية) |
| **إستراتيجية المنصات** | **Phase 1 (Web MVP)**: تطبيق ويب Responsive بالكامل (Desktop, Tablet, Mobile Browser).<br>**Phase 2 (Mobile App)**: تطبيق أصيل يرتبط بنفس الـ Node.js Client-Agnostic REST API دون الحاجة لـ Backend منفصل. |

---

### 1.2 المتطلبات الوظيفية (Functional Requirements)

#### A — المصادقة وإدارة الحسابات (Auth & RBAC)
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-A01 | تسجيل مستخدم جديد | تسجيل حساب جديد وتحديد الدور المبدئي (Attendee / Organizer / Company). |
| FR-A02 | تسجيل الدخول والخروج | جلسات آمنة مبنية على JWT مع Token Expiration ودعم Refresh Tokens. |
| FR-A03 | الصلاحيات (RBAC) | حماية صارمة لكل مسار (API endpoint) مبنية على جدول `roles` وصلاحيات `permissions`. |
| FR-A04 | استعادة وتغيير كلمة المرور | طلب رابط إعادة التعيين عبر البريد الإلكتروني (`Forgot/Reset Password`). |
| FR-A05 | تفعيل الحساب والبريد | التحقق من ملكية البريد الإلكتروني (`Email Verification`). |
| FR-A06 | إدارة الملف الشخصي | تعديل البيانات الشخصية، تفضيلات الاهتمامات، وتفضيلات الإشعارات (`notification_preferences`). |
| FR-A07 | إدارة المستخدمين (Admin) | مراجعة بيانات المستخدمين، تجميد أو تنشيط الحسابات (`active / suspended`). |

#### B — الفعاليات (Events Management)
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-E01 | إنشاء وتعديل الفعاليات | تحديد العنوان، الوصف، التصنيف، صيغة الفعالية (`Format`: In-Person / Online / Hybrid)، التاريخ، التوقيت، السعة الإجمالية، وصورة الغلاف. |
| FR-E02 | إدارة الجداول والمتحدثين والرعاة | إدارة الجلسات (`event_schedules`)، إضافة المتحدثين وسيرهم، وإضافة الرعاة وشعاراتهم. |
| FR-E03 | تعريف فئات التذاكر (Tiers) | تحديد الاسم، السعر، السعة المتاحة، وقابلية الإلغاء والاسترداد (`cancellable`). |
| FR-E04 | دورة حياة الفعالية (State Machine) | `DRAFT` → `PENDING_APPROVAL` → `APPROVED` / `REJECTED` → `PUBLISHED` → `ACTIVE` → `COMPLETED` / `CANCELLED`. |
| FR-E05 | حوكمة واعتماد الفعاليات (Admin) | مراجعة الفعاليات في قائمة الانتظار واعتمادها أو رفضها مع سبب قبل النشر للجمهور. |
| FR-E06 | تصفح واستكشاف الفعاليات | تصفح بفلترة متعددة (التصنيف، المدينة/الموقع، التاريخ، السعر، صيغة الفعالية). |
| FR-E07 | البحث الخارجي المشروط | البحث في قاعدة البيانات الداخلية أولاً؛ وفي حال عدم كفاية النتائج يتم فحص تفعيل External APIs وعرض نتائج خارجية إن وجدت. |

#### C — الحجز والدفع والتذاكر (Ticketing & Payments)
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-T01 | إنشاء الحجز | اختيار فئات التذاكر والكميات، وحساب الإجمالي وإنشاء حجز بحالة `PENDING`. |
| FR-T02 | بوابة الدفع (Mock Architecture) | تنفيذ الدفع عبر Mock/Sandbox مع هيكلة معمارية Client-Agnostic تقبل الاستبدال ببوابة حقيقية (Stripe/Paymob) مستقبلاً. |
| FR-T03 | إصدار التذاكر والـ QR | عند نجاح الدفع: تأكيد الحجز (`CONFIRMED`) وتوليد تذاكر رقمية مشفرة بـ QR فريد لكل تذكرة. |
| FR-T04 | قائمة الانتظار (Waiting List) | في حال نفاد التذاكر (`Sold Out`)، إتاحة الانضمام لقائمة الانتظار وإشعار المستخدم فور توفر مقاعد. |
| FR-T05 | الإلغاء والاسترداد | فحص سياسة الإلغاء لكل تذكرة، وتحديث الحجز وإعادة المقاعد للكمية المتاحة. |
| FR-T06 | محفظة التذاكر الرقمية | صفحة مخصصة للعميل لاستعراض تذاكره وتحميلها وعرض الـ QR للدخول. |

#### D — فحص الدخول اللحظي (QR Check-in & Gate System)
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-Q01 | تشفير وتوقيع رمز QR | توليد Token فريد غير قابل للتزوير مرتبط برقم التذكرة والفعالية. |
| FR-Q02 | الماسح الضوئي (Scanner UI) | واجهة للمنظم/طاقم البوابة تستخدم كاميرا الموبايل/الويب لفحص التذكرة وإرسالها للسيرفر. |
| FR-Q03 | التحقق والمنع من التكرار | فحص صلاحية التذكرة: إن كانت صالحة وغير مستخدمة يتم تحديثها إلى `USED` وتسجيل `checkins`. منع الدخول المكرر رفضاً قاطعاً مع رسالة واضحة. |
| FR-Q04 | البث اللحظي عبر Socket.IO | بث فوري لتحديثات الحضور إلى شاشات المنظمين والـ Dashboard (`attendance_update`). |

#### E — سوق الخدمات والتعاقدات B2B (Marketplace & RFQ)
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-M01 | تسجيل وتأهيل الشركات (Onboarding & KYC) | الشركة تسجل بياناتها وتحدد خدماتها ومناطق عملها، وترفع السجل التجاري والبطاقة الضريبية. |
| FR-M02 | تدقيق الشركات (Admin KYC Review) | مراجعة مستندات الشركة: قبول (`VERIFIED`)، رفض (`REJECTED`)، أو طلب تعديل (`REVISION_REQUESTED`). |
| FR-M03 | إنشاء طلب عروض أسعار (RFQ) | المنظم ينشئ طلب خدمة لفعاليته محدد الميزانية التقديرية، الشروط، الموعد، والكميات. |
| FR-M04 | مطابقة الموردين بالذكاء الاصطناعي | فحص متطلبات الـ RFQ وترشيح قائمة بأفضل الشركات المؤهلة المعتمدة بناءً على الخدمات والتوافق. |
| FR-M05 | تقديم عروض الأسعار (Quotations) | الشركات المؤهلة تستلم إشعار الـ RFQ وتقدم عروض أسعار تفصيلية (السعر، مدة التسليم، نطاق العمل، الشروط). |
| FR-M06 | مقارنة العروض والترسية | المنظم يقارن العروض جنباً إلى جنب ويختار العرض الأنسب ويصدر العقد (`Contract`). |
| FR-M07 | أوامر التنفيذ (Service Orders) | إنشاء أمر تنفيذ عملي للتعاقد ومتابعة مراحله: `PENDING` → `ACCEPTED` → `IN_PROGRESS` → `COMPLETED` → `CANCELLED`. |
| FR-M08 | كتالوج خدمات الشركة | إدارة باقات وأسعار الخدمات الخاصة بكل شركة مسجلة. |

#### F — التفاعل والتحليلات والإشعارات
| ID | المتطلب | الوصف ومعايير العمل |
|----|---------|---------------------|
| FR-I01 | التقييمات المزدوجة | تقييم الفعاليات من قبل الحضور (جودة، تنظيم) + تقييم شركات التنفيذ من قبل المنظمين بعد اكتمال أمر الخدمة. |
| FR-I02 | المفضلة (Favorites) | حفظ الفعاليات للرجوع إليها لاحقاً. |
| FR-I03 | محرك الإشعارات (In-App & Email) | إرسال تنبيهات لحظية لكافة الأدوار بحسب الأحداث (حجز، عرض سعر جديد، قبول عقد، فحص تذكرة). |
| FR-I04 | لوحات الإحصائيات (Analytics Dashboards) | لوحات تفصيلية لكل دور: إحصائيات المبيعات والحضور للمنظم، أداء العروض للشركات، والصحة العامة للمنصة للأدمن. |

---

### 1.3 المتطلبات غير الوظيفية (Non-Functional Requirements)

| ID | الخاصية | المعيار الهندسي المطلوب |
|----|---------|-------------------------|
| **NFR-01** | **الأمان (Security)** | تشفير كلمات المرور (Argon2 / bcrypt)، توثيق JWT، تطبيق قيود RBAC، تشفير اتصالات HTTPS، وتأمين المتغيرات البيئية الحساسة. |
| **NFR-02** | **حماية الـ API** | تطبيق `Rate Limiting` على الـ Endpoints الحساسة (Auth, Payment, Search, Check-in) للحد من هجمات DoS والـ Brute Force. |
| **NFR-03** | **أمان التذاكر (Anti-Fraud)** | اختبار ومنع هجمات إعادة الإرسال (`Replay Attack Prevention`) ومنع استخدام رمز الـ QR أكثر من مرة واحدة بآليات قفل ذرية في قاعدة البيانات. |
| **NFR-04** | **سرعة الاستجابة (Performance)** | التحقق من تذكرة QR على البوابة يتم في أقل من ثانية واحدة (< 1s). استجابات الـ REST API العادية < 200ms. |
| **NFR-05** | **التوفر اللحظي (Real-Time)** | اتصال مستقر عبر Socket.IO لتحديث عدادات البوابات فورياً والإشعارات الحية دون الحاجة لـ Polling متكرر. |
| **NFR-06** | **المعمارية النظيفة (Architecture)** | Modular Monolith للـ Core Backend، وMicroservice مستقل للـ AI؛ واجهات الـ API تكون **Client-Agnostic** لضمان ربط الـ Mobile App مستقبلاً دون أي تعديل. |
| **NFR-07** | **قاعدة البيانات (Database)** | محرك MySQL بنظام التطبيع 3NF مع علاقات Foreign Keys وفهارس Indexes على أعمدة البحث واستخدام Prisma كـ Type-Safe ORM. |
| **NFR-08** | **التصميم وسهولة الاستخدام (UI/UX)** | واجهة تفاعلية كاملة متوافقة مع معايير الوصولية WCAG 2.1 ومتجاوبة بالكامل مع شاشات الهواتف والتابلت وأجهزة الحاسوب. |
| **NFR-09** | **المرونة والتعافي (Fallback Mode)** | في حال عدم توفر خدمة الذكاء الاصطناعي (AI Microservice down)، ينتقل الـ Backend تلقائياً إلى البحث التقليدي عبر الكلمات المفتاحية (Keyword Search) دون توقف النظام. |

---

## 2. User Stories (قصص المستخدمين المحدثة)

### 2.1 Attendee (الزائر / الحاضر)
* **US-A01**: As an **Attendee**, I want to **register and verify my email**, so that I can create a secure personal account.
* **US-A02**: As an **Attendee**, I want to **reset my password via email**, so that I can recover my account if forgotten.
* **US-A03**: As an **Attendee**, I want to **browse and filter events** by category, location, date, format, and price, so that I find what suits me.
* **US-A04**: As an **Attendee**, I want to **search using the conversational AI Assistant**, so that I can express my requirements in natural Arabic or English.
* **US-A05**: As an **Attendee**, I want to **receive personalized event recommendations**, so that I discover relevant activities effortlessly.
* **US-A06**: As an **Attendee**, I want to **book tickets and complete mock payment**, so that my seats are confirmed immediately.
* **US-A07**: As an **Attendee**, I want to **access my digital tickets with secure QR codes**, so that I can easily enter the venue.
* **US-A08**: As an **Attendee**, I want to **cancel eligible tickets**, so that I can get refunds according to event policy.
* **US-A09**: As an **Attendee**, I want to **join a waiting list when an event is sold out**, so that I get notified if tickets become available.
* **US-A10**: As an **Attendee**, I want to **save events to my favorites**, so that I can easily find them later.
* **US-A11**: As an **Attendee**, I want to **leave reviews and ratings after attending**, so that I share my experience with others.
* **US-A12**: As an **Attendee**, I want to **manage my notification preferences**, so that I control which alerts I receive.

### 2.2 Event Organizer (منظم الفعاليات)
* **US-O01**: As an **Organizer**, I want to **create and edit events (Draft)** with schedule, speakers, format, and sponsors, so that I structure my program.
* **US-O02**: As an **Organizer**, I want to **define multiple ticket tiers with capacity and prices**, so that I monetize my event effectively.
* **US-O03**: As an **Organizer**, I want to **submit my event for admin approval**, so that it is published to the public marketplace.
* **US-O04**: As an **Organizer**, I want to **use the AI Logistics Planner**, so that I receive automated suggestions for equipment, catering, and staging based on attendee count and budget.
* **US-O05**: As an **Organizer**, I want to **create and broadcast RFQs**, so that verified execution companies can bid on my needs.
* **US-O06**: As an **Organizer**, I want to **view AI-ranked vendor matches with match percentages**, so that I quickly identify top suppliers.
* **US-O07**: As an **Organizer**, I want to **compare received quotations side by side and award a contract**, so that I finalize vendor agreements.
* **US-O08**: As an **Organizer**, I want to **manage and track Service Orders through their execution lifecycle**, so that services are delivered on time.
* **US-O09**: As an **Organizer**, I want to **scan QR tickets via web camera with instant verification**, so that entry is rapid and secure.
* **US-O10**: As an **Organizer**, I want to **view live attendance counters via Socket.IO**, so that I monitor gate capacity in real time.
* **US-O11**: As an **Organizer**, I want to **review vendors after service completion**, so that I contribute to marketplace accountability.
* **US-O12**: As an **Organizer**, I want to **view an analytics dashboard (sales, check-ins, views)**, so that I measure event ROI.

### 2.3 Execution Company / Vendor (شركة التنفيذ والخدمات)
* **US-V01**: As a **Company**, I want to **register and complete onboarding profile**, so that my services and service areas are listed.
* **US-V02**: As a **Company**, I want to **submit KYC documents (commercial register and tax card)**, so that my account becomes verified.
* **US-V03**: As a **Company**, I want to **manage my service catalog and price ranges**, so that organizers can see my capabilities.
* **US-V04**: As a **Company**, I want to **browse and receive matching RFQ invitations**, so that I discover new business opportunities.
* **US-V05**: As a **Company**, I want to **submit detailed quotations (price, deliverables, duration, terms)**, so that I compete for event contracts.
* **US-V06**: As a **Company**, I want to **manage active service orders and update execution progress**, so that organizers stay informed.
* **US-V07**: As a **Company**, I want to **view my vendor performance dashboard (RFQs, quotes, orders, ratings)**, so that I evaluate my pipeline.
* **US-V08**: As a **Company**, I want to **view feedback and reviews from organizers**, so that I improve my service quality.

### 2.4 Super Admin (إدارة وحوكمة المنصة)
* **US-S01**: As an **Admin**, I want to **review and moderate pending events (Approve / Reject / Suspend)**, so that platform content is trusted.
* **US-S02**: As an **Admin**, I want to **review vendor KYC submissions (Approve / Reject / Request Revision)**, so that only legitimate companies operate.
* **US-S03**: As an **Admin**, I want to **manage user accounts, roles, and status (active / suspended)**, so that platform security is maintained.
* **US-S04**: As an **Admin**, I want to **manage event categories and service categories**, so that marketplace taxonomy remains organized.
* **US-S05**: As an **Admin**, I want to **monitor platform transactions, bookings, and disputes**, so that I resolve conflicts.
* **US-S06**: As an **Admin**, I want to **view platform-wide analytics and system health metrics**, so that I monitor overall business performance.
* **US-S07**: As an **Admin**, I want to **broadcast system announcements and notifications**, so that important updates reach users.

---

## 3. تصميم الـ Database المحدث (3NF Schema)

**محرك التخزين:** MySQL  
**أداة الربط (ORM):** Prisma  
**حالة التطبيع:** Third Normal Form (3NF)

### 3.1 مخطط العلاقات (ERD Diagram)

```mermaid
erDiagram
    ROLES ||--o{ USERS : assigns
    ROLES ||--o{ ROLE_PERMISSIONS : has
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : defines
    USERS ||--o| CUSTOMERS : extends
    USERS ||--o| ORGANIZERS : extends
    USERS ||--o| EXECUTION_COMPANIES : extends
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ NOTIFICATION_PREFERENCES : configures

    ORGANIZERS ||--o{ EVENTS : creates
    EVENT_CATEGORIES ||--o{ EVENTS : categorizes
    VENUES ||--o{ EVENTS : hosts
    EVENTS ||--o{ EVENT_SCHEDULES : contains
    EVENTS ||--o{ TICKET_TYPES : offers
    EVENTS ||--o{ SPONSORS : has
    SPEAKERS ||--o{ EVENT_SPEAKERS : participates
    EVENTS ||--o{ EVENT_SPEAKERS : features

    CUSTOMERS ||--o{ BOOKINGS : places
    EVENTS ||--o{ BOOKINGS : receives
    BOOKINGS ||--o{ BOOKING_ITEMS : contains
    TICKET_TYPES ||--o{ BOOKING_ITEMS : items
    BOOKINGS ||--o{ TICKETS : generates
    TICKETS ||--|| QR_TICKETS : signs
    TICKETS ||--o| CHECKINS : logs
    BOOKINGS ||--o{ PAYMENTS : pays

    ORGANIZERS ||--o{ SERVICE_REQUESTS : posts
    EVENTS ||--o{ SERVICE_REQUESTS : requires
    SERVICE_CATEGORIES ||--o{ SERVICES : groups
    SERVICES ||--o{ COMPANY_SERVICES : catalogued
    EXECUTION_COMPANIES ||--o{ COMPANY_SERVICES : provides
    SERVICE_REQUESTS ||--o{ QUOTATIONS : receives
    EXECUTION_COMPANIES ||--o{ QUOTATIONS : submits
    QUOTATIONS ||--o| CONTRACTS : creates
    CONTRACTS ||--o{ SERVICE_ORDERS : executes

    CUSTOMERS ||--o{ REVIEWS : writes
    ORGANIZERS ||--o{ REVIEWS : rates_vendor
    CUSTOMERS ||--o{ FAVORITES : saves
    CUSTOMERS ||--o{ AI_CONVERSATIONS : conducts
    AI_CONVERSATIONS ||--o{ AI_MESSAGES : logs
    CUSTOMERS ||--o{ AI_RECOMMENDATIONS : receives
```

---

### 3.2 الجداول التفصيلية حسب النطاقات (Database Domains)

#### Domain 1 — Identity, Roles & Permissions
* **`roles`**: `id`, `name` (Attendee, Organizer, Vendor, Admin), `created_at`.
* **`permissions`**: `id`, `slug`, `module`, `description`.
* **`role_permissions`**: `role_id`, `permission_id` (Composite PK).
* **`users`**: `id`, `email` (UK), `password_hash`, `name`, `phone`, `role_id`, `status` (`ACTIVE`, `SUSPENDED`, `PENDING_VERIFICATION`), `created_at`, `updated_at`.
* **`customers`**: `user_id` (PK/FK), `preferences_json`, `city`.
* **`organizers`**: `user_id` (PK/FK), `organization_name`, `bio`, `website`, `logo_path`.
* **`execution_companies`**: `user_id` (PK/FK), `company_name`, `contact_person`, `location`, `service_areas_json`, `commercial_register_path`, `tax_card_path`, `verification_status` (`PENDING`, `VERIFIED`, `REJECTED`, `REVISION_REQUESTED`), `rejection_reason`.

#### Domain 2 — Events & Catalogs
* **`event_categories`**: `id`, `name`, `slug`, `icon`.
* **`venues`**: `id`, `name`, `address`, `city`, `latitude`, `longitude`, `capacity`.
* **`events`**: `id`, `organizer_id`, `category_id`, `venue_id`, `title`, `description`, `format` (`IN_PERSON`, `ONLINE`, `HYBRID`), `cover_image_path`, `capacity`, `status` (`DRAFT`, `PENDING_APPROVAL`, `APPROVED`, `REJECTED`, `PUBLISHED`, `ACTIVE`, `COMPLETED`, `CANCELLED`), `created_at`.
* **`event_schedules`**: `id`, `event_id`, `title`, `start_at`, `end_at`, `location_room`.
* **`speakers`**: `id`, `name`, `bio`, `photo_path`, `cv_path`, `linkedin_url`.
* **`event_speakers`**: `event_id`, `speaker_id` (Composite PK).
* **`sponsors`**: `id`, `event_id`, `name`, `logo_path`, `tier`.

#### Domain 3 — Ticketing, Bookings & Check-in
* **`ticket_types`**: `id`, `event_id`, `name`, `price`, `capacity`, `available_quantity`, `cancellable` (Boolean).
* **`bookings`**: `id`, `customer_id`, `event_id`, `total_amount`, `status` (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`), `created_at`.
* **`booking_items`**: `id`, `booking_id`, `ticket_type_id`, `quantity`, `unit_price`.
* **`tickets`**: `id`, `booking_id`, `ticket_type_id`, `ticket_code`, `status` (`RESERVED`, `CONFIRMED`, `USED`, `CANCELLED`).
* **`qr_tickets`**: `id`, `ticket_id` (UK), `token` (Encrypted / Signed JWT UK), `qr_image_path`, `issued_at`.
* **`checkins`**: `id`, `ticket_id` (UK), `event_id`, `checked_in_by`, `checked_in_at`, `gate_number`.
* **`payments`**: `id`, `booking_id`, `amount`, `provider` (MOCK / STRIPE), `provider_reference`, `status` (`PENDING`, `SUCCESS`, `FAILED`), `paid_at`.

#### Domain 4 — B2B Marketplace & Operations
* **`service_categories`**: `id`, `name`, `icon`.
* **`services`**: `id`, `category_id`, `name`, `description`.
* **`company_services`**: `id`, `company_id`, `service_id`, `pricing_reference`, `description`, `is_available`.
* **`service_requests` (RFQ)**: `id`, `organizer_id`, `event_id`, `requirements_text`, `estimated_budget`, `execution_date`, `status` (`OPEN`, `CLOSED`, `AWARDED`, `EXPIRED`), `created_at`.
* **`quotations`**: `id`, `request_id`, `company_id`, `proposed_price`, `scope_of_work`, `duration`, `terms`, `deliverables_json`, `status` (`PENDING`, `ACCEPTED`, `REJECTED`, `EXPIRED`), `created_at`.
* **`contracts`**: `id`, `quotation_id` (UK), `terms_text`, `status` (`ACTIVE`, `FULFILLED`, `DISPUTED`), `created_at`.
* **`service_orders`**: `id`, `contract_id`, `order_number`, `status` (`PENDING`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), `completion_date`.

#### Domain 5 — Social, Interactions & Notifications
* **`reviews`**: `id`, `author_id`, `event_id` (Nullable), `company_id` (Nullable), `rating_overall`, `quality_score`, `communication_score`, `value_score`, `comment`, `created_at`.
* **`favorites`**: `customer_id`, `event_id` (Composite PK).
* **`notifications`**: `id`, `user_id`, `type`, `title`, `message`, `action_url`, `is_read`, `created_at`.
* **`notification_preferences`**: `id`, `user_id` (UK), `email_enabled`, `sms_enabled`, `booking_updates`, `marketing_alerts`.

#### Domain 6 — AI Microservice Logs & Platform Analytics
* **`ai_conversations`**: `id`, `customer_id`, `session_id` (UK), `status` (`ACTIVE`, `RESOLVED`, `CLOSED`), `created_at`.
* **`ai_messages`**: `id`, `conversation_id`, `sender` (`USER`, `ASSISTANT`), `message_text`, `extracted_slots_json`, `created_at`.
* **`ai_recommendations`**: `id`, `customer_id`, `event_id`, `score`, `reasons_json`, `source` (`HYBRID_V1`, `NLP_SEARCH`), `created_at`.
* **`event_analytics`**: `id`, `event_id` (UK), `views_count`, `bookings_count`, `checked_in_count`, `revenue`.

---

## 4. API Contracts المحدثة

**Base URL:** `https://api.smartevent.com/api/v1`  
**Authentication:** `Authorization: Bearer <JWT>`  
**Realtime:** `wss://api.smartevent.com/realtime` (Socket.IO)

### 4.1 نسق الرد الموحد (Unified Response Format)
```json
// Success Response
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 100 },
  "error": null
}

// Error Response
{
  "success": false,
  "data": null,
  "error": {
    "code": "TICKET_ALREADY_USED",
    "message": "هذه التذكرة تم استخدامها للدخول مسبقاً في تمام 08:30 PM"
  }
}
```

### 4.2 Auth & User Management Endpoints
* `POST /auth/register` — تسجيل مستخدم جديد
* `POST /auth/login` — تسجيل الدخول وإرجاع JWT
* `POST /auth/logout` — تسجيل الخروج وإبطال الجلسة
* `POST /auth/forgot-password` — إرسال رابط استعادة كلمة المرور
* `POST /auth/reset-password` — تعيين كلمة المرور الجديدة بواسطة Token
* `POST /auth/verify-email` — تفعيل الحساب عبر الرمز
* `GET /users/me` — استعراض بيانات الحساب الحالي
* `PATCH /users/me` — تعديل البيانات الشخصية
* `GET/PATCH /users/me/notification-preferences` — قراءة وتعديل تفضيلات التنبيهات
* `GET /admin/users` — استعراض وفلترة جميع المستخدمين (Admin)
* `PATCH /admin/users/:id/status` — تجميد أو إعادة تفعيل مستخدم (Admin)

### 4.3 Events & Public Discovery Endpoints
* `GET /events` — استعراض الفعاليات المنشورة بفلترة متعددة (Category, Location, Date, Format, Price)
* `GET /events/:id` — تفاصيل الفعالية كاملة (الأجندة، المتحدثين، فئات التذاكر، الرعاة، التقييمات)
* `POST /events` — إنشاء مسودة فعالية جديدة (Organizer)
* `PATCH /events/:id` — تعديل بيانات الفعالية (Organizer)
* `POST /events/:id/submit` — تقديم الفعالية للمراجعة (`PENDING_APPROVAL`)
* `POST /admin/events/:id/review` — اعتماد الفعالية أو رفضها مع السبب (Admin)
* `POST /events/:id/publish` — نشر الفعالية بعد اعتمادها (Organizer)
* `CRUD /events/:id/schedules`, `/speakers`, `/sponsors` — إدارة الموارد الفرعية للفعالية
* `GET /categories`, `/venues` — جلب التصنيفات والأماكن المتاحة

### 4.4 Bookings, Payments & QR Check-in Endpoints
* `POST /bookings` — إنشاء حجز جديد بحالة `PENDING`
* `GET /bookings/:id` — جلب تفاصيل الحجز
* `POST /bookings/:id/pay` — دفع الحجز عبر Mock Gateway وإصدار التذاكر
* `POST /bookings/:id/cancel` — طلب إلغاء الحجز واسترداد القيمة وفق الشروط
* `GET /tickets/me` — محفظة التذاكر الرقمية الخاصة بالمستخدم
* `GET /tickets/:id/qr` — الحصول على كود الـ QR والتذكرة الرقمية
* `POST /events/:id/waiting-list` — الانضمام لقائمة الانتظار عند نفاد التذاكر
* `POST /checkins/verify` — فحص التذكرة على البوابة (Organizer Scanner):
  * **Input:** `{ "token": "string" }`
  * **Output 200:** `{ "valid": true, "ticket": {...}, "attendeeName": "..." }`
  * **Output 400:** `{ "valid": false, "reason": "ALREADY_USED" | "EXPIRED" | "FORGED" }`
* **WebSocket Event:** `attendance_update` → `{ "eventId": 12, "checkedInCount": 350, "totalCapacity": 500 }`

### 4.5 B2B Marketplace & Service Orders Endpoints
* `GET /companies/:id` — استعراض الملف التعريفي العام للشركة (الخدمات، الأعمال السابقة، التقييمات)
* `CRUD /companies/services` — إدارة كتالوج الخدمات والأسعار (Vendor)
* `POST /companies/kyc` — رفع مستندات السجل التجاري والبطاقة الضريبية (Vendor)
* `PATCH /admin/companies/:id/kyc` — مراجعة أوراق الشركة (`VERIFIED` / `REJECTED` / `REVISION_REQUESTED`) (Admin)
* `POST /rfq` — إنشاء طلب عروض أسعار جديد (Organizer)
* `GET /rfq` — استعراض طلبات الأسعار (حسب الدور والتفويض)
* `GET /rfq/:id` — تفاصيل طلب الـ RFQ
* `POST /quotations` — تقديم عرض سعر لطلب RFQ (Vendor)
* `GET /rfq/:id/quotations` — عرض ومقارنة عروض الأسعار الواردة (Organizer)
* `PATCH /rfq/:id/select-vendor` — ترسية العقد على شركة معينة وإنشاء الـ Contract (Organizer)
* `GET /service-orders` — قائمة أوامر التشغيل (Organizer / Vendor)
* `GET /service-orders/:id` — تفاصيل أمر التشغيل
* `PATCH /service-orders/:id/status` — تحديث مرحلة التنفيذ (Vendor / Organizer)
* `POST /companies/:id/reviews` — تقييم شركة التنفيذ بعد انتهاء العمل (Organizer)

### 4.6 Dashboards & Administration Endpoints
* `GET /organizer/dashboard` — مؤشرات أداء المنظم (الفعاليات، التذاكر، الحضور المباشر، عروض الأسعار)
* `GET /vendor/dashboard` — مؤشرات أداء الشركة (الطلبات الواردة، العروض النشطة، أوامر التشغيل، التقييم)
* `GET /admin/analytics` — إحصائيات النظام العامة ومؤشرات الصحة والنشاط (Admin)
* `CRUD /admin/categories` — إدارة تصنيفات الفعاليات والخدمات (Admin)

### 4.7 AI Microservice Internal Contracts (FastAPI Base: `http://ai-service:8000/internal/v1`)
* `POST /nlp/chat` — استخراج الـ Slots ومتابعة حوار الاكتشاف
* `POST /recommend/hybrid` — حساب درجات التوصيات وترتيب الفعاليات للمستخدم
* `POST /logistics/suggest` — اقتراح الموارد والتجهيزات اللازمة لفعالية معينة
* `POST /rfq/match` — مطابقة وترتيب الموردين الأنسب لطلب RFQ محدد

---

## 5. متطلبات الذكاء الاصطناعي (AI Requirements)

### 5.1 القاعدة الذهبية لمعمارية الـ AI (§9 في الوثيقة المعتمدة)
> [!IMPORTANT]
> **الذكاء الاصطناعي لا يمتلك أي سلطة تنفيذية تجارية (No Business Authority):**  
> جميع مخرجات الـ AI تعتبر **اقتراحات استرشادية (Suggestions)** فقط.  
> دورة العمل الإلزامية:  
> `AI Microservice (Suggest)` → `Node.js Backend (Validate & Enforce Rules)` → `User (Explicit Confirm)` → `Business Execution`.

```mermaid
sequenceDiagram
    autonumber
    actor User as المستخدم (Organizer / Attendee)
    participant Core as Node.js Backend
    participant AI as FastAPI AI Service
    participant DB as MySQL Database

    User->>Core: طلب ذكي (بحث باللغة الطبيعية / تخطيط لوجستي)
    Core->>AI: تحويل الطلب مع البيانات المرجعية
    Note over AI: تطبيق خوارزميات NLP / التوصية / التخطيط
    AI-->>Core: مخرجات استرشادية (Suggestions & Ranked Matches)
    Core->>Core: التحقق من صحة القواعد والصلاحيات (Validation)
    Core-->>User: عرض النتائج المقترحة للمراجعة
    User->>Core: تأكيد واعتماد الإجراء (Explicit Confirmation)
    Core->>DB: حفظ العملية التنفيذية المعتمدة
```

### 5.2 مهام موديول الذكاء الاصطناعي (Core AI Modules)
1. **AI-01: Conversational Assistant**: مساعد دردشة ذكي يفهم نية المستخدم باللغتين العربية والإنجليزية.
2. **AI-02: Intent & Slot Extraction**: استخراج محددات الفعالية: `Category`, `Location`, `Date`, `Budget`, `Format` (In-Person/Online/Hybrid).
3. **AI-03: Hybrid Recommendation Engine**: توليد توصيات مخصصة لكل مستخدم بناءً على:
   * تطابق التصنيف والموقع (`Content-Based`).
   * التفضيلات وسجل الحضور والتقييمات (`Collaborative & User History`).
   * شعبية الفعالية ومعدل حجزها (`Popularity Score`).
4. **AI-04: Logistics Planner**: اقتراح جداول التجهيزات (صوت، إضاءة، مسارح، شاشات، أمن، ضيافة، تصوير) بناءً على نوع الفعالية، الطاقة الاستيعابية، والميزانية المقدرة.
5. **AI-05: Vendor Matching Engine**: ترشيح الشركات المعتمدة لطلبات الأسعار وفق المعايير الستة المحددة:
   `Services Match` + `Location Proximity` + `Availability` + `Rating` + `Experience` + `Estimated Cost`.

---

## 6. تدفقات العمل الرئيسية (System Workflows)

### 6.1 مسار الحاضر (Attendee Journey)
```
1. Register / Login → 2. Discover / AI Chat Search → 3. View Event Details → 4. Select Tickets → 
5. Mock Payment → 6. Booking Confirmation → 7. Digital Ticket & QR → 8. Gate Check-in → 9. Event Review
```

### 6.2 مسار المنظم (Organizer Journey)
```
1. Register / Login → 2. Create Event (Draft) → 3. AI Logistics Planner (Optional) → 
4. Submit for Approval → 5. Publish Event → 6. Monitor Sales → 7. Post RFQ for Vendors → 
8. AI Vendor Matching → 9. Review Quotations → 10. Award Contract & Service Order → 
11. Gate QR Check-in → 12. Review Analytics & Rate Vendors
```

### 6.3 مسار شركة التنفيذ (Vendor Journey)
```
1. Register → 2. Vendor Onboarding (Services & Areas) → 3. Submit KYC (Commercial & Tax) → 
4. Admin Approval → 5. Receive RFQ Alerts → 6. Submit Quotation → 7. Contract Awarded → 
8. Execute Service Order → 9. Complete & Receive Reviews
```

---

## 7. دليل شاشات واجهات المستخدم لمصمم الـ UI (UI/UX Screen Inventory)

> **إجمالي الشاشات المعتمدة:** 78 شاشة تفاعلية موزعة على 5 فئات رئيسية مستخرجة بالكامل من وثيقة المشروع `📘 Smart Event.pdf`.

### 7.1 شاشات الحاضر / العميل — Attendee (15 شاشة)

| الكود | اسم الشاشة | الوصف والمكونات الرئيسية | الحالة / المتغيرات |
|-------|------------|--------------------------|---------------------|
| **A01** | Landing / Home Page | الواجهة الترحيبية: Hero Banner مع بحث سريع، فئات الفعاليات، الفعاليات المميزة، التوصيات، الفعاليات الأكثر شعبية، ومربع دعوة للانضمام (CTA). | Public / Logged-in |
| **A02** | Event Discovery | صفحة الاستكشاف: شريط فلاتر جانبي (Category, Location, Date, Format, Price Range)، عرض Grid للفعاليات، وترتيب حسب التاريخ/السعر/الشعبية. | Full / Empty / Loading |
| **A03** | AI Event Assistant | واجهة الدردشة الذكية مع الـ AI: فقاعات الحوار، عرض الأسئلة التفاعلية (Slot Filling)، وبطاقات الفعاليات المقترحة داخل المحادثة. | Chatting / Suggesting |
| **A04** | Recommended For You | صفحة التوصيات المخصصة للمستخدم مبنية على سجل حجوزاته واهتماماته مع درجات التطابق (Match Score). | Grid / Empty state |
| **A05** | Event Details | التفاصيل الكاملة: غلاف الفعالية، العنوان، التاريخ، التوقيت، خريطة المكان، نبذة عن المنظم، جدول الأعمال (Agenda)، المتحدثون، الرعاة، فئات التذاكر، وتقييمات الحضور. | Published / Sold Out |
| **A06** | Booking Flow | حجز التذاكر: اختيار فئة التذكرة، اختيار الكميات، ملخص الحساب والرسوم، وإدخال بيانات الحاضرين. | Multi-step Form |
| **A07** | Payment (Mock) | واجهة محاكاة الدفع: اختيار وسيلة الدفع الوهمية (Card / Wallet)، إدخال البيانات، وزر إتمام الدفع أو فشل العملية للاختبار. | Success / Failed simulation |
| **A08** | Booking Confirmation | تأكيد الحجز: كود الحجز، تفاصيل المقاعد، زر تحميل التذاكر، ورسالة تأكيد فورية. | Static Success |
| **A09** | My Tickets | محفظة التذاكر: بطاقات التذاكر القادمة والسابقة مع رمز الـ QR المصغر وحالة التذكرة (`Valid`, `Used`, `Cancelled`). | List / Empty state |
| **A10** | Digital Ticket View | التذكرة الرقمية عالية الدقة: رمز QR كبير وقابل للمسح، باركود، تفاصيل المقعد، الفعالية، وبيانات البوابة وتعليمات الدخول. | Valid / Used Watermark |
| **A11** | My Bookings History | سجل الحجوزات: تبويبات (Upcoming, Completed, Cancelled) مع خيار تنزيل الفواتير وإلغاء الحجز المؤهل. | Tabbed List |
| **A12** | Saved Favorites | قائمة الفعاليات المحفوظة في المفضلة مع إمكانية الحذف السريع أو الحجز المباشر. | Grid / Empty state |
| **A13** | Notifications Center | مركز الإشعارات: تنبيهات الحجز، تذكير بموعد الفعالية، تحديثات المكان، مع فرز المقروء وغير المقروء. | Read / Unread filters |
| **A14** | Attendee Profile | الملف الشخصي: تعديل الاسم، الصورة، الهاتف، المدينة، اختيار مجالات الاهتمام المفضلة، وتغيير كلمة المرور. | Editable Form |
| **A15** | Event Review Modal/Page | نموذج تقييم الفعالية بعد حضورها: تقييم بالنجوم (1-5)، تقييم التنظيم، وكتابة مراجعة نصية. | Form / Submitted |

---

### 7.2 شاشات منظم الفعاليات — Event Organizer (25 شاشة)

| الكود | اسم الشاشة | الوصف والمكونات الرئيسية | الحالة / المتغيرات |
|-------|------------|--------------------------|---------------------|
| **O01** | Organizer Dashboard | لوحة التحكم العامة: بطاقات KPIs (إجمالي الفعاليات، التذاكر المباعة، الإيرادات، نسبة الحضور)، ورسوم بيانية ورسائل تنبيه. | Dynamic Charts |
| **O02** | My Events List | إدارة الفعاليات: تبويبات الحالات (`Draft`, `Pending Approval`, `Published`, `Completed`, `Cancelled`) مع خيارات الإدارة. | Tabbed Table |
| **O03** | Create Event Wizard | معالج إنشاء فعالية (خطوات متسلسلة): البيانات الأساسية، المكان والصيغة، التواريخ، التذاكر، المتحدثين، والأجندة. | Step 1 to 5 Form |
| **O04** | Edit Event | تعديل بيانات فعالية قائمة ومراجعة حالتها. | Form View |
| **O05** | Event Command Center | مركز إدارة فعالية محددة: تبويبات داخلية (Overview, Tickets, Agenda, Speakers, Sponsors, Bookings, Check-in, RFQs, Analytics). | Tabbed Hub |
| **O06** | Ticket Tiers Management | إدارة فئات التذاكر: تحديد الاسم، السعر، السعة المتاحة، شروط الإلغاء، ومتابعة الكميات المتبقية. | Table + Modal |
| **O07** | Agenda Builder | بناء جدول الأعمال: إضافة الجلسات، التوقيت، القاعات، وتعيين المتحدث لكل جلسة. | Timeline / List |
| **O08** | Speakers Management | إدارة المتحدثين: إضافة صورة، السيرة الذاتية، المنصب، وحساب LinkedIn. | Grid Cards + Modal |
| **O09** | Sponsors Management | إدارة الرعاة: رفع شعارات الرعاة وتحديد فئة الرعاية (Platinum, Gold, Silver). | Grid Cards + Upload |
| **O10** | Event Bookings List | قائمة الحجوزات التفصيلية للفعالية: اسم العميل، عدد التذاكر، حالة الدفع، وزر تصدير Excel/PDF. | Searchable Table |
| **O11** | Gate Check-in Dashboard | لوحة مراقبة البوابات اللحظية: عداد الحضور المباشر المتصل بـ Socket.IO، الحاضرين، المتبقين، ومحاولات الدخول الخاطئة. | Live WebSocket View |
| **O12** | Gate QR Scanner | تطبيق الماسح الضوئي للبوابات: شاشة كاميرا لمسح الـ QR مع صوت وإشارة ضوئية خضراء (مقبول) أو حمراء (مرفوض مع السبب). | Camera Scan State |
| **O13** | AI Event Planner Input | مدخلات التخطيط اللوجستي بالذكاء الاصطناعي: نوع الفعالية، عدد الحضور المتوقع، نوع القاعة، والميزانية التقديرية. | AI Prompt Form |
| **O14** | AI Logistics Suggestions | نتائج المخطط اللوجستي: بنود مقترحة (صوت، إضاءة، مسرح، شاشات، أمن، ضيافة) مع الكميات المقدرة وزر تحويلها إلى طلب RFQ. | Editable AI Cards |
| **O15** | Vendor Marketplace | سوق الشركات: تصفح شركات التنفيذ مع فلاتر (نوع الخدمة، التقييم، المدينة، توفر الخدمة). | Grid with Filters |
| **O16** | Vendor Public Profile | صفحة بروفايل الشركة: نبذة، حالة التوثيق KYC، كتالوج الخدمات، معرض الأعمال السابقة، وتقييمات المنظمين. | Profile Showcase |
| **O17** | Create RFQ | نموذج طرح طلب عروض أسعار: اختيار الفعالية، بنود الخدمة المطلوبة، الموعد، الشروط، والميزانية القصوى. | Multi-field Form |
| **O18** | RFQ Details & Tracking | صفحة متابعة طلب الـ RFQ: ملخص الطلب، الشركات التي تم دعوتها، وعدد العروض المقدمة. | Detailed Summary |
| **O19** | AI Vendor Matches | نتائج مطابقة الموردين الذكية: قائمة بأفضل الشركات المرشحة مع نسبة التوافق (Match Score %) وأسباب الترشيح. | Ranked AI List |
| **O20** | Quotations Comparison | مقارنة عروض الأسعار: جدول مقارنة جانبي للعروض الواردة (السعر، مدة التنفيذ، التقييم، نطاق العمل). | Comparison Matrix |
| **O21** | Quotation Details View | تفاصيل عرض السعر الفردي: نطاق العمل التفصيلي، التكلفة، الشروط، وزر قبول العقد أو رفضه. | Contract Preview |
| **O22** | Service Orders Hub | متابعة أوامر التنفيذ: قائمة العمليات المتعاقد عليها مع مؤشرات الإنجاز (`Pending`, `In Progress`, `Completed`). | Operations Table |
| **O23** | Service Order Details | تفاصيل أمر التنفيذ: مراحل تسليم العمل، التحديثات المشتركة مع الشركة، وتأكيد الاستلام النهائي. | Tracking Timeline |
| **O24** | Vendor Review Modal | تقييم شركة التنفيذ بعد إنهاء العمل: تقييم جودة الخدمة، الالتزام بالوقت، القيمة مقابل السعر. | Rating Dialog |
| **O25** | Organizer Notifications | مركز إشعارات المنظم: تنبيهات مبيعات التذاكر، عروض الأسعار الجديدة، واعتمادات الفعاليات. | Activity Feed |

---

### 7.3 شاشات شركة التنفيذ والخدمات — Execution Company (16 شاشة)

| الكود | اسم الشاشة | الوصف والمكونات الرئيسية | الحالة / المتغيرات |
|-------|------------|--------------------------|---------------------|
| **V01** | Vendor Registration | صفحة التسجيل الخاصة بالشركات: اسم الشركة، البريد التجاري، الهاتف، وبيانات المسؤول. | Step 1 Signup |
| **V02** | Vendor Onboarding | إكمال الملف التعريفي: نبذة عن الشركة، عنوان المقر، اختيار مجالات الخدمات التي تقدمها، وتحديد النطاق الجغرافي. | Multi-step Setup |
| **V03** | KYC Documents Upload | رفع وثائق التوثيق الرسمي: رفع صورة السجل التجاري والبطاقة الضريبية مع عرض حالة الطلب (`Pending`, `Approved`, `Revision Needed`). | File Upload + Status |
| **V04** | Vendor Dashboard | لوحة التحكم: إحصائيات سريعة (طلبات RFQ الجديدة، العروض المقدمة، العقود قيد التنفيذ، متوسط التقييم، والإيرادات). | Analytics Cards |
| **V05** | Company Profile Editor | تعديل البروفايل العام: تحديث الشعار، معرض صور الأعمال السابقة (Portfolio)، وساعات العمل. | Profile Manager |
| **V06** | Services Catalog | إدارة باقات الخدمات: عرض الخدمات الحالية وحالة تفعيلها والأسعار الاسترشادية. | Catalog Grid |
| **V07** | Add/Edit Service Modal | إضافة أو تعديل خدمة: اسم الخدمة، التصنيف، الوصف، والسعر التقريبي أو طريقة التسعير. | Modal Form |
| **V08** | RFQ Opportunities Inbox | صندوق طلبات عروض الأسعار الواردة: فلترة (جديد، تمت معاينته، تم الرد، منتهي الصلاحية). | Actionable Table |
| **V09** | RFQ Details View | تفاصيل طلب المنظم: متطلبات الفعالية، التواريخ المحددة، الميزانية المتوقعة، ومستندات الشروط. | Detailed Specs |
| **V10** | Submit Quotation Form | تقديم عرض السعر: إدخال السعر المقترح، مدة التنفيذ، نطاق العمل، شروط الدفع، ورفع ملف PDF تفصيلي للعرض. | Proposal Form |
| **V11** | My Quotations Tracker | متابعة عروض الأسعار: قائمة بالعروض المقدمة وموقفها (`Under Review`, `Accepted`, `Rejected`, `Expired`). | Status Tracker |
| **V12** | Active Service Orders | أوامر التنفيذ المسندة للشركة: قائمة بالفعاليات الجاري العمل عليها مع تواريخ التسليم. | Projects List |
| **V13** | Service Order Execution | إدارة عملية التنفيذ: تحديث حالة التقدم (`In Progress` → `Completed`)، تسجيل الملاحظات، وطلب اعتماد الاستلام. | Milestone Manager |
| **V14** | Company Reviews & Feedback | تقييمات المنظمين: استعراض آراء العملاء السابقين، نقاط القوة، وتقييمات الجودة والتواصل. | Feedback Feed |
| **V15** | Vendor Notifications | تنبيهات الشركات: إشعار عند تلقي RFQ جديد، قبول عرض سعر، أو استلام تقييم. | Instant Alerts |
| **V16** | Account & Payout Settings | إعدادات الحساب: بيانات الاتصال الرسمية، وتفضيلات استقبال الطلبات. | Settings Form |

---

### 7.4 شاشات إدارة المنصة — Super Admin (12 شاشة)

| الكود | اسم الشاشة | الوصف والمكونات الرئيسية | الحالة / المتغيرات |
|-------|------------|--------------------------|---------------------|
| **AD01** | Platform Overview Dashboard | لوحة المؤشرات المركزية: إجمالي المستخدمين، عدد الفعاليات النشطة، الشركات المعتمدة، حجم التذاكر، والمبيعات الإجمالية. | Global Analytics |
| **AD02** | User Management | جدول المستخدمين: البحث والفرز حسب الدور (Attendee, Organizer, Vendor, Admin) والحالة (`Active`, `Suspended`). | Filterable Table |
| **AD03** | User Details & Audit Log | ملف المستخدم الإداري: بياناته، تاريخ تسجيله، سجل عملياته داخل المنصة، وأزرار تجميد/تفعيل الحساب. | Detailed Profile |
| **AD04** | Vendor KYC Verification Queue | قائمة الشركات قيد الانتظار: قائمة بطلبات توثيق الشركات الجديدة مع تواريخ التقديم. | Actionable Queue |
| **AD05** | KYC Document Reviewer | فحص مستندات الشركة: معاينة ملف السجل التجاري والبطاقة الضريبية مع أزرار (اعتماد / رفض / طلب تصحيح مستندات مع توضيح السبب). | PDF Viewer + Action |
| **AD06** | Events Moderation Queue | قائمة مراجعة الفعاليات: الفعاليات المقدمة من المنظمين بانتظار الموافقة قبل ظهورها في الـ Marketplace. | Pending Approvals |
| **AD07** | Event Review & Audit | فحص الفعالية: تفاصيل المحتوى، الأجندة، التذاكر، وأزرار (قبول ونشر / رفض مع توجيه ملاحظات للمنظم / إيقاف فوري). | Inspection View |
| **AD08** | Categories & Taxonomy | إدارة التصنيفات: إضافة وتعديل تصنيفات الفعاليات وتصنيفات خدمات الشركات مع الأيقونات والروابط الدلالية. | Taxonomy Builder |
| **AD09** | Disputes & Complaints | إدارة الشكاوى والنزاعات: تذاكر الخلاف بين المنظمين وشركات التنفيذ أو الحضور مع متابعة مسار الحل. | Ticket Management |
| **AD10** | System Health & Analytics | تحليلات المنصة التقنية والتشغيلية: معدلات استجابة الـ API، أداء الـ AI Microservice، ومعدلات الدخول على البوابات. | Performance Charts |
| **AD11** | Broadcast Notifications | إرسال إشعارات جماعية: إنشاء تنبيه أو إعلان للنظام واختيار الفئة المستهدفة (كل المستخدمين / المنظمين / الشركات فقط). | Broadcast Creator |
| **AD12** | Platform System Settings | الإعدادات العامة: إعدادات بوابات الدفع، سياسات الإلغاء الافتراضية، ومتغيرات البيئة التشغيلية. | Configuration Form |

---

### 7.5 الشاشات المشتركة والنظامية — Shared & System Screens (10 شاشات)

| الكود | اسم الشاشة | الوصف والمكونات الرئيسية | الحالة / المتغيرات |
|-------|------------|--------------------------|---------------------|
| **S01** | Unified Login | تسجيل الدخول: البريد الإلكتروني، كلمة المرور، خيار "تذكرني"، ورابط استعادة كلمة المرور. | Clean Form |
| **S02** | Role Selection Register | شاشة التسجيل الأولي: اختيار الدور (أنا حاضر فعاليات / أنا منظم فعاليات / أنا شركة خدمات وتنفيذ). | Role Cards Selector |
| **S03** | Forgot Password | إدخال البريد الإلكتروني لاستلام رمز إعادة تعيين كلمة المرور. | Simple Form |
| **S04** | Reset Password | إدخال كلمة المرور الجديدة وتأكيدها مع مؤشر قوة كلمة المرور. | Validation Form |
| **S05** | Email Verification Pending | شاشة إعلامية للمستخدم بضرورة فحص بريده لتفعيل الحساب مع زر إعادة إرسال الرمز. | Verification Status |
| **S06** | Help Center & FAQs | مركز المساعدة والأسئلة الشائعة حول حجز التذاكر، استخدام الـ QR، وطرح طلبات الـ RFQ. | Searchable Accordion |
| **S07** | 404 Page Not Found | شاشة الخطأ 404 بتصميم احترافي يوضح أن الصفحة غير موجودة مع زر العودة للرئيسية. | Creative Graphic |
| **S08** | 403 Access Denied | شاشة حظر الوصول عند محاولة دخول مسار غير مصرح به بناءً على الـ RBAC. | Security Warning |
| **S09** | 500 Server Error | شاشة خطأ الخادم مع زر إعادة المحاولة وتفاصيل رقم المرجع للدعم الفني. | Fallback View |
| **S10** | Terms of Service & Privacy | شروط الاستخدام وسياسة الخصوصية وحوكمة بيانات المنصة. | Document Layout |

---

## 8. خلاصة Phase 1 للمهندس ومسؤول التقييم

| المحور | الحالة بعد المراجعة والاستكمال | المطابقة مع PDF تفاصيل المشروع |
|--------|:------------------------------:|:------------------------------:|
| **1. Requirements** | **100% مكتمل** (شمل جميع الـ FR و الـ NFR، والأمان، والـ Modular Monolith) | ✅ متطابق بالكامل |
| **2. User Stories** | **100% مكتمل** (39 قصة مستخدم مفصلة تغطي الفاعلين الأربعة مع معايير القبول) | ✅ متطابق بالكامل |
| **3. Database Design** | **100% مكتمل** (6 نطاقات، 30+ جدول بما فيها `service_orders`, `ai_messages`, `permissions`) | ✅ متطابق بالكامل |
| **4. API Contracts** | **100% مكتمل** (عقود REST لكافة العمليات + Socket.IO للـ Gate + عقود الـ AI Microservice) | ✅ متطابق بالكامل |
| **5. AI Requirements** | **100% مكتمل** (تحديد الـ 5 موديولات + ترسيخ القاعدة الذهبية: الـ AI لا يملك سلطة تنفيذية) | ✅ متطابق بالكامل |
| **6. System Workflows** | **100% مكتمل** (المسارات الثلاثة: Attendee, Organizer, Vendor) | ✅ متطابق بالكامل |
| **7. UI Screen Inventory** | **100% مكتمل** (دليل كامل يضم **78 شاشة** مفصلة بالأكواد والمكونات لمصمم الواجهات) | ✅ متطابق بالكامل مع §10–§16 |

> [!TIP]
> هذا المستند يمثل الآن **المرجع الهندسي المتكامل والنهائي (Single Source of Truth)** لمرحلة التحليل (Phase 1 — Analysis)، وهو جاهز بالكامل للتقديم للمهندس المشرف ومصمم الواجهات ومطوري الـ Backend والـ Frontend.