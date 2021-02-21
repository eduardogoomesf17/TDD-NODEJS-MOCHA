const Loki = require('lokijs');

class TodoRepository {
  constructor() {
    const db = new Loki('todo', {});
    this.schedule = db.addCollection('schedule');
  }

  list() {
    return this.schedule.find();
  }

  create(data) {
    return this.schedule.insertOne(data);
  }
}

module.exports = TodoRepository;

// const c = new TodoRepository();

// c.create({ name: 'eduardo', age: 20 });
// c.create({ name: 'GOmes', age: 50 });

// console.log('list', c.list())