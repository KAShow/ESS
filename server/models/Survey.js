import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 3,
    required: false
  },
  notes: {
    type: String,
    required: false
  }
});

const surveySchema = new mongoose.Schema({
  services: {
    type: Map,
    of: serviceSchema,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Survey = mongoose.model('Survey', surveySchema);
