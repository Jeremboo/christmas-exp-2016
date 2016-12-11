/*
 * TextAnimation
 * - constructor ............ Ajoute toute les lettres dans un span.
 * - show ................... Lance l'animation pour afficher les lettres
 * - hide ................... Lance l'animation pour cacher les lettres
 * - addEffectForEachLetter . Personnalise for each letter a specific animation
 * - _animateLetters ........ Recurcive function to call action on each letter
 **/

export default class TextAnimation {

  constructor(element, letterTransition, letterStyle) {
    this.element = element;
    this.letterTransition = letterTransition || 150;
    // TODO add random animations
    this.animations = ['opacity', 'top', 'bottom', 'left', 'right'];
    this.letterStyle = letterStyle || this.animations[0];

    this._animationCallback = false;
    this._letters = [];
    this._letterTransition = this.letterTransition;
    this._text = this.element.innerText || this.element.textContent;

    this.element.classList.add('TextAnimation');
    this.element.innerText = '';
    this.element.textContent = '';

    let i;
    let letter;
    for (i = 0; i < this._text.length; i++) {
      letter = document.createElement('span');
      letter.className = `TextAnimation-letter TextAnimation-letter_${this.letterStyle}`;
      letter.innerHTML = (this._text[i] === ' ') ? '&nbsp;' : this._text[i];

      this.element.appendChild(letter);
      this._letters.push(letter);
    }
  }

  addEffectForEachLetter(callback) {
    let i;
    for (i = 0; i < this._letters.length; i++) {
      this._letters[i].className = `TextAnimation-letter TextAnimation-letter_${callback(this.animations)}`;
    }
  }

  show(callback) {
    this._animationCallback = callback || false;
    this._letterTransition = this.letterTransition;
    this._animateLetters((i) => {
      this._letters[i].classList.add('TextAnimation-visible');
    });
  }

  hide(callback) {
    this._animationCallback = callback || false;
    this._letterTransition = this.letterTransition / 2;
    this._animateLetters((i) => {
      this._letters[i].classList.remove('TextAnimation-visible');
    });
  }

  _animateLetters(action, i = 0) {
    action(i);

    i++;
    if (i < this._letters.length) {
      setTimeout(() => {
        this._animateLetters(action, i);
      }, this._letterTransition);
    } else if (this._animationCallback) {
      this._animationCallback();
    }
  }
}
