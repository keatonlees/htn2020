import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";

var date;
function TitleBlock() {
  useEffect(() => {
    fetch("/_get_date")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        date = data["date"];
        console.log(date);
      });
  }, []);

  return (
    <div>
      <Heading />
      <h1>DATE: { date }</h1>
    </div>
  );
}

export default TitleBlock;
