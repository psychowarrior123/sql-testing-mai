import React from "react";
import { TaskCard } from "./TaskCard";

export const TaskBlock = ({ data, isManipulate = false }) => {
  return (
    <>
      <TaskCard data={data?.easy} isManipulate={isManipulate} />
      <TaskCard data={data?.medium} isManipulate={isManipulate} />
      <TaskCard data={data?.hard} isManipulate={isManipulate} />
    </>
  );
};
