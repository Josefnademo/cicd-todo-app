const { User, Todo, sequelize } = require('./models'); // tes modèles Sequelize
const bcrypt = require('bcrypt');

const mockData = {
  users: [
    { email: "test_user@example.com", password: "Test@1234", name: "Test User", address: "123 Rue de Lausanne", zip: 1000, location: "Lausanne" },
    { email: "admin@example.com", password: "Admin@1234", name: "Admin User", address: "1 Avenue du Mont", zip: 1010, location: "Lausanne" },
    { email: "guest@example.com", password: "Guest@1234", name: "Guest User", address: "", zip: null, location: "" }
  ],
  todos: [
    { text: "Acheter pain", date: "2025-12-01", completed: false, userEmail: "test_user@example.com" },
    { text: "Préparer le projet ETML avec toutes les sections : tests unitaires, E2E, CI/CD et documentation complète.", date: "2025-12-02", completed: false, userEmail: "test_user@example.com" },
    { text: "<b>Important :</b> finir le rapport PDF avant lundi.", date: "2025-12-03", completed: false, userEmail: "admin@example.com" },
    { text: "**Priorité haute** : Corriger les bugs de la barre de recherche", date: "2025-12-04", completed: false, userEmail: "admin@example.com" },
    { text: "Revoir le chapitre 4.2.4", date: "2025-11-30", completed: true, userEmail: "guest@example.com" },
    { text: "Tester la barre de recherche", date: "2025-12-01", completed: false, userEmail: "guest@example.com" },
    { text: "Planifier réunion projet", date: "2025-12-10", completed: false, userEmail: "guest@example.com" }
  ]
};

async function seed() {
  try {
    await sequelize.sync({ force: true }); // recrée les tables

    // Créer les utilisateurs
    const userMap = {};
    for (const u of mockData.users) {
      const hashed = await bcrypt.hash(u.password, 10);
      const user = await User.create({ ...u, password: hashed });
      userMap[u.email] = user.id;
    }

    // Créer les todos
    for (const t of mockData.todos) {
      await Todo.create({ 
        text: t.text, 
        date: t.date, 
        completed: t.completed, 
        user_id: userMap[t.userEmail] 
      });
    }

    console.log('✅ DB seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
