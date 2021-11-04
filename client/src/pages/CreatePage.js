import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useMessage } from "../hooks/message.hook";
import axios from "axios";
import {
  Button,
  Col,
  Icon,
  Select,
  Textarea,
  TextInput,
} from "react-materialize";
import { Row } from "react-data-grid";
import { useDidMount } from "rooks";
import DataGrid from "react-data-grid";
import { minHeights } from "./TablesPage";
import M from "materialize-css";

const Container = styled.div`
  padding: 12px;
  margin: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const types = ["queries", "groups", "manipulates", "functions", "subqueries"];

export const CreatePage = () => {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({ text: "", query: "", difficulty: "" });
  const [updateForm, setUpdateForm] = useState({
    text: "",
    query: "",
    difficulty: "",
  });
  const [type, setType] = useState(null);
  const [updateType, setUpdateType] = useState(null);
  const [id, setId] = useState(null);
  const message = useMessage();

  useEffect(() => {
    M.updateTextFields();
  }, []);

  const refetch = async () => {
    const { data } = await axios.get(`/api/tasks/${types}`);
    setTables(data);
  };

  useDidMount(refetch);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeHandlerUpdate = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.post(`/api/tasks/${type}`, { ...form });
        refetch();
        e.target.reset();
      } catch (e) {
        message(e.message);
      }
    },
    [form, type]
  );

  const submitUpdateHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`/api/tasks/${updateType}/${id}`, { ...updateForm });
        refetch();
        e.target.reset();
      } catch (e) {
        message(e.message);
      }
    },
    [updateForm, updateType, id]
  );

  const renderTables = useMemo(() => {
    if (tables.length === 0) return null;
    return tables.map((table) =>
      Object.entries(table).map(([key, value]) => {
        const columns = [
          {
            key: "id",
            name: "ID",
          },
          {
            key: "query",
            name: "Ответ",
          },
          {
            key: "text",
            name: "Задание",
          },
          {
            key: "difficulty",
            name: "Сложность",
          },
        ];
        const rows =
          value.length === 0
            ? [{ id: "", query: "", text: "", difficulty: "" }]
            : value;
        return (
          <>
            <h6 className="text-bold white-text" id={key}>
              {key.toUpperCase()}
            </h6>
            <DataGrid
              columns={columns}
              rows={rows}
              aria-labelledby={key}
              style={{ minHeight: minHeights(rows.length) }}
              rowRenderer={(props) => {
                return (
                  <Row
                    onDoubleClick={async (e) => {
                      await navigator.clipboard.writeText(e.target.innerHTML);
                      message("Скопировано в буфер обмена!");
                    }}
                    {...props}
                  />
                );
              }}
            />
          </>
        );
      })
    );
  }, [tables]);

  return (
    tables && (
      <div>
        <h1 className="white-text">Добавить задание</h1>
        <Container className="row">
          <Col className="transparent white-text" s={4}>
            <h5 className="text-bold">Доступные таблицы</h5>
            {renderTables}
          </Col>
          <form onSubmit={submitHandler}>
            <Col className="white-text" s={8}>
              <h5 className="white-text text-bold">Новое задание</h5>
              <Container>
                <Select
                  name="type"
                  id="select-type"
                  label="Выберите тип задания"
                  multiple={false}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value=""
                  s={6}
                  m={6}
                  l={6}
                  xl={6}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите тип задания
                  </option>
                  {types.map((type) => (
                    <option value={type}>{type.toUpperCase()}</option>
                  ))}
                </Select>
                <Select
                  name="difficulty"
                  id="select-type"
                  label="Выберите сложность"
                  multiple={false}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value=""
                  s={6}
                  m={6}
                  l={6}
                  xl={6}
                  onChange={changeHandler}
                >
                  <option value="" disabled>
                    Выберите сложность
                  </option>
                  <option value="easy">Легко</option>
                  <option value="medium">Средне</option>
                  <option value="hard">Тяжело</option>
                </Select>
                <Textarea
                  data-length={1200}
                  l={6}
                  m={6}
                  s={6}
                  xl={6}
                  label="Введите текст задания"
                  name="text"
                  onChange={changeHandler}
                />
                <Textarea
                  data-length={1200}
                  l={6}
                  m={6}
                  s={6}
                  xl={6}
                  label="Введите ответ"
                  name="query"
                  onChange={changeHandler}
                />
              </Container>
            </Col>
            <Button
              large
              node="button"
              waves="dark"
              className="rounded yellow black-text"
            >
              Добавить задание
              <Icon right>add</Icon>
            </Button>
          </form>
          <form onSubmit={submitUpdateHandler}>
            <Col className="white-text" s={8}>
              <h5 className="white-text text-bold">Изменить задание</h5>
              <Container>
                <TextInput
                  s={2}
                  m={2}
                  l={2}
                  xl={2}
                  label="Введите ID"
                  className="yellow-input"
                  type="number"
                  onChange={(e) => setId(e.target.value)}
                />
                <Select
                  name="type"
                  id="select-type"
                  label="Выберите тип задания"
                  multiple={false}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value=""
                  s={5}
                  m={5}
                  l={5}
                  xl={5}
                  onChange={(e) => setUpdateType(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите тип задания
                  </option>
                  {types.map((type) => (
                    <option value={type}>{type.toUpperCase()}</option>
                  ))}
                </Select>
                <Select
                  name="difficulty"
                  id="select-type"
                  label="Выберите сложность"
                  multiple={false}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value=""
                  s={5}
                  m={5}
                  l={5}
                  xl={5}
                  onChange={changeHandlerUpdate}
                >
                  <option value="" disabled>
                    Выберите сложность
                  </option>
                  <option value="easy">Легко</option>
                  <option value="medium">Средне</option>
                  <option value="hard">Тяжело</option>
                </Select>
                <Textarea
                  data-length={1200}
                  l={6}
                  m={6}
                  s={6}
                  xl={6}
                  label="Введите новый текст задания"
                  name="text"
                  onChange={changeHandlerUpdate}
                />
                <Textarea
                  data-length={1200}
                  l={6}
                  m={6}
                  s={6}
                  xl={6}
                  label="Введите новый ответ"
                  name="query"
                  onChange={changeHandlerUpdate}
                />
              </Container>
            </Col>
            <Col s={4}>
              <Button
                large
                node="button"
                waves="dark"
                className="rounded yellow black-text"
                type="submit"
              >
                Изменить задание
                <Icon right>update</Icon>
              </Button>
            </Col>
            <Col s={4}>
              <Button
                large
                node="button"
                waves="dark"
                className="rounded yellow black-text"
                onClick={async () => {
                  const { data } = await axios.delete(
                    `/api/tasks/${updateType}/${id}`
                  );
                  await refetch();
                  message(data.message);
                }}
              >
                Удалить задание
                <Icon right>delete_forever</Icon>
              </Button>
            </Col>
          </form>
        </Container>
      </div>
    )
  );
};
