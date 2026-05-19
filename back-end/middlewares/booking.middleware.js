exports.applyBookingFilter = (req, res, next) => {
  req.bookingFilter = req.bookingFilter || {};
  next();
};
