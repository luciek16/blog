import { dbConfig } from "../../config/dbconfig";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
});

async function connectToDatabase() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

connectToDatabase();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
	console.log("Synchronized");
});
