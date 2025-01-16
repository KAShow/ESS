import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: false
  },
  services: {
    type: Map,
    of: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: false
      },
      notes: {
        type: String,
        required: false
      }
    },
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Survey = mongoose.model('Survey', surveySchema);
