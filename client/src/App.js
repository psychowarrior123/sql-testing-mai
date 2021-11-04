import logo from "./logo.svg";
import "./App.css";
import "materialize-css";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";

function App() {
  const { token, login, logout, userId, ready, profile } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
        profile,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="App">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
