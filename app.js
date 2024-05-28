const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
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

console.log(`Node Env: ${process.env.NODE_ENV}`);
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Host: ${config.get("mail.host")}`);
// console.log(`Mail Key: ${config.get("mail.key")}`);

app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  startupDebugger(`Listening on port ${PORT}...`);
});
