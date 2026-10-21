const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const router = express.Router();

router.param('id', (req, res, next, id) => {
  if (!/^[a-f\d]{24}$/i.test(id)) return res.status(400).json({ message: 'Invalid student ID. Open a student from the list.' });
  next();
});

// Accept only editable fields, never client-supplied IDs or timestamps.
function studentFields(req, res, next) {
  const { name, email, phone } = req.body || {};
  if (typeof name !== 'string' || typeof email !== 'string' || !['string', 'number'].includes(typeof phone)) {
    return res.status(400).json({ message: 'Name, email, and phone are required.' });
  }
  if (!/^\d{7,15}$/.test(String(phone))) {
    return res.status(400).json({ message: 'Phone must contain 7 to 15 digits only.' });
  }
  req.studentFields = { name, email, phone };
  next();
}

router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database is temporarily unavailable. Please try again shortly.' });
  next();
});

router.get('/', async (req, res, next) => {
  try { res.json(await Student.find().sort({ createdAt: -1 })); }
  catch (error) { next(error); }
});

router.post('/create-student', studentFields, async (req, res, next) => {
  try { res.status(201).json(await Student.create(req.studentFields)); }
  catch (error) { next(error); }
});

router.get('/edit-student/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (error) { next(error); }
});

router.put('/update-student/:id', studentFields, async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { $set: req.studentFields }, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (error) { next(error); }
});

router.delete('/delete-student/:id', async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deleted successfully.', id: req.params.id });
  } catch (error) { next(error); }
});

module.exports = router;
