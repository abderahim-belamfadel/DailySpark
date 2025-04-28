import React, { useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

const HomePage = () => {
  const [habits, setHabits] = useState([]);

  const addHabit = (name) => {
    const newHabit = {
      _id: Date.now(),
      name,
      completed: false,
    };
    setHabits([...habits, newHabit]);
  };

  const markComplete = (id) => {
    setHabits(
      habits.map((habit) =>
        habit._id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit._id !== id));
  };

  return (
    <div className="home-page">
      <h1>DailySpark 🔥</h1>
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} markComplete={markComplete} deleteHabit={deleteHabit} />
    </div>
  );
};

export default HomePage;
