require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const http = require("http");

const connectDB = require("./config/db.config");
const initSocket = require("./services/socket.service");
const { startKafkaConsumer } = require("./services/kafka-consumer.service");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Barbershop API" });
});

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/barbers", require("./routes/barber.route"));
app.use("/api/services", require("./routes/service.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/barber-schedule", require("./routes/barber-schedule.route"));
app.use("/api/barber-absences", require("./routes/barber-absence.route"));
app.use("/api/no-shows", require("./routes/no-show.route"));
app.use("/api/products", require("./routes/product.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/brands", require("./routes/brand.route"));
app.use("/api/carts", require("./routes/cart.route"));
app.use("/api/orders", require("./routes/order.route"));
app.use("/api/payments", require("./routes/payment.route"));
app.use("/api/addresses", require("./routes/address.route"));
app.use("/api/vouchers", require("./routes/voucher.route"));
app.use("/api/user-vouchers", require("./routes/user-voucher.route"));
app.use("/api/discounts", require("./routes/discount.route"));
app.use("/api/product-reviews", require("./routes/product-review.route"));
app.use("/api/feedback-barber", require("./routes/feedback-barber.route"));
app.use("/api/feedback-booking", require("./routes/feedback-booking.route"));
app.use("/api/feedback-bookings", require("./routes/feedback-bookings.route"));
app.use("/api/feedback-orders", require("./routes/feedback-order.route"));
app.use("/api/booking-feedback", require("./routes/booking-feedback.route"));
app.use("/api/chat", require("./routes/chat.route"));
app.use("/api/chatbot", require("./routes/chatbot.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/contact", require("./routes/contact.route"));
app.use("/api/statistics", require("./routes/statistics.route"));
app.use("/api/upload", require("./routes/upload.route"));
app.use("/api/test", require("./routes/test.route"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  initSocket(server);
  await startKafkaConsumer();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
