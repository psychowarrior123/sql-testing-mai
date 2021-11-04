const Mark = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const mark = sequelize.define("Mark", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    fullname: STRING,
    mark: STRING,
  });
  return mark;
};

module.exports = Mark;
