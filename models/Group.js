const Group = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const group = sequelize.define("Group", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    query: STRING,
    text: STRING,
    difficulty: STRING,
  });
  return group;
};

module.exports = Group;
