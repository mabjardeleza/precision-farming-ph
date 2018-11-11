export const BARNS = {
  body: JSON.stringify({
    count: 3,
    previous: null,
    next: null,
    results: [
      {
        id: 1,
        pig_count: 23,
        aggregated_temperature: 27,
        aggregated_humidity: 70,
        aggregated_air_quality: 50,
        barn: 1
      },
      {
        id: 2,
        pig_count: 67,
        aggregated_temperature: 24,
        aggregated_humidity: 30,
        aggregated_air_quality: 40,
        barn: 3
      },
      {
        id: 1,
        pig_count: 21,
        aggregated_temperature: 21,
        aggregated_humidity: 50,
        aggregated_air_quality: 79,
        barn: 4
      }
    ]
  }),
  init: {
    status: 200
  }
};
export const BARN_STATUS = {
  body: JSON.stringify({
    id: 1,
    pig_count: 100,
    aggregated_temperature: 27,
    aggregated_humidity: 10,
    aggregated_air_quality: 20,
    barn: 1
  }),
  init: {
    status: 200
  }
};
