const { Router } = require("express");
const db = require("../models");
const Sequelize = require("sequelize");
const { pool } = require("../data/config");
const { isEqual } = require("underscore");

const types = ["queries", "groups", "functions", "manipulates", "subqueries"];

const router = Router();

// generate test
router.get(
  "/generate",

  async (req, res) => {
    try {
      const result = {};
      types.forEach(async (type, index, self) => {
        const Task = db[type];
        const easy = await Task.findOne({
          where: { difficulty: "easy" },
          order: [[Sequelize.literal("RAND()")]],
        });
        const medium = await Task.findOne({
          where: { difficulty: "medium" },
          order: [[Sequelize.literal("RAND()")]],
        });
        const hard = await Task.findOne({
          where: { difficulty: "hard" },
          order: [[Sequelize.literal("RAND()")]],
        });
        result[type] = { easy, medium, hard };

        if (index === self.length - 1) {
          res.json(result);
        }
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.post("/check", async (req, res) => {
  try {
    const { answer, check, isManipulate } = req.body;
    const data = {};
    if (isManipulate) {
      pool.query(answer, (error, result) => {
        if (error) {
          res.json({ isEqual: false });
        } else {
          if (Array.isArray(result)) {
            res.json({ isEqual: false });
          } else {
            res.json({ isEqual: true });
          }
        }
      });
    } else {
      pool.query(check, (error, result) => {
        if (error) throw error;

        data.check = result;
      });
      pool.query(answer, (error, result) => {
        if (error) {
          console.log(data.check, result, answer);
          res.json({ isEqual: false });
        } else {
          console.log(data.check, result, answer);
          res.json({
            isEqual: isEqual(data.check, result),
          });
        }
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
