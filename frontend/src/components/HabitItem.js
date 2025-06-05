// HabitItem.js
import React from 'react';

const HabitItem = ({ habit, markComplete, deleteHabit }) => {
  const completed = habit.completedDates && habit.completedDates.length > 0;
  return (
    <div className="habit-item">
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {habit.name}
      </span>
      <button onClick={() => markComplete(habit._id)}>Complete</button>
      <button onClick={() => deleteHabit(habit._id)}>Delete</button>
    </div>
  );
};

export default HabitItem;
