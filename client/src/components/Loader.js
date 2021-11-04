import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

export const Loader = () => (
  <LoaderContainer>
    <div className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </LoaderContainer>
);
