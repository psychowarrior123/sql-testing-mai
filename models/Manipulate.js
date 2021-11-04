const Manipulate = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const manipulate = sequelize.define("Manipulate", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    query: STRING,
    text: STRING,
    difficulty: STRING,
  });
  return manipulate;
};

module.exports = Manipulate;
