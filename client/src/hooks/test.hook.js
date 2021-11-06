import { useCallback, useState } from "react";

export const useTest = () => {
  const [testResults, setTestResults] = useState(0);
  const [allTasks, setAllTasks] = useState(0);

  const resultsIncrement = useCallback(() => {
    const newResults = testResults + 1;
    setTestResults(newResults);
  }, [testResults]);

  const tasksIncrement = useCallback(() => {
    const newTasks = allTasks + 1;
    setAllTasks(newTasks);
  }, [allTasks]);

  const dropTasks = useCallback(() => {
    setAllTasks(0);
    setTestResults(0);
  }, []);

  return { testResults, resultsIncrement, allTasks, tasksIncrement, dropTasks };
};
