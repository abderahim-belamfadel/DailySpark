import React, { useState } from 'react';
import './App.css';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

function App() {
  const [habits, setHabits] = useState([]);

  const addHabit = (name) => {
    const newHabit = {
      _id: Date.now(), // temporary ID (you will replace later if using MongoDB)
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
    <div className="App">
      <header className="App-header">
        <h1>DailySpark 🔥</h1>
        <HabitForm addHabit={addHabit} />
        <HabitList habits={habits} markComplete={markComplete} deleteHabit={deleteHabit} />
      </header>
    </div>
  );
}

export default App;

