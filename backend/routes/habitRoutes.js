const express = require('express');
const router = express.Router();
const { getHabits, createHabit, deleteHabit, markHabit } = require('../controllers/habitController');

router.get('/', getHabits);
router.post('/', createHabit);
router.delete('/:id', deleteHabit);
router.put('/mark/:id', markHabit);

module.exports = router;
