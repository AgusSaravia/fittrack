export const pickPalette = (name, colorPalette) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

const workoutLogsData = [
  {
    id: 1,
    date: "2025-03-27",
    exercise: "Bench Press",
    sets: 3,
    reps: 8,
    weight: 100,
  },
  {
    id: 2,
    date: "2025-03-27",
    exercise: "Squats",
    sets: 3,
    reps: 8,
    weight: 120,
  },
  {
    id: 3,
    date: "2025-03-26",
    exercise: "Deadlifts",
    sets: 1,
    reps: 5,
    weight: 140,
  },
  {
    id: 4,
    date: "2025-03-25",
    exercise: "Overhead Press",
    sets: 3,
    reps: 10,
    weight: 60,
  },
  {
    id: 5,
    date: "2025-03-24",
    exercise: "Barbell Rows",
    sets: 3,
    reps: 8,
    weight: 80,
  },
  {
    id: 6,
    date: "2025-03-23",
    exercise: "Pull-ups",
    sets: 3,
    reps: 6,
    weight: 0,
  },
  {
    id: 7,
    date: "2025-03-22",
    exercise: "Dips",
    sets: 3,
    reps: 10,
    weight: 0,
  },
];
export default {
  workoutLogsData,
};
