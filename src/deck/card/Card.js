import React, { Component } from "react";
import FadeIn from 'react-fade-in';
import "./Card.scss";

export default class Card extends Component {
  constructor(props) {
    super(props);
    let cardClass
    if (!props.filtered ){
      //card position
      let rotation = Math.floor(Math.random() * 90);
      //card degrees
      rotation *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      let xPos = Math.floor(Math.random() * 200 - 100);
      let yPos = Math.floor(Math.random() * 300);
      this.__transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`;
      this.cardClass = "card card-unfiltered";
    }else{
      this.cardClass = "card card-filtered";
    }
  }
  render() {
    return (
      <FadeIn>
      <div className={this.cardClass} style={{ transform: this.__transform }}>
        <img
          src={this.props.card.images.png}
          alt={`${this.props.card.value} of ${this.props.card.suit}`}
        />
      </div>
    </FadeIn>
    );
  }
}
