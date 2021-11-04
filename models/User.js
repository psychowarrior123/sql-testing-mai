const User = (sequelize, Sequelize) => {
  const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize;
  const user = sequelize.define("User", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    fullname: STRING,
    role: STRING,
    study_group: STRING,
    phone_number: STRING,
    email: { type: STRING, primaryKey: true, allowNull: false },
    password: { type: STRING, primaryKey: true, allowNull: false },
  });
  return user;
};

module.exports = User;

/*const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'users';
	}

	static get id() {
		return 'id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['email', 'password'],

			properties: {
				id: {type: 'integer'},
				fullname: {type: 'string', minLength: 1, maxLength: 255},
				email: {type: 'string', minLength: 1, maxLength: 255},
				password: {type: 'string', minLength: 8, maxLength: 255},
				phone_number: {type: 'string', minLength: 10, maxLength: 255},
				role: {type: 'string', minLength: 1, maxLength: 255},
				group: {type: 'string', minLength: 1, maxLength: 255},

				// Properties defined as objects or arrays are
				// automatically converted to JSON strings when
				// writing to database and back to objects and arrays
				// when reading from database. To override this
				// behaviour, you can override the
				// Model.jsonAttributes property.
			}
		};
	}
}*/
