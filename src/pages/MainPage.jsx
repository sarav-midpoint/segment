import React, { useState } from "react";
import "./MainPage.css";
import Nav from "./Nav";
import SaveSegment from "./SaveSegment";

const MainPage = () => {
  const [dailog, setDailog] = useState(false);
  console.log("Open => ", dailog);

  const handleClick = () => {
    setDailog(!dailog);
  };
  return (
    <>
      <Nav />
      <div className="main-page">
        <button onClick={handleClick}>Save Segment</button>
      </div>
      {dailog && <SaveSegment close={handleClick} />}
    </>
  );
};

export default MainPage;
