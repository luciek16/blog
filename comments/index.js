const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	return res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;

	//getting all the cooments associated with a certain ID
	const comments = commentsByPostId[req.params.id] || [];

	//adding the new comment to the list of comments
	comments.push({ id: commentId, content, status: "pending" });

	commentsByPostId[req.params.id] = comments;

	try {
		await axios.post("http://localhost:4005/events", {
			type: "CommentCreated",
			data: {
				id: commentId,
				content,
				postId: req.params.id,
				status: "pending",
			},
		});

		return res.status(201).send(comments);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: "Internal Server Error" });
	}
});

app.post("/events", async (req, res) => {
	console.log("Event received", req.body.type);

	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { postId, id, status, content } = data;
		const comments = commentsByPostId[postId];

		const comment = comments.find((comment) => comment.id === id);
		comment.status = status;

		await axios.post("http://localhost:4005/events", {
			type: "CommentUpdated",
			data: {
				id,
				status,
				postId,
				content,
			},
		});
	}

	return res.send({});
});

app.listen(4001, () => {
	console.log("Listening on port 4001");
});
