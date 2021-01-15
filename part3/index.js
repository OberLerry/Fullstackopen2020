require("dotenv").config();
const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();
app.use(cors());
app.use(express.static("build"));
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req, res) => req.type != "POST",
    }
  )
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const d = new Date();
  Person.find({}).then((persons) => {
    response.send(
      `Phonebook has info for ${
        persons.length
      } people <br/><br/> ${d.toTimeString()}`
    );
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((res) => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const person = request.body;
  if (person.name && person.number) {
    const newPerson = new Person({
      name: person.name,
      number: person.number,
    });
    newPerson
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  } else {
    response.status(400).json({
      error: "Content is missing",
    });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const number = request.body.number;
  Person.findByIdAndUpdate(
    request.params.id,
    { number: number },
    { new: true, runValidators: true }
  )
    .then((updatedNumber) => response.json(updatedNumber))
    .catch((error) => next(error));
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || process.env.PORT;
app.listen(PORT);
