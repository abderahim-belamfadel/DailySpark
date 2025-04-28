// HabitItem.js
import React from 'react';

const HabitItem = ({ habit, markComplete, deleteHabit }) => {
  return (
    <div className="habit-item">
      <span style={{ textDecoration: habit.completed ? 'line-through' : 'none' }}>
        {habit.name}
      </span>
      <button onClick={() => markComplete(habit._id)}>Complete</button>
      <button onClick={() => deleteHabit(habit._id)}>Delete</button>
    </div>
  );
};

export default HabitItem;
