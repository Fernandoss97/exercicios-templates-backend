var express = require("express");
var Task = require("../model/Tasks");
var TaskSchema = require("../validators/TaskValidator");
const Joi = require("joi");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1", "baixa");
    Task.new("Tarefa 2", "baixa");
  }

  let obj = Task.getElementById(req.query.tid);
  res.render("index", { tasks: Task.list(), task: obj });
});

router.post("/tarefas", function (req, res) {
  const { error, value } = TaskSchema.validate(req.body);

  // if (error) {
  //   res.render("index", { tasks: Task.list(), erro: "Dados incompletos" });
  //   return;
  // }

  const { id, nome, prior } = value;

  if (id === undefined) {
    //Inserir
    Task.new(nome, prior);
  } else {
    //Alterar
    Task.update(id, nome);
  }

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
