import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    answers: {
      type: Map,
      of: String,
    },
    questions: {
      type: [String],
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
