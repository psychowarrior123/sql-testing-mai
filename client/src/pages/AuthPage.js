import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const AuthContainer = styled.div`
  color: aliceblue;
`;

const Login = styled.a`
  border-radius: 10%;
  margin: 4px;
  font-weight: bold;
`;

const Signup = styled.a`
  border-radius: 10%;
  margin: 4px;
  color: black;
  font-weight: bold;
`;

export const AuthPage = () => {
  const history = useHistory();
  return (
    <AuthContainer>
      <h1>Auth Page</h1>
      <Login
        className="waves-effect waves-dark btn-large grey"
        id="login"
        onClick={() => {
          history.push("/login");
        }}
      >
        Вход
      </Login>
      <Signup
        className="waves-effect waves-light btn-large yellow"
        id="signup"
        onClick={() => {
          history.push("/register");
        }}
      >
        Регистрация
      </Signup>
    </AuthContainer>
  );
};
