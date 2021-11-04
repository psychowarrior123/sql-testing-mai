import React, { useCallback, useContext, useEffect, useState } from "react";
import DataGrid, { Row } from "react-data-grid";
import styled from "styled-components";
import { useMessage } from "../hooks/message.hook";
import axios from "axios";
import { Button, Icon } from "react-materialize";
import { AuthContext } from "../context/AuthContext";

const Container = styled.div`
  padding: 12px;
`;

export const minHeights = (length) => {
  switch (length) {
    case 1:
      return "70px";
    case 2:
      return "105px";
    case 3:
      return "140px";
    case 4:
      return "175px";
    case 5:
      return "210px";
    case 6:
      return "245px";
    case 7:
      return "280px";
    case 8:
      return "315px";
    case 9:
      return "345px";
    default:
      return "380px";
  }
};

export const TablesPage = () => {
  const [tables, setTables] = useState({});
  const message = useMessage();
  const { profile } = useContext(AuthContext);

  useEffect(async () => {
    const { data } = await axios.get("/api/tables");

    const tableNames = data
      .reduce((acc, curr) => {
        acc.push(curr.TABLE_NAME);

        return acc;
      }, [])
      .filter((item, index, array) => array.indexOf(item) === index);
    tableNames.forEach(async (item) => {
      const { data } = await axios.get(`/api/tables/${item}`);
      setTables((prevState) => ({ ...prevState, [item]: data }));
    }, {});
  }, []);

  const renderTables = (flatTable) => {
    return Object.entries(flatTable)
      .sort(
        ([, a], [, b]) => Object.keys(b[0]).length - Object.keys(a[0]).length
      )
      .sort(([, a], [, b]) => b.length - a.length)
      .map(([key, value]) => {
        if (value.length === 0) return null;
        const columns = Object.keys(value[0]).map((item) => ({
          key: item,
          name: item,
          headerRenderer: (e) => (
            <span
              onDoubleClick={async (e) => {
                await navigator.clipboard.writeText(e.target.innerHTML);
                message("Скопировано в буфер обмена!");
              }}
            >
              {e.column.name}
            </span>
          ),
        }));
        const rows = value;
        return (
          <div className={`col ${columns.length <= 6 ? "s6" : "s12"}`}>
            <h6 className="text-bold white-text" id={key}>
              {key}
            </h6>
            <DataGrid
              style={{ minHeight: minHeights(rows.length) }}
              columns={columns}
              rows={rows}
              aria-labelledby={key}
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
          </div>
        );
      });
  };

  const render = useCallback(
    () => renderTables(tables),
    [tables, renderTables]
  );

  const refreshHandler = async () => {
    const { data } = await axios.post("/api/tables/refresh");
    message(data.message);
  };

  return (
    <div>
      <h1 className="white-text">Структуры таблиц</h1>
      {profile.role === "teacher" && (
        <Button
          className="yellow"
          floating
          icon={<Icon className="black-text">refresh</Icon>}
          large
          node="button"
          waves="dark"
          onClick={refreshHandler}
        />
      )}
      <Container className="row">{render()}</Container>
    </div>
  );
};
