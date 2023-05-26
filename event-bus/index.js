const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
	//we don't know what is coming in the req body but we are going to send it to all of our services
	const event = req.body;

	axios.post("http://localhost:4000/events", event).catch((err) => {
		console.log(err);
	});
	axios.post("http://localhost:4001/events", event).catch((err) => {
		console.log(err);
	});
	axios.post("http://localhost:4002/events", event).catch((err) => {
		console.log(err);
	});
	axios.post("http://localhost:4003/events", event).catch((err) => {
		console.log(err);
	});

	return res.send({ status: "OK" });
});

app.listen(4005, () => {
	console.log("Listening on 4005");
});
