import React, { Component } from "react";
import Card from "./card/Card";
import "./Deck.scss";

export default class Deck extends Component {
  render() {

    let spades;
    let hearts;
    let diamonds;
    let clubs;


    return (
      <div className="deck">
        <div className="deck-container">
          <div className="deck-container-unfiltered">
            <h2>Draw Cards</h2>
            {this.props.cards.map(card => (
              <Card card={card} key={card.code} />
            ))}
          </div>
          <div className="deck-container-filter">
            <h2>Filtered by suit</h2>
            <div className="pack">
              <h3>Spades</h3>
              {this.props.cards.filter(card => card.suit === "SPADES").map(card => (
                  <Card card={card} filtered={true} />
              ))}
            </div>

            <div className="pack">
              <h3>Clubs</h3>
              {this.props.cards.filter(card => card.suit === "CLUBS").map(card => (
                <Card card={card} filtered={true} />
              ))}
            </div>

            <div className="pack">
              <h3>Diamonds</h3>
              {this.props.cards.filter(card => card.suit === "DIAMONDS").map(card => (
                <Card card={card} filtered={true} />
              ))}
            </div>

            <div className="pack">
              <h3>Hearts</h3>
              {this.props.cards.filter(card => card.suit === "HEARTS").map(card => (
                <Card card={card} filtered={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
