/**
 * A custom webbcomponent where you can play the card game Kille, against three computer players.
 * @author Johanna Eriksson <je224gs@student.lnu.se>
 * @version 1.0.0
 */

import './Playerbox.js'
import '../CardTable.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: block;
    margin: auto;
    width: 80vw;
    height: 80vh;
    background-color: lightblue;
  }
  .game {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    grid-template-areas:
      ". top ."
      "left center right"
      ". bottom .";
    gap: 0.5em;
    height: 100%;
  }
  * {
    border: 1px solid red;
  }
  .cardtable {
    background-color: forestgreen;
    border: 3px solid black;
    border-radius: 10px;

    transform: perspective(1000px) rotateX(20deg);
    transform-origin: center;
  }
  .playerbox {
    background-color: grey;
    height: 100%;
  }
  .card-slot {
    position: absolute;
    width: 10%;
    height: 25%;
    border: 2px solid grey;
    border-radius: 5px;
  }
  #slot-left {
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
  }
  #slot-top {
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  } 
  #slot-right {
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
  }
  #slot-bottom {
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
<div class="game">
  <player-box style="grid-area: left;"></player-box>
  <player-box style="grid-area: top;"></player-box>
  <player-box style="grid-area: right;"></player-box>
  <player-box style="grid-area: bottom;"></player-box>
  <div class="cardtable" style="grid-area: center;">
    <div class="card-slot" id="slot-left"></div>
    <div class="card-slot" id="slot-top"></div>
    <div class="card-slot" id="slot-right"></div>
    <div class="card-slot" id="slot-bottom"></div>
  </div>
</div>
`

customElements.define('kille-game', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    console.log('KilleGame connected')
  }

  #setupGame() {
    // create players
    // create card table
    // call playRound()
  }
})