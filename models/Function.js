const Function = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const sqlFunction = sequelize.define("Function", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    query: STRING,
    text: STRING,
    difficulty: STRING,
  });
  return sqlFunction;
};

module.exports = Function;
