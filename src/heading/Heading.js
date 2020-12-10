import React, { Component } from "react";
import "./Heading.scss";

export default class Heading extends Component {
  render() {
    return (
      <div className="heading">
        <h1 data-heading={this.props.children} >
          {this.props.children}
        </h1>
      </div>
    );
  }
}
