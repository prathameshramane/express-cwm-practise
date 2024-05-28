const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");
const app = express();

const courseRouter = require("./routes/course");
const postRouter = require("./routes/posts");

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Custom Middleware
app.use(logger());
app.use(authentication());
// Third-party middleware
app.use(helmet());
app.use(morgan("tiny"));

app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
