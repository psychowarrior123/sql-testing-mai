const { Router } = require("express");
const db = require("../models");

const router = Router();

// create tasks /api/tasks/:type
router.post(
  "/:type",

  async (req, res) => {
    try {
      const { type } = req.params;
      const Task = db[type];
      await Task.create(req.body);
      res.status(201).json({ message: "Задание успешно добавлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// update tasks /api/tasks/:type/:id
router.patch(
  "/:type/:id",

  async (req, res) => {
    try {
      const { type, id } = req.params;
      const Task = db[type];
      const task = await Task.findByPk(Number(id));
      task.set(req.body);
      await task.save();
      res.status(201).json({ message: "Задание успешно обновлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.delete(
  "/:type/:id",

  async (req, res) => {
    try {
      const { type, id } = req.params;
      const Task = db[type];
      const task = await Task.findByPk(Number(id));
      await task.destroy();
      res.status(201).json({ message: "Задание успешно удалено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// get all tasks /api/tasks/:types
router.get(
  "/:types",

  async (req, res) => {
    try {
      const { types } = req.params;
      const allTasks = [];
      types.split(",").forEach(async (type, index, self) => {
        const Task = db[type];
        const tasks = await Task.findAll();
        if (!tasks) {
          return res
            .status(400)
            .json({ message: `Задания отсутствуют в типе ${type}` });
        }
        allTasks.push({ [type]: tasks });

        if (index === self.length - 1) {
          res.json(allTasks);
        }
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// get all tasks by type /api/tasks/:type
router.get(
  "/:type",

  async (req, res) => {
    try {
      const { type } = req.params;
      const Task = db[type];
      console.log(Task, type);
      const tasks = await Task.findAll();
      if (!tasks) {
        return res
          .status(400)
          .json({ message: `Задания отсутствуют в типе ${type}` });
      }

      res.json(tasks);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// get task by id /api/tasks/:id
router.get("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const Task = db[type];
    const task = await Task.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      return res
        .status(400)
        .json({ message: `Задание с ID = ${id} отсутствует в типе ${type}` });
    }

    res.json({ task });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

// get task by id /api/tasks/:difficulty
router.get("/:type/:difficulty", async (req, res) => {
  try {
    const { type, difficulty } = req.params;
    const Task = db[type];
    const tasks = await Task.findAll({
      where: {
        difficulty,
      },
    });

    if (!tasks) {
      return res.status(400).json({
        message: `Задания со сложностью ${difficulty} отсутствуют в типе ${type}`,
      });
    }

    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
