const { db, Task, User } = require('./db');

const users = [
  {
    name: 'Russell',
    email: 'r@r.com',
    password: '123',
  },
  {
    name: 'Eliot',
    email: 'e@e.com',
    password: '123',
  },
  {
    name: 'Mark',
    email: 'm@m.com',
    password: '123',
  },
];

const russTasks = [
  {
    name: 'Make E2E content',
    description:
      'Make a small little app that has authentication and some other stuff so you can effectively demo Cypress.io',
  },
  {
    name: 'Make India Pic Album',
    description: 'Make a picture album for Mom',
  },
  { name: 'Water Plants', description: 'Make sure your succulents do not die' },
];

const markTasks = [
  {
    name: 'Make students tremble in fear',
    description: 'Algos Algos Algos Algos Algos Algos Algos Algos',
  },
  {
    name: 'Make some beatz',
    description:
      'Bleep blop bloop Bleep blop bloop Bleep blop bloop Bleep blop bloop',
  },
];

async function seed() {
  await db.sync({ force: true });
  const createdUsers = await Promise.all(users.map(u => User.create(u)));
  console.log('users seeded');
  const rTasks = await Promise.all(
    russTasks.map(t => Task.create({ ...t, userId: createdUsers[0].id }))
  );

  const mTasks = await Promise.all(
    markTasks.map(t => Task.create({ ...t, userId: createdUsers[2].id }))
  );
  console.log('finished!');
}

seed();
