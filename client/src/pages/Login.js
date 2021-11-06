import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { Icon, TextInput } from "react-materialize";
import axios from "axios";

const LoginContainer = styled.div`
  color: aliceblue;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  border-radius: 5%;
  align-items: center;
  width: 500px;
`;

const SubmitButton = styled.button`
  margin-bottom: 8px;
`;

export const LoginPage = () => {
  const history = useHistory();
  const { loading, clearError, error, setErrorMessage } = useHttp();
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { ...form });
      auth.login(data);
    } catch (e) {
      setErrorMessage(
        `${e.response.data.message}${
          e.response.data.errors
            ? `:<br />${e.response.data?.errors
                ?.map((error) => `&emsp;- ${error?.msg}`)
                .join("<br />")}`
            : ""
        }`
      );
    }
  };
  return (
    <>
      <a
        className="btn-floating btn-flat waves-effect waves-light transparent btn-back"
        onClick={() => {
          history.goBack();
        }}
      >
        <i className="material-icons left">arrow_back</i>Back
      </a>
      <h4 className="white-text text-bold">Вход</h4>
      <LoginContainer>
        <FormContainer className="row">
          <form className="col s12" onSubmit={submitHandler}>
            <div className="row">
              <TextInput
                email
                id="email"
                label="Email"
                validate
                name="email"
                onChange={changeHandler}
                className="yellow-input"
                s={12}
                m={12}
                l={12}
                xl={12}
              />
            </div>
            <div className="row">
              <TextInput
                password
                id="password"
                label="Password"
                validate
                name="password"
                onChange={changeHandler}
                className="yellow-input"
                s={12}
                m={12}
                l={12}
                xl={12}
              />
            </div>
            <SubmitButton
              className="btn waves-effect waves-light yellow rounded black-text"
              name="action"
              disabled={loading}
              type="submit"
            >
              Войти
              <Icon right>vpn_key</Icon>
            </SubmitButton>
          </form>
        </FormContainer>
      </LoginContainer>
    </>
  );
};
