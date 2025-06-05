import React, { useEffect, useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import {
  getHabits,
  createHabit,
  deleteHabit as deleteHabitService,
  markHabit,
} from '../services/habitService';
import '../HomePage.css';

const HomePage = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const { data } = await getHabits();
        setHabits(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadHabits();
  }, []);

  const addHabit = async (name) => {
    try {
      const { data } = await createHabit({ name, frequency: 'Daily' });
      setHabits([...habits, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = async (id) => {
    try {
      const { data } = await markHabit(id);
      setHabits(habits.map((h) => (h._id === id ? data : h)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await deleteHabitService(id);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.error(err);
    }
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
