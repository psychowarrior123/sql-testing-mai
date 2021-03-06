import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import M from "materialize-css";
import { Icon } from "react-materialize";
import axios from "axios";

const RegisterContainer = styled.div`
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
`;

const FormContainer = styled.div`
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  border-radius: 5%;
  width: 500px;
`;

const SubmitButton = styled.button`
  margin-bottom: 8px;
`;

const SelectContainer = styled.select`
  color: white !important;
  &:focus {
    border-bottom: 1px solid #ffeb3b !important;
    box-shadow: 0 1px 0 0 #ffeb3b !important;
  }
`;

export const RegisterPage = () => {
  const history = useHistory();
  const { loading, clearError, error, setErrorMessage } = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    role: "",
    phone_number: "",
    study_group: "",
  });

  useEffect(() => M.AutoInit());

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/register", { ...form });
      message(data.message);
      history.push("/login");
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
      <h4 className="white-text text-bold">??????????????????????</h4>
      <RegisterContainer>
        <FormContainer className="row">
          <form className="col s12" onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="fullname"
                  type="text"
                  className="validate yellow-input"
                  name="fullname"
                  onChange={changeHandler}
                  required={true}
                />
                <label htmlFor="fullname">??????</label>
              </div>
              <div className="input-field col s12 select-wrapper">
                <SelectContainer
                  name="role"
                  id="role"
                  onChange={changeHandler}
                  className="yellow-input"
                  required={true}
                >
                  <option value="" disabled selected>
                    ???????????????? ????????
                  </option>
                  <option value="teacher">??????????????????????????</option>
                  <option value="student">??????????????</option>
                </SelectContainer>
                <label htmlFor="role">????????</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="phone_number"
                  type="tel"
                  className="validate yellow-input"
                  name="phone_number"
                  onChange={changeHandler}
                />
                <label htmlFor="phone_number">??????????????</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate yellow-input"
                  name="email"
                  onChange={changeHandler}
                  required={true}
                />
                <label htmlFor="email">E-mail</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate yellow-input"
                  name="password"
                  onChange={changeHandler}
                  required={true}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="group"
                  type="text"
                  className="validate yellow-input"
                  name="study_group"
                  onChange={changeHandler}
                  required={true}
                />
                <label htmlFor="group">?????????????? ????????????</label>
              </div>
            </div>
            <SubmitButton
              className="btn waves-effect waves-light yellow rounded black-text"
              name="action"
              disabled={loading}
              type="submit"
            >
              ????????????????????????????????????
              <Icon right>send</Icon>
            </SubmitButton>
          </form>
        </FormContainer>
      </RegisterContainer>
    </>
  );
};
