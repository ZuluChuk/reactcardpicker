import React, { Component } from "react";
import axios from "axios";
import Deck from "./deck/Deck";
import Heading from "./heading/Heading";
import "./App.scss";

export default class App extends Component {
  state = {
    deck: {},
    cardsDrawn: []
  };

  async componentDidMount() {
    // fetch deck on load
    this.newDeck();
  }

  newDeck = async () => {
    // new deck
    try {
      const url = "https://deckofcardsapi.com/api/deck/new/shuffle";
      const response = await axios.get(url);
      const deck = await response.data;
      this.setState({
        deck,
        cardsDrawn: []
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateDeck = async deckId => {
    // update deck
    try {
      const url = `https://deckofcardsapi.com/api/deck/${deckId}`;
      const response = await axios.get(url);
      const deck = await response.data;
      this.setState({ deck });
    } catch (err) {
      console.error(err);
    }
  };

  drawCard = async () => {
    // card from current deck
    try {
      //no cards left
      if (this.state.deck.remaining === 0) {
        alert("you ran out of cards");
      }
      const url = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`;
      const resp = await axios.get(url);
      const data = await resp.data;
      this.setState(st => ({
        cardsDrawn: [...st.cardsDrawn, ...data.cards]
      }));
      this.updateDeck(this.state.deck.deck_id);
    } catch (err) {
      console.error(err);
    }

    console.log(this.state.cardsDrawn);
  };

  convertValue = () => {
    const [deck] = this.state.cardsDrawn
    let convertedDeck = deck;
    convertedDeck = this.state.cardsDrawn.map((item) => {
      if (item.value === "ACE"){
        item.value = item.value = 14;
        return item;
      }else if (item.value === "KING" ){
        item.value = item.value = 13;
        return item;
      }else if (item.value === "QUEEN"){
        item.value = item.value = 12;
        return item;
      }else if (item.value === "JACK"){
        item.value = item.value = 10;
        return item;
      }else{
        item.value = item.value = parseInt(item.value);
        return item;
      }
    });

    console.log(convertedDeck);

    this.setState({
      cardsDrawn: convertedDeck
    })
  };

  sortDeck = () => {
    // this is a better way of doing it but dont know why its not working for me
    // this.setState(prevState => {
    //   this.state.cardsDrawn.sort((a, b) => (a.value - b.value));
    // });

    this.convertValue();
    const [deck] = this.state.cardsDrawn;
    let newSortedDeck = deck;
    newSortedDeck = this.state.cardsDrawn.sort((a, b) => (a.value - b.value));
    this.setState({
      cardsDrawn: newSortedDeck
    });
  };

  render() {
    return (
      <div className="cardApp">
        <Heading>Audi Magic card generator</Heading>
        <div className="button-container">
          <button className="button" onClick={this.drawCard}>
            Draw Random Card
          </button>
          <button className="button" onClick={this.newDeck}>
            New Deck
          </button>
          <button className="button" onClick={this.sortDeck}>
            Sort Deck
          </button>
        </div>
        <Deck cards={this.state.cardsDrawn} />
      </div>
    );
  }
}
