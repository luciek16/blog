const { DataTypes, Model } = require("sequelize");
import sequelize from "../sequelize";

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.UUID,
			//sequelize henerates UUIDs automatically using DataTypes.UUIDV4 or DataTypes.UUIDV1 as a default value
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		sequelize, // We need to pass the connection instance
		modelName: "Post", // We need to choose the model name
	}
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

async function syncUser() {
	try {
		await User.sync();
		console.log("The table for the User model was just (re)created!");
	} catch (err) {
		console.log(err);
	}
}

syncUser();
