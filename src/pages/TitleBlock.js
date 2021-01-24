import React, { Component } from "react";
import Heading from "../components/Heading";
import classes from '../components/Task.module.css'

class TitleBlock extends Component {
  
  render() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();

    return (
      <div>
        <Heading />
        <p className={ classes.TitleBlock } >{ months[ date.getMonth() ] } { date.getDate() }, { date.getFullYear() } </p>
      </div>
    );
  }
}

export default TitleBlock;
