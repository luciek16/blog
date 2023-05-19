const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
// provide full listing of posts + comments
app.get("/posts", (req, res) => {
	res.send(posts);
});

// receiving events from the event bus
app.post("/events", (req, res) => {
	const { type, data } = req.body;

	if (type === "PostCreated") {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	if (type === "CommentCreated") {
		const { id, content, postId } = data;

		const post = posts[postId];
		post.comments.push({ id, content });
	}
	console.log(posts);
	res.send({});
});

app.listen(4002, () => {
	console.log("Listening on port 4002");
});
