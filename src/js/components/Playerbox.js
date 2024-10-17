const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: flex;
    flex-direction: column;
    margin: 0.5em;
    align-items: center;
  }
  .playerCards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
<div class="playerName"></div>
<div class="playerCards"></div>`

customElements.define('player-box', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    console.log('PlayerBox connected')
  }

  /**
   * @param {String} name
   */
  set playerName(name) {
    this.shadowRoot.querySelector('.playerName').textContent = name
  }

  /**
   * @param {imgElement} cardElement 
   */
  addCard(cardElement) {
    this.shadowRoot.querySelector('.playerCards').appendChild(cardElement)
  }

  /**
   * @param {imgElement} cardElement 
   */
  removeCard(cardElement) {
    this.shadowRoot.querySelector('.playerCards').removeChild(cardElement)
  }

  getCardElements() {
    return this.shadowRoot.querySelector('.playerCards img')
  }

  clearCards() {
    this.shadowRoot.querySelector('.playerCards').innerHTML = ''
  }
})