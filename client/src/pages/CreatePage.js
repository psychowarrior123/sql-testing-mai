import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    [form, type, message]
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
    [updateForm, updateType, id, message]
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
            name: "??????????",
          },
          {
            key: "text",
            name: "??????????????",
          },
          {
            key: "difficulty",
            name: "??????????????????",
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
                      message("?????????????????????? ?? ?????????? ????????????!");
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
        <h4 className="text-bold white-text">???????????????????? ??????????????????</h4>
        <div className="row">
          <Col className="white-text" s={12} m={8} l={8} xl={8}>
            <form onSubmit={submitHandler}>
              <Col className="white-text" s={12} m={12} l={12} xl={12}>
                <h5 className="white-text text-bold">?????????? ??????????????</h5>
                <div>
                  <Select
                    name="type"
                    id="select-type"
                    label="???????????????? ?????? ??????????????"
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
                      ???????????????? ?????? ??????????????
                    </option>
                    {types.map((type) => (
                      <option value={type}>{type.toUpperCase()}</option>
                    ))}
                  </Select>
                  <Select
                    name="difficulty"
                    id="select-type"
                    label="???????????????? ??????????????????"
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
                      ???????????????? ??????????????????
                    </option>
                    <option value="easy">??????????</option>
                    <option value="medium">????????????</option>
                    <option value="hard">????????????</option>
                  </Select>
                  <Textarea
                    data-length={1200}
                    l={6}
                    m={6}
                    s={12}
                    xl={6}
                    label="?????????????? ?????????? ??????????????"
                    name="text"
                    onChange={changeHandler}
                  />
                  <Textarea
                    data-length={1200}
                    l={6}
                    m={6}
                    s={12}
                    xl={6}
                    label="?????????????? ??????????"
                    name="query"
                    onChange={changeHandler}
                  />
                </div>
                <Button
                  large
                  node="button"
                  waves="dark"
                  className="rounded yellow black-text"
                >
                  ???????????????? ??????????????
                  <Icon right>add</Icon>
                </Button>
              </Col>
            </form>
            <form onSubmit={submitUpdateHandler}>
              <Col className="white-text" s={12} m={12} l={12} xl={12}>
                <h5 className="white-text text-bold">???????????????? ??????????????</h5>
                <div>
                  <TextInput
                    s={2}
                    m={2}
                    l={2}
                    xl={2}
                    label="?????????????? ID"
                    className="yellow-input"
                    type="number"
                    onChange={(e) => setId(e.target.value)}
                  />
                  <Select
                    name="type"
                    id="select-type"
                    label="???????????????? ?????? ??????????????"
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
                      ???????????????? ?????? ??????????????
                    </option>
                    {types.map((type) => (
                      <option value={type}>{type.toUpperCase()}</option>
                    ))}
                  </Select>
                  <Select
                    name="difficulty"
                    id="select-type"
                    label="???????????????? ??????????????????"
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
                      ???????????????? ??????????????????
                    </option>
                    <option value="easy">??????????</option>
                    <option value="medium">????????????</option>
                    <option value="hard">????????????</option>
                  </Select>
                  <Textarea
                    data-length={1200}
                    l={6}
                    m={6}
                    s={12}
                    xl={6}
                    label="?????????????? ?????????? ?????????? ??????????????"
                    name="text"
                    onChange={changeHandlerUpdate}
                  />
                  <Textarea
                    data-length={1200}
                    l={6}
                    m={6}
                    s={12}
                    xl={6}
                    label="?????????????? ?????????? ??????????"
                    name="query"
                    onChange={changeHandlerUpdate}
                  />
                  <Col s={6} m={6} l={6} xl={6}>
                    <Button
                      large
                      node="button"
                      waves="dark"
                      className="rounded yellow black-text"
                      type="submit"
                    >
                      ???????????????? ??????????????
                      <Icon right>update</Icon>
                    </Button>
                  </Col>
                  <Col s={6} m={6} l={6} xl={6}>
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
                      ?????????????? ??????????????
                      <Icon right>delete_forever</Icon>
                    </Button>
                  </Col>
                </div>
              </Col>
            </form>
          </Col>
          <Col className="transparent white-text" s={12} m={4} l={4} xl={4}>
            <h5 className="text-bold">?????????????????? ??????????????</h5>
            {renderTables}
          </Col>
        </div>
      </div>
    )
  );
};
