# Advisory AI: Golden Rule and Fallback

All AI Microservice outputs — conversational slot extraction, hybrid recommendations, logistics equipment plans, and vendor match scores — are treated as advisory suggestions with no business authority. The mandatory execution chain is: `AI Microservice (Suggest)` → `Node.js Backend (Validate & Enforce Rules)` → `User (Explicit Confirmation)` → `Business Execution`.

We considered letting the AI service write directly to the database for speed, but rejected it because: (1) business validation rules (RBAC, capacity limits, payment state, contract terms) live in the backend and duplicating them in Python would create dangerous drift; (2) the AI models are probabilistic and their output must be human-reviewable before committing state; (3) a clear boundary makes the AI service independently deployable and replaceable.

When `ai-service/` is unreachable, the backend falls back to traditional keyword search and SQL filtering for discovery, and skips AI-powered logistics/vendor-matching features with a user-visible notice. No user flow crashes due to AI unavailability.
