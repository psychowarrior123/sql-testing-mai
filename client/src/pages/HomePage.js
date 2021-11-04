import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DataGrid, { Row } from "react-data-grid";
import styled from "styled-components";
import { useMessage } from "../hooks/message.hook";
import axios from "axios";
import { Button, Icon } from "react-materialize";
import { AuthContext } from "../context/AuthContext";
import { useDidMount } from "rooks";
import { minHeights } from "./TablesPage";

const Container = styled.div`
  padding: 12px;
`;

export const HomePage = () => {
  const { profile } = useContext(AuthContext);
  const [marks, setMarks] = useState(null);
  const [students, setStudents] = useState(null);
  const message = useMessage();

  const mappingByRole = useMemo(
    () => ({
      student: `student/${profile?.fullname}`,
      teacher: `teacher/${profile?.study_group}`,
    }),
    [profile]
  );

  useDidMount(async () => {
    const { data } = await axios.get(
      `api/marks/${mappingByRole[profile?.role]}`
    );
    if (profile?.role === "student") {
      setMarks(data);
    }
    if (profile?.role === "teacher") {
      setStudents(data);
    }
  });

  const studentsRows = useMemo(() => students, [students]);

  const studentsColumns = useMemo(
    () => [
      {
        name: "ФИО",
        key: "fullname",
      },
    ],
    []
  );

  const marksRows = useMemo(() => marks, [marks]);

  const marksColumns = useMemo(
    () => [
      {
        name: "Оценка",
        key: "mark",
      },
      {
        name: "Дата",
        key: "createdAt",
      },
    ],
    []
  );

  return (
    <div>
      <h1 className="white-text">Главная</h1>

      <Container className="row">
        {profile?.role === "student"
          ? marks && (
              <div className={`col ${marksColumns.length <= 6 ? "s6" : "s12"}`}>
                <h6 className="text-bold white-text">Мои результаты</h6>
                <DataGrid
                  style={{ minHeight: minHeights(marksRows.length) }}
                  columns={marksColumns}
                  rows={marksRows}
                  rowRenderer={(props) => {
                    const date = new Date(props.row.createdAt);
                    const options = {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    };
                    props.row.createdAt = date.toLocaleDateString(
                      "ru-RU",
                      options
                    );
                    return (
                      <Row
                        onDoubleClick={async (e) => {
                          await navigator.clipboard.writeText(
                            e.target.innerHTML
                          );
                          message("Скопировано в буфер обмена!");
                        }}
                        {...props}
                      />
                    );
                  }}
                />
              </div>
            )
          : students && (
              <>
                <div className="col s3">
                  <h6 className="text-bold white-text">Мои студенты</h6>
                  <DataGrid
                    style={{ minHeight: minHeights(studentsRows?.length) }}
                    columns={studentsColumns}
                    rows={studentsRows}
                    rowRenderer={(props) => {
                      return (
                        <Row
                          onDoubleClick={async (e) => {
                            await navigator.clipboard.writeText(
                              e.target.innerHTML
                            );
                            message("Скопировано в буфер обмена!");
                          }}
                          onClick={async (e) => {
                            const { data } = await axios.get(
                              `api/marks/student/${e.target.innerHTML}`
                            );
                            setMarks(data);
                          }}
                          {...props}
                        />
                      );
                    }}
                  />
                </div>
                {marks && (
                  <div className="col s9">
                    <h6 className="text-bold white-text">
                      Результаты студента
                    </h6>
                    <DataGrid
                      style={{ minHeight: minHeights(marksRows?.length) }}
                      columns={marksColumns}
                      rows={marksRows}
                      rowRenderer={(props) => {
                        const date = new Date(props.row.createdAt);
                        const options = {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        };
                        props.row.createdAt = date.toLocaleDateString(
                          "ru-RU",
                          options
                        );
                        return (
                          <Row
                            onDoubleClick={async (e) => {
                              await navigator.clipboard.writeText(
                                e.target.innerHTML
                              );
                              message("Скопировано в буфер обмена!");
                            }}
                            {...props}
                          />
                        );
                      }}
                    />
                  </div>
                )}
              </>
            )}
      </Container>
    </div>
  );
};
