import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    votes: {
        type: [String],
      },
    text: {
        type: String,
      },
  });

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
    },
    timestamp: {
      type: Number,
    },
    questionText: {
      type: String,
    },
    optionOne: optionSchema,
    optionTwo: optionSchema,
  },
  { timestamps: true },
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
