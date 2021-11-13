import { Switch, Route, Redirect } from "react-router-dom";
import { TablesPage } from "./pages/TablesPage";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/Login";
import { CreatePage } from "./pages/CreatePage";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage/TestPage";
import { TestContext } from "./context/TestContext";
import { useTest } from "./hooks/test.hook";

export const useRoutes = (isAuthenticated, profile) => {
  const { testResults, resultsIncrement, allTasks, tasksIncrement, dropTasks } =
    useTest();
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/tables" exact>
          <TablesPage />
        </Route>
        {profile?.role === "admin" && (
          <Route path="/create" exact>
            <CreatePage />
          </Route>
        )}
        <Route path="/home" exact>
          <HomePage />
        </Route>
        {profile?.role === "student" && (
          <Route path="/test" exact>
            <TestContext.Provider
              value={{
                resultsIncrement,
                tasksIncrement,
                testResults,
                allTasks,
                dropTasks,
                isFinished: true,
              }}
            >
              <TestPage />
            </TestContext.Provider>
          </Route>
        )}

        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
