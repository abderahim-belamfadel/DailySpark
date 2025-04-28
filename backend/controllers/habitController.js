const Habit = require('../models/Habit');

const getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

const createHabit = async (req, res) => {
  const { name, frequency } = req.body;
  const newHabit = new Habit({ name, frequency });
  await newHabit.save();
  res.json(newHabit);
};

const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit deleted' });
};

const markHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.completedDates.push(new Date());
  await habit.save();
  res.json(habit);
};

module.exports = { getHabits, createHabit, deleteHabit, markHabit };
