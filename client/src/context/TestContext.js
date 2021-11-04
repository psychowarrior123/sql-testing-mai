import { createContext } from "react";

function noop() {}

export const TestContext = createContext({
  isFinished: false,
  testResults: null,
  allTasks: null,
  resultsIncrement: noop,
  tasksIncrement: noop,
  dropTasks: noop,
});
