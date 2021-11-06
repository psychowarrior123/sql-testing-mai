import React, { useContext, useState } from "react";
import { Button, Col, CollectionItem, Row, Textarea } from "react-materialize";
import styled from "styled-components";
import axios from "axios";
import { TestContext } from "../../../context/TestContext";

export const TaskCard = ({ data, isManipulate }) => {
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { resultsIncrement, tasksIncrement } = useContext(TestContext);

  const checkTask = async () => {
    const { data: result } = await axios.post(`/api/test/check`, {
      answer,
      check: data?.query,
      isManipulate,
    });
    setCheck(`${result.isEqual}`);
    setDisabled(true);
    tasksIncrement();
    if (result.isEqual) {
      resultsIncrement();
    }
  };

  return (
    <CollectionItem className="black">
      <Row>
        <Col s={12} m={6} l={6} xl={6}>
          <p className="white-text flow-text text-bold">{data?.text}</p>
        </Col>
        <Textarea
          data-length={1200}
          l={6}
          m={6}
          s={12}
          xl={6}
          label="Введите ответ"
          name="answer"
          onChange={(e) => setAnswer(e.target.value)}
          className={check}
          disabled={disabled}
        />
      </Row>
      <Row>
        <Col s={12} m={6} l={6} xl={6}>
          <span className="white-text">
            {data?.id}. {data?.query}
          </span>
        </Col>
        <Button
          className="yellow black-text"
          waves="dark"
          onClick={checkTask}
          disabled={disabled}
        >
          Ответ
        </Button>
        {check &&
          (check === "true" ? (
            <Col s={1}>
              <span className="green-text text-bold">ВЕРНО</span>
            </Col>
          ) : (
            <Col s={1}>
              <span className="red-text text-bold">НЕВЕРНО</span>
            </Col>
          ))}
      </Row>
    </CollectionItem>
  );
};
