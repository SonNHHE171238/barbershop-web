require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const User = require('../models/user.model');

async function main() {
  const [, , email, password, name, roleArg] = process.argv;
  if (!email || !password || !name) {
    console.error(
      'Usage: node scripts/create-user.js <email> <password> "<name>" [customer|barber|admin]'
    );
    process.exit(1);
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI must be set in .env');
    process.exit(1);
  }

  const role = ['customer', 'barber', 'admin'].includes(roleArg) ? roleArg : 'customer';

  await mongoose.connect(uri);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.error('User with this email already exists');
    process.exit(1);
  }

  const user = new User({
    email: email.toLowerCase(),
    password,
    name,
    phone: '',
    role,
    status: 'active',
    isVerified: true,
  });

  await user.save();
  console.log('Created user:', user.email, 'role:', user.role);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
