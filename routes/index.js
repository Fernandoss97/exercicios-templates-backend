var express = require("express");
var Task = require("../model/Tasks");
var TaskSchema = require("../validators/TaskValidator");
const session = require("express-session");
const Joi = require("joi");
var router = express.Router();
var app = require("../app.js");

router.get("/", function (req, res, next) {
  res.render("index", { task: req.session.task });
});

router.post("/tarefas", function (req, res) {
  const { name, priority } = req.body;

  const task = {
    nome: name,
    prioridade: priority,
  };

  req.session.task = task;

  res.redirect("/");
});

router.get("/tarefas/del/:id", function (req, res) {
  const { id } = req.params;
  const { error, value } = Joi.number().integer().greater(0).validate(id);

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect(req.get("referer"));
});

router.get("/tarefas/total", (req, res) => {
  res.render("tasks-quantity", { total: Task.getTotal() });
});

router.get("/tarefas-ordenadas", (req, res) => {
  res.render("ordered-tasks", { tasks: Task.listOrder() });
});

module.exports = router;
