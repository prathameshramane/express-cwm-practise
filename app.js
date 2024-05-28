const express = require("express");
const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");
const app = express();

const courseRouter = require("./routes/course");
const postRouter = require("./routes/posts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger());
app.use(authentication());

app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
