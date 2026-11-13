# Modular Monolith + FastAPI AI Microservice

The core business logic (auth, events, ticketing, marketplace, notifications) lives in a single Node.js / Express / TypeScript process (`backend/`) organized as domain modules sharing one MySQL database via Prisma ORM. AI/ML capabilities (NLP, recommendations, logistics planning, vendor matching) live in a separate Python / FastAPI process (`ai-service/`) communicating with the backend over internal REST (`/internal/v1`).

We chose this over a full microservices architecture because the team is small (7 developers, graduation project), and operational overhead of deploying and coordinating multiple Node.js services outweighs the benefit at this scale. We chose it over a pure monolith with embedded Python because Node.js and Python have fundamentally different runtime and dependency models (npm vs pip, V8 vs CPython), and ML libraries (scikit-learn, spaCy, NLTK) are Python-native. The FastAPI boundary also enforces the Golden Rule (ADR-0002): AI cannot directly mutate business state.

The backend is the single source of truth for all data writes. The AI service is stateless and advisory. If the AI service goes down, the backend falls back to keyword/SQL filtering (NFR-09).
