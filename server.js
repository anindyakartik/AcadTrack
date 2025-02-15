require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ======================== Middleware ========================
app.use(express.json());
app.use(cors());

// ======================== Connect to MongoDB ========================


mongoose.connect("mongodb://127.0.0.1:27017/acadtrack", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// ======================== User Schema & Routes ========================
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', UserSchema);

// 🔹 Register User
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================== Student Schema & Routes ========================
const StudentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    enrollment: String
});

const Student = mongoose.model('Student', StudentSchema);

// 🔹 Add Student
app.post('/students', async (req, res) => {
    const { name, email, enrollment } = req.body;
    try {
        let student = await Student.findOne({ email });
        if (student) return res.status(400).json({ message: "Student already exists" });

        student = new Student({ name, email, enrollment });
        await student.save();

        res.status(201).json({ message: "Student added successfully", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get All Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Delete Student
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================== Exam Schema & Routes ========================
const ExamSchema = new mongoose.Schema({
    examType: String,
    course: String,
    examDate: String,
    totalMarks: Number,
    marksObtained: Number
});

const Exam = mongoose.model('Exam', ExamSchema);

// 🔹 Add Exam
app.post('/exams', async (req, res) => {
    const { examType, course, examDate, totalMarks, marksObtained } = req.body;
    try {
        const exam = new Exam({ examType, course, examDate, totalMarks, marksObtained });
        await exam.save();
        res.status(201).json({ message: "Exam added successfully", exam });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get All Exams
app.get('/exams', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Delete Exam
app.delete('/exams/:id', async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.json({ message: "Exam deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================== Start Server ========================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
