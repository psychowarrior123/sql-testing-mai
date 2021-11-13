import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useMessage } from "../../hooks/message.hook";
import axios from "axios";
import { Button, Collection, Icon } from "react-materialize";
import { TaskBlock } from "./components/TaskBlock";
import { TestContext } from "../../context/TestContext";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 12px;
`;

export const TestPage = () => {
  const [tasks, setTasks] = useState(null);
  const { isFinished, testResults, allTasks, dropTasks } =
    useContext(TestContext);
  const {
    profile: { fullname },
  } = useContext(AuthContext);
  const history = useHistory();
  const { message } = useMessage();

  const refetch = async () => {
    const { data } = await axios.get(`/api/test/generate`);
    if (Object.keys(data).length < 5) {
      refetch();
    } else {
      setTasks(data);
    }
  };

  const submitResults = async () => {
    const { data } = axios.post("api/marks", {
      fullname,
      mark: `${testResults}/${allTasks}`,
    });
    message(data.message);
    dropTasks();
    history.push("/home");
  };

  return (
    <div>
      <h4 className="text-bold white-text">Тест</h4>
      {!tasks && (
        <Button
          large
          node="button"
          waves="dark"
          className="rounded yellow black-text"
          onClick={refetch}
        >
          Начать тест
          <Icon right>create</Icon>
        </Button>
      )}
      {tasks && (
        <Container className="row">
          <Collection>
            <TaskBlock data={tasks?.queries} />
            <TaskBlock data={tasks?.groups} />
            <TaskBlock data={tasks?.manipulates} isManipulate />
            <TaskBlock data={tasks?.functions} />
            <TaskBlock data={tasks?.subqueries} />
          </Collection>
          <Button
            className="yellow black-text"
            large
            disabled={!isFinished}
            onClick={submitResults}
          >
            Завершить тест
          </Button>
        </Container>
      )}
    </div>
  );
};
