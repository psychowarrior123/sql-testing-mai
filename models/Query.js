const Query = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const query = sequelize.define("Query", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    query: STRING,
    text: STRING,
    difficulty: STRING,
  });
  return query;
};

module.exports = Query;
