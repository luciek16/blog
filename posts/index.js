const express = require("express");
// for generating random ID for each post
const { randomBytes } = require("crypto");
//enables making requests between different servers (3000 to 4000)
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
	return res.send(posts);
});

app.post("/posts", async (req, res) => {
	//generates 4 bytes of random data
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;
	posts[id] = {
		id,
		title,
	};
	try {
		await axios.post("http://localhost:4005/events", {
			type: "PostCreated",
			data: {
				id,
				title,
			},
		});
		return res.status(200).send(posts[id]);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: "Internal server error" });
	}
});

app.post("/events", (req, res) => {
	console.log("Event received", req.body.type);

	return res.send({});
});

app.listen(4000, () => {
	console.log("Listening on port 4000");
});
