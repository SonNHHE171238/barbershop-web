\# Barbershop Backend Agent Rules



Layered \*\*REST API\*\* (not classic MVC — no View). Entry: `back-end/server.js` → routes → middlewares → controllers → models/utils/services.



\## Request flow (new HTTP features)



1\. Route in `routes/<domain>.route.js` — middleware, then controller.

2\. Handler in `controllers/<domain>.controller.js` — `exports.name = async (req, res) =>`.

3\. Persistence via `models/` (Mongoose). No repository layer.

4\. Mount once in `server.js`: `app.use('/api/<resource>', require('./routes/...'))`.



Route order: \*\*specific paths before parameterized\*\* (`/me`, `/all` before `/:id`). Protected routes need `authenticate` first.



\## Where to put code



| Concern | Folder |

|---------|--------|

| HTTP + auth chain | `routes/` |

| Orchestration | `controllers/` |

| Shared validation (no req/res) | `utils/` |

| Email, Kafka, Gemini, sockets | `services/` |

| Schema + DB statics | `models/` |

| JWT / role / domain guards | `middlewares/` |

| DB, Redis, Kafka, Cloudinary | `config/` |



Match \*\*CommonJS + Express\*\*. Do not add Nest, repositories, or TypeScript unless asked.



\## Auth



JWT from `Authorization: Bearer` or `cookies.accessToken` → `req.userId`, `req.role` (`middlewares/auth.middleware.js`). Use `authorizeRoles('admin', ...)`. Booking lists: extend `req.bookingFilter` in `middlewares/booking.middleware.js`.



\## Async / side effects



\- \*\*Kafka\*\*: controllers publish (e.g. `user.registered`); consumers in `services/kafka-consumer.service.js` — do not bypass with direct OTP email on register.

\- \*\*Socket.io\*\*: `services/socket.service.js` — chat bypasses routes/controllers.

\- \*\*Uploads\*\*: `routes/upload.route.js` — inline handler + Cloudinary (exception).



\## Do / Don't



\- \*\*Do\*\* use `MONGO\_URI` via `config/db.config.js` (not `config/db.js` / `DB\_URL`).

\- \*\*Do\*\* mount new routes once under `/api/...`.

\- \*\*Do\*\* extract repeated logic to `utils/` — `booking.controller.js` is already large.

\- \*\*Don't\*\* add a third `/api/barbers` mount (already duplicated in `server.js`).

\- \*\*Don't\*\* assume `routes/payos.route.js` is active — mount in `server.js` if adding PayOS webhooks.

\- \*\*Don't\*\* edit `node\_modules/` or refactor unrelated domains.



\## Examples



```javascript

// routes/foo.route.js

router.get('/mine', authenticate, fooController.getMine);



// controllers/foo.controller.js

exports.getMine = async (req, res) => {

&#x20; const items = await Foo.find({ userId: req.userId });

&#x20; res.json(items);

};

```



```javascript

// GOOD

const { validateFoo } = require('../utils/fooValidation');

// BAD: copy large booking validation blocks into another controller

```



\## API prefixes (`server.js`)



`/api/auth` · `/api/users` · `/api/barbers` · `/api/services` · `/api/bookings` · `/api/barber-schedule` · `/api/barber-absences` · `/api/no-shows` · `/api/products` · `/api/categories` · `/api/brands` · `/api/carts` · `/api/orders` · `/api/payments` · `/api/addresses` · `/api/vouchers` · `/api/user-vouchers` · `/api/discounts` · `/api/product-reviews` · `/api/feedback-barber` · `/api/feedback-booking` · `/api/feedback-bookings` · `/api/feedback-orders` · `/api/booking-feedback` · `/api/chat` · `/api/chatbot` · `/api/news` · `/api/contact` · `/api/statistics` · `/api/upload` · `/api/test`



