import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name filed are required !'],
    },
    email: {
      type: String,
      required: [true, 'Email filed are required !'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone filed are required !'],
    },
    password: {
      type: String,
      required: [true, 'Password filed are required !'],
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    failedAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({ name: 'text' });
userSchema.index({ email: 1 }, { unique: true });

const Users = mongoose.model('Users', userSchema);

export default Users;