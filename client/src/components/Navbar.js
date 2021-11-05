import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import {
  Button,
  Dropdown,
  Icon,
  SideNav,
  SideNavItem,
} from "react-materialize";
import axios from "axios";
import { useMessage } from "../hooks/message.hook";

const NavbarContainer = styled.nav`
  padding: 0 2rem;
  background-color: rgba(255, 235, 59, 0.5);
  border-radius: 0 0 5% 5%;
`;

const DropdownContainer = styled.div`
  width: 300px !important;
  border-radius: 0 0 5% 5%;
`;

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  useEffect(() => window.M.AutoInit());

  return (
    auth.profile && (
      <>
        <NavbarContainer>
          <div className="nav-wrapper">
            {/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
              navigator.userAgent
            ) && (
              <SideNav
                id="navbar"
                options={{
                  draggable: true,
                }}
                trigger={
                  <Button node="button" className="transparent">
                    <Icon>menu</Icon>
                  </Button>
                }
              >
                <SideNavItem
                  user={{
                    background: "https://placeimg.com/640/480/tech",
                    email: auth.profile.email,
                    name: auth.profile.fullname,
                  }}
                  userView
                />
                <SideNavItem
                  href="/"
                  className="black-text waves-effect text-bold"
                >
                  Главная
                </SideNavItem>
                {auth.profile.role === "student" && (
                  <SideNavItem
                    href="/test"
                    className="black-text waves-effect text-bold"
                  >
                    Начать тест
                  </SideNavItem>
                )}
                {auth.profile.role === "teacher" && (
                  <SideNavItem
                    href="/create"
                    className="black-text waves-effect text-bold"
                  >
                    Создать тест
                  </SideNavItem>
                )}
                <SideNavItem
                  href="/tables"
                  className="black-text waves-effect text-bold"
                >
                  Структуры таблиц
                </SideNavItem>
                <SideNavItem divider />
                <SideNavItem
                  href="/"
                  onClick={logoutHandler}
                  className="black-text"
                  waves
                >
                  <i className="material-icons">exit_to_app</i>Выйти
                </SideNavItem>
                <SideNavItem subheader>
                  <span className="black-text">
                    Phone number:{" "}
                    {auth.profile.phone_number !== ""
                      ? auth.profile.phone_number
                      : "--"}
                  </span>
                  <br />
                  <span className="black-text">Role: {auth.profile.role}</span>
                  <br />
                  <span className="black-text">
                    Group: {auth.profile.study_group}
                  </span>
                  <br />
                </SideNavItem>
              </SideNav>
            )}
            <span className="brand-logo text-bold black-text">
              {!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
              ) && "Тестирование"}{" "}
              SQL
            </span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/" className="black-text waves-effect text-bold">
                  Главная
                </NavLink>
                {auth.profile.role === "student" && (
                  <NavLink
                    to="/test"
                    className="black-text waves-effect text-bold"
                  >
                    Начать тест
                  </NavLink>
                )}
                {auth.profile.role === "teacher" && (
                  <NavLink
                    to="/create"
                    className="black-text waves-effect text-bold"
                  >
                    Создать тест
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/tables"
                  className="black-text waves-effect text-bold"
                >
                  Структуры таблиц
                </NavLink>
              </li>
              <li>
                <Dropdown
                  id="profile"
                  options={{
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: false,
                    container: null,
                    coverTrigger: false,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                  }}
                  trigger={
                    <a
                      className="black-text waves-effect text-bold dropdown-trigger"
                      data-target="profile"
                    >
                      <i className="large material-icons">account_circle</i>
                    </a>
                  }
                >
                  <span className="black-text">
                    Fullname: {auth.profile.fullname}
                  </span>
                  <span className="black-text">
                    Email: {auth.profile.email}
                  </span>
                  <span className="black-text">
                    Phone number: {auth.profile.phone_number}
                  </span>
                  <span className="black-text">Role: {auth.profile.role}</span>
                  <span className="black-text">
                    Group: {auth.profile.study_group}
                  </span>
                  <a href="/" onClick={logoutHandler} className="black-text">
                    <i className="material-icons">exit_to_app</i>Выйти
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </NavbarContainer>
      </>
    )
  );
};
