import { useCallback, useState } from "react";

export const useTest = () => {
  const [testResults, setTestResults] = useState(0);
  const [allTasks, setAllTasks] = useState(0);

  const resultsIncrement = useCallback(() => {
    setTestResults(testResults + 1);
  }, [testResults]);

  const tasksIncrement = useCallback(() => {
    setAllTasks(allTasks + 1);
  }, [allTasks]);

  const dropTasks = useCallback(() => {
    setAllTasks(0);
    setTestResults(0);
  });

  return { testResults, resultsIncrement, allTasks, tasksIncrement, dropTasks };
};
