export const OVERVIEW = {
  body: JSON.stringify({
    status: {
      progress: 30,
      status: "Okay"
    },
    daily: [
      {
        title: "Temperature",
        finish: false,
        id: 1
      },
      {
        title: "Humidity",
        finish: true,
        id: 2
      },
      {
        title: "Air Quality",
        finish: true,
        id: 3
      }
    ],
    todos: [
      {
        title: "Check temperature for Barn 1",
        finish: false,
        id: 1
      },
      {
        title: "Check temperature for Barn 2",
        finish: false,
        id: 2
      }
    ]
  }),
  init: {
    status: 200
  }
};
