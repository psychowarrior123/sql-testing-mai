const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const users = require("../controllers/user.controller");
const db = require("../models");
const User = db.users;

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { email, password, study_group } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({
        ...req.body,
        password: hashedPassword,
        study_group: study_group.toUpperCase(),
      });

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({
        token,
        userId: user.id,
        role: user.role,
        phone_number: user.phone_number,
        study_group: user.study_group,
        email: user.email,
        fullname: user.fullname,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
