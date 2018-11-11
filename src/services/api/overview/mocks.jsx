export const OVERVIEW = {
  body: JSON.stringify({
    status: {
      progress: 40,
      status: "Okay"
    },
    daily: [
      {
        title: 'Sign contract for "What are conference organizers afraid of?"',
        finish: true,
        id: 1
      },
      {
        title: "Lines From Great Russian Literature? Or E-mails From My Boss?",
        finish: false,
        id: 2
      }
    ],
    todos: [
      {
        title: 'Sign contract for "What are conference organizers afraid of?"',
        finish: true,
        id: 1
      },
      {
        title: "Lines From Great Russian Literature? Or E-mails From My Boss?",
        finish: false,
        id: 2
      },
      {
        title:
          "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        finish: false,
        id: 3
      },
      {
        title: "Create 4 Invisible User Experiences you Never Knew About",
        finish: true,
        id: 4
      }
    ]
  }),
  init: {
    status: 200
  }
};
