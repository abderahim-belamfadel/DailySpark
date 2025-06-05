// HabitList.js
import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, markComplete, deleteHabit }) => {
  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <p>No habits yet. Start by adding one!</p>
      ) : (
        habits.map((habit) => (
          <HabitItem
            key={habit._id}
            habit={habit}
            markComplete={markComplete}
            deleteHabit={deleteHabit}
          />
        ))
      )}
    </div>
  );
};

export default HabitList;
