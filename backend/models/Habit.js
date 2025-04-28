const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  frequency: { type: String, enum: ['Daily', 'Weekly'], default: 'Daily' },
  completedDates: [{ type: Date }],
}, { timestamps: true });

module.exports = mongoose.model('Habit', HabitSchema);
