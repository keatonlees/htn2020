import React, { Component } from "react";
import Heading from "../components/Heading";
import classes from '../components/Task.module.css'

class TitleBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }
  
  componentDidMount() {
    fetch('/_get_date')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ date: data["date"]})
      });
  };

  render() {
    return (
      <div>
        <Heading />
        <p className={ classes.TitleBlock } >{ this.state.date }</p>
      </div>
    );
  }
}

export default TitleBlock;
