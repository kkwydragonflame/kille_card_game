const template = document.createElement('template')
template.innerHTML = `
<div name="playerName"></div>
<div name="playerCards"></div>`

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
    this.shadowRoot.querySelector('[name=playerName]').textContent = name
  }

  /**
   * @param {imgElement} cardElement 
   */
  addCard(cardElement) {
    this.shadowRoot.querySelector('[name=playerCards]').appendChild(cardElement)
  }

  /**
   * @param {imgElement} cardElement 
   */
  removeCard(cardElement) {
    this.shadowRoot.querySelector('[name=playerCards]').removeChild(cardElement)
  }

  clearCards() {
    this.shadowRoot.querySelector('[name=playerCards]').innerHTML = ''
  }
})