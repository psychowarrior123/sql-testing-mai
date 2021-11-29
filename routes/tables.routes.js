const { Router } = require("express");
const { pool } = require("../data/config");
const query = require("../data/script.json");

const router = Router();

// get all tables /api/tables/
router.get("/", async (req, res) => {
  try {
    pool.query(
      "select * from information_schema.columns where table_schema = 'heroku_9720cba118023c5'",
      (error, results) => {
        if (error) throw error;

        res.json(results);
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

// get table by name /api/tables/:name/
router.get("/:name", async (req, res) => {
  try {
    pool.query(`select * from ${req.params.name}`, (error, results) => {
      if (error) throw error;

      res.json(results);
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

// refresh tables /api/tables/refresh/
router.post("/refresh", async (req, res) => {
  try {
    await pool.query(query.drop);
    query.create.split("; ").forEach(async (item) => {
      await pool.query(item);
    });

    res.status(201).json({ message: "Таблицы обновлены" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
