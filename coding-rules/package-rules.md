\# AI Coding Agent Rules for Barbershop Back-End



\## 1. Role and Context

You are an expert Node.js backend developer. This project is a RESTful API built with \*\*Express.js\*\* and \*\*MongoDB (Mongoose)\*\*. It follows a modified MVC architecture (Model-Controller-Route) where core business logic resides in the controllers, and the `services` directory is strictly reserved for external integrations and background jobs.



\## 2. Technology Stack

\- \*\*Runtime:\*\* Node.js

\- \*\*Framework:\*\* Express.js

\- \*\*Database:\*\* MongoDB via Mongoose

\- \*\*Integrations:\*\* Socket.io (WebSockets), Kafka (Event Streaming), PayOS (Payments), Gemini (AI)



\## 3. Architectural Patterns \& File Structure

Always adhere to the existing folder structure when creating new features:

\- `server.js`: The main entry point. New routes must be registered here.

\- `/routes`: Define endpoints and map them to controller methods using `express.Router()`. Do NOT put business logic here.

\- `/controllers`: "Fat controllers." All core business logic, request validation, and database querying goes here. 

\- `/models`: Mongoose schemas only. Ensure appropriate types and `ObjectId` references are set for relational data.

\- `/services`: Use ONLY for third-party integrations (e.g., Email, AI), background tasks, or protocols (Sockets, Kafka). Do not put standard CRUD business logic here.

\- `/middlewares`: Authentication, authorization, and file upload interceptors.



\## 4. Coding Conventions \& Best Practices



\### A. Controllers \& API Responses

\- \*\*Async/Await:\*\* All controller methods must be `async` and wrapped in a `try...catch` block.

\- \*\*Error Handling:\*\* On error, always `console.error` the issue and return a JSON response with the appropriate HTTP status code (e.g., 400 for bad input, 404 for not found, 500 for server errors) and an error message: `res.status(500).json({ message: error.message })`.

\- \*\*Success Responses:\*\* Send data back in standard JSON format: `res.status(200).json(data)`.

\- \*\*Data Parsing:\*\* If receiving array data (like IDs or tags) as a comma-separated string (e.g., from `FormData`), parse it into an array inside the controller before passing to Mongoose.



\### B. Database Operations (Mongoose)

\- \*\*Soft Deletes:\*\* Do not physically delete records from the database. Implement soft deletes by updating an `isActive` boolean flag to `false`.

\- \*\*Relationships:\*\* Use `mongoose.Schema.Types.ObjectId` with the `ref` property for cross-collection relationships. Use `.populate()` in controllers when fetching related data.

\- \*\*Validation:\*\* Rely on Mongoose schema validation (`required: true`, `enum`, etc.) where possible.



\### C. Routes

\- Keep route files clean. 

\- Use standard RESTful naming conventions for endpoints:

&#x20; - `GET /api/resource` (Get all)

&#x20; - `GET /api/resource/:id` (Get one)

&#x20; - `POST /api/resource` (Create)

&#x20; - `PUT /api/resource/:id` (Update)

&#x20; - `DELETE /api/resource/:id` (Soft delete)



\## 5. Security \& Middleware

\- Use existing middlewares for protected routes.

\- Ensure CORS and Cookie-parser configurations in `server.js` remain intact when modifying global middleware.



\## 6. Prohibitions (What NOT to do)

\- DO NOT create a "Service" file for standard database CRUD operations; keep that in the controller.

\- DO NOT use `.then().catch()` syntax. Always use modern `async/await`.

\- DO NOT hardcode sensitive credentials (API keys, database URIs); always use `process.env`.



