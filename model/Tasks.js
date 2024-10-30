let ids = 0;
let tasks = [];

module.exports = {
  new(name, prior) {
    let task = { id: ++ids, name: name, prior: prior };
    tasks.push(task);
    tasks.forEach(task => {
      if (task.prior === "alta") {
        task.priorColor = "red";
      } else if (task.prior === "media") {
        task.priorColor = "yellow";
      } else if (task.prior === "baixa") {
        task.priorColor = "green";
      }
    });

    return task;
  },
  update(id, name) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      tasks[pos].name = name;
    }
  },
  list() {
    return tasks;
  },
  listOrder() {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
    return tasks;
  },
  getTotal() {
    return tasks.length;
  },
  getElementById(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      return tasks[pos];
    }
    return null;
  },
  getPositionById(id) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  delete(id) {
    let i = this.getPositionById(id);
    if (i >= 0) {
      tasks.splice(i, 1);
      return true;
    }
    return false;
  },
};
