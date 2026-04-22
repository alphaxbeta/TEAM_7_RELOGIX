const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Member = require("../models/Member");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  cb(null, ext && mime);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// POST /api/members — add new member
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, rollNumber, year, degree, email, role, project, hobbies, certificate, internship, aboutAim } = req.body;

    if (!name || !rollNumber || !year || !degree || !email || !role) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const hobbiesArr = hobbies
      ? hobbies.split(",").map((h) => h.trim()).filter(Boolean)
      : [];

    const member = new Member({
      name,
      rollNumber,
      year,
      degree,
      email,
      role,
      project: project || "",
      hobbies: hobbiesArr,
      certificate: certificate || "",
      internship: internship || "",
      aboutAim: aboutAim || "",
      image: req.file ? `uploads/${req.file.filename}` : "",
    });

    await member.save();
    res.status(201).json({ message: "Member added successfully!", member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/members — get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/members/:id — get single member
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
