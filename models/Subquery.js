const Subquery = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const subquery = sequelize.define("Subquery", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    query: STRING,
    text: STRING,
    difficulty: STRING,
  });
  return subquery;
};

module.exports = Subquery;
