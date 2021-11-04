import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useCallback((user) => {
    setToken(user.token);
    setUserId(user.userId);
    setProfile(user);

    localStorage.setItem(storageName, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setProfile(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, profile };
};
