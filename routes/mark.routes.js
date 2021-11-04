const { Router } = require("express");
const db = require("../models");
const Mark = db.marks;
const User = db.users;

const router = Router();

// post test results /api/marks
router.post("/", async (req, res) => {
  try {
    await Mark.create(req.body);
    res.status(201).json({ message: "Тест завершен!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

//get tests result by fullname /api/marks/:fullname
router.get("/student/:fullname", async (req, res) => {
  try {
    const { fullname } = req.params;
    const marks = await Mark.findAll({ where: { fullname } });
    res.json(marks);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/teacher/:study_group", async (req, res) => {
  try {
    const { study_group } = req.params;
    const user = await User.findAll({
      attributes: ["fullname"],
      where: { study_group, role: "student" },
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
