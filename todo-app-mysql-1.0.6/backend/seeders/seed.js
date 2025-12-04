const { Sequelize } = require('sequelize');
const { initModels } = require('../models');
const bcrypt = require('bcrypt');

// Mock data to populate the database
const mockData = {
  users: [
    {
      email: 'test_user@example.com',
      password: 'Test@1234',
      name: 'Test User',
      address: '123 Rue de Lausanne',
      zip: 1000,
      location: 'Lausanne'
    },
    {
      email: 'admin@example.com',
      password: 'Admin@1234',
      name: 'Admin User',
      address: '1 Avenue du Mont',
      zip: 1010,
      location: 'Lausanne'
    },
    {
      email: 'guest@example.com',
      password: 'Guest@1234',
      name: 'Guest User',
      address: '',
      zip: null,
      location: ''
    }
  ],
  todos: [
    // Short todos
    {
      text: 'Acheter pain',
      date: '2025-12-01',
      completed: false,
      userEmail: 'test_user@example.com'
    },
    // Long text todo
    {
      text: 'Préparer le projet ETML avec toutes les sections : tests unitaires, E2E, CI/CD et documentation complète.',
      date: '2025-12-02',
      completed: false,
      userEmail: 'test_user@example.com'
    },
    // HTML-formatted todo
    {
      text: '<b>Important :</b> finir le rapport PDF avant lundi.',
      date: '2025-12-03',
      completed: false,
      userEmail: 'admin@example.com'
    },
    // Markdown-formatted todo
    {
      text: '**Priorité haute** : Corriger les bugs de la barre de recherche',
      date: '2025-12-04',
      completed: false,
      userEmail: 'admin@example.com'
    },
    // Past, present, future todos
    {
      text: 'Revoir le chapitre 4.2.4',
      date: '2025-11-30', // past
      completed: true,
      userEmail: 'guest@example.com'
    },
    {
      text: 'Tester la barre de recherche',
      date: '2025-12-01', // present
      completed: false,
      userEmail: 'guest@example.com'
    },
    {
      text: 'Planifier réunion projet',
      date: '2025-12-10', // future
      completed: false,
      userEmail: 'guest@example.com'
    }
  ]
};

async function seed() {
  let sequelize;
  let User, Todo;

  try {
    // 1. Create a Sequelize instance here specifically for production seeding
    // Uses the MySQL credentials defined in your docker-compose
    sequelize = new Sequelize('db_todoapp', 'app_user', 'app_password', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false
    });

    // Connect to the database
    await sequelize.authenticate();
    console.log('Connection to DB established successfully.');

    // 2. Initialize the models using the new Sequelize instance
    const models = initModels(sequelize);
    User = models.User;
    Todo = models.Todo;

    // 3. Synchronize the schema (force: true drops and recreates all tables)
    await sequelize.sync({ force: true });
    console.log('Database synchronized (force: true).');

    // 4. Create users, storing their ID by email for mapping
    const userMap = {};
    for (const u of mockData.users) {
      const hashed = await bcrypt.hash(u.password, 10);
      const user = await User.create({ ...u, password: hashed });
      userMap[u.email] = user.id;
    }

    // 5. Create todos and link them to users via user_id
    for (const t of mockData.todos) {
      await Todo.create({
        text: t.text,
        date: t.date,
        completed: t.completed,
        user_id: userMap[t.userEmail]
      });
    }

    console.log('✅ DB seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    // 6. Always close the DB connection at the end
    if (sequelize) {
      await sequelize.close();
    }
    process.exit(0);
  }
}

seed();
