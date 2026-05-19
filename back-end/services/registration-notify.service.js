/**
 * When Kafka/email is wired, publish here (see coding-rules: user.registered).
 * For local testing, OTP is printed to the server console unless disabled.
 */
exports.notifyRegistrationOtp = (email, plainOtp) => {
  const disabled =
    process.env.LOG_OTP_TO_CONSOLE === '0' || process.env.LOG_OTP_TO_CONSOLE === 'false';
  if (disabled) {
    return;
  }
  console.log(`\n========== Registration OTP ==========\n  Email: ${email}\n  Code:  ${plainOtp}\n========================================\n`);
};
