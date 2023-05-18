const express = require("express");
// for generating random ID for each post
const { randomBytes } = require("crypto");
const app = express();
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", (req, res) => {
	//generates 4 bytes of random data
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;
	posts[id] = {
		id,
		title,
	};
	return res.status(200).send(posts[id]);
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
