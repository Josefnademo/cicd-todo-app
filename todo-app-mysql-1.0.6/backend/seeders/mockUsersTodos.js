module.exports = {
  users: [
    {
      email: "test_user@example.com",
      password: "Test@1234",
      name: "Test User",
      address: "123 Rue de Lausanne",
      zip: 1000,
      location: "Lausanne"
    },
    {
      email: "admin@example.com",
      password: "Admin@1234",
      name: "Admin User",
      address: "1 Avenue du Mont",
      zip: 1010,
      location: "Lausanne"
    },
    {
      email: "guest@example.com",
      password: "Guest@1234",
      name: "Guest User",
      address: "",
      zip: null,
      location: ""
    }
  ],

  todos: [
    // Todos courts
    {
      text: "Acheter pain",
      date: "2025-12-01",
      completed: false,
      userEmail: "test_user@example.com"
    },
    // Todos longs
    {
      text: "Préparer le projet ETML avec toutes les sections : tests unitaires, E2E, CI/CD et documentation complète.",
      date: "2025-12-02",
      completed: false,
      userEmail: "test_user@example.com"
    },
    // Todo formaté HTML
    {
      text: "<b>Important :</b> finir le rapport PDF avant lundi.",
      date: "2025-12-03",
      completed: false,
      userEmail: "admin@example.com"
    },
    // Todo formaté Markdown
    {
      text: "**Priorité haute** : Corriger les bugs de la barre de recherche",
      date: "2025-12-04",
      completed: false,
      userEmail: "admin@example.com"
    },
    // Todos passés, présents, futurs
    {
      text: "Revoir le chapitre 4.2.4",
      date: "2025-11-30", // passé
      completed: true,
      userEmail: "guest@example.com"
    },
    {
      text: "Tester la barre de recherche",
      date: "2025-12-01", // présent
      completed: false,
      userEmail: "guest@example.com"
    },
    {
      text: "Planifier réunion projet",
      date: "2025-12-10", // futur
      completed: false,
      userEmail: "guest@example.com"
    }
  ]
};
