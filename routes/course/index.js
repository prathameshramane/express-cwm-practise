const express = require("express");
const { validateCourse } = require("./utility");

const router = express.Router();

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

router.get("/", (req, res) => {
  res.json(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).json(error);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  return res.status(200).send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).json(error);

  course.name = req.body.name;
  return res.status(200).send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).json({ error: "Course not found" });

  const indexOfCourse = courses.indexOf(course);
  courses.splice(indexOfCourse, 1);
  return res.status(200).send(course);
});

module.exports = router;
