const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/api/course", (req, res) => {
  res.json(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

// Sample API
app.get("/api/post/:year/:month", (req, res) => {
  // Params consists of url variables such as year, month, etc
  console.log(req.params);
  // Query consists of additional optional query params
  // eg ?sortBy=name&&search=App
  console.log(req.query);
  res.status(200).send("OK");
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.base": "Name should be of type string.",
      "string.min": "Name should be atleast 3 character long.",
      "any.required": "Name is required field.",
      "string.empty": "Name cannot be empty.",
    }),
  });
  return schema.validate(course);
};

app.post("/api/course", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).json(error);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  return res.status(200).send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).json(error);

  course.name = req.body.name;
  return res.status(200).send(course);
});

app.delete("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });

  const indexOfCourse = courses.indexOf(course);
  courses.splice(indexOfCourse, 1);
  return res.status(200).send(course);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
