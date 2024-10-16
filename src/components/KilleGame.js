/**
 * @author Johanna Eriksson <je224gs@student.lnu.se>
 * @version 1.0.0
 */

// Define template
const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    width: 80%;
    height: 80%;
    background-color: lightblue;
  }
  .game {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr auto 1fr;
    grid-template-areas:
      ". top ."
      "left center right"
      ". bottom .";
    gap: 1em;
  }
  * {
    border: 1px solid red;
  }
  .cardtable {
    background-color: green;
    height: 100px;
    width: 100px;
  }
</style>
<div class="game">
  <div class="playerbox1" style="grid-area: left;"></div>
  <div class="playerbox2" style="grid-area: top;"></div>
  <div class="playerbox3" style="grid-area: right;"></div>
  <div class="playerbox4" style="grid-area: bottom;"></div>
  <div class="cardtable" style="grid-area: center;"></div>
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
})