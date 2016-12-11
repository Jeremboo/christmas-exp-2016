import props from './props'
import { loadAssetsFromProps } from './loaderManager';
import { TweenMax } from 'gsap';

class HUD {
  constructor(candies) {
    this.callbackEndGame = f => f;

    this.hud = document.getElementById('hud')
    this.loader = document.getElementById('loader')
    this.logo = document.getElementById('logo')
    this.tuto = document.getElementById('tuto')
    this.success = document.getElementById('success')

    this.candies = {}
    for(const candy of candies) {
      const container = document.createElement('div')
      container.id = candy.category
      container.classList.add('counter')
      container.classList.add(candy.category)
      this.hud.appendChild(container)

      const entry = {
        category: candy.category,
        found: 0,
        total: candy.positions.length
      }
      this.candies[candy.category] = entry
    }

    this.checkFoundCandies()

    this.hideLogo = this.hideLogo.bind(this);
  }

  /**
   * LOADER
   **/
  updateLoader(percent) {
    this.loader.innerHTML = percent;
  }

  load(callback) {
    // TODO show loader
    this.updateLoader(10);
    console.log('... Loading');

    loadAssetsFromProps({
      onProgress: (status) => {
        console.log(status);
        this.updateLoader(80 * status);
      },
      onComplete: () => {
        this.updateLoader(80);
        callback();
      },
    })
  }

  /**
   * GAME
   **/
  startGame(callbackEndGame) {
    console.log('startGame');

    this.callbackEndGame = callbackEndGame;
    this.updateLoader(100);

    TweenMax.to(this.loader, 0.3,
    { autoAlpha: 0.0 });

    this.showHUD();
  }

  endGame() {
    console.log('YAS ! Good job mate');
    this.callbackEndGame(this.showSuccess());
  }

  checkEndGame() {
    let endGame = true;

    for(const key in this.candies) {
      if(this.candies[key].found < this.candies[key].total) {
        endGame = false;
        break;
      }
    }

    if(endGame) this.endGame();
  }

  /**
   * CANDY
   **/
  showHUD() {
    const candyDivs = document.querySelectorAll('.counter');

    TweenMax.staggerFromTo(candyDivs, 0.3,
    { autoAlpha: 0.0, x: -10 },
    { autoAlpha: 1.0, x: 0, delay: 4.0 }, 0.2);

    this.logo.classList.add('play');

    setTimeout(() => {
      this.tuto.classList.add('play');
    }, 1000);
  }

  hideLogo() {
    TweenMax.to(this.logo, 0.3,
    { autoAlpha: 0.0 });

    TweenMax.to(this.tuto, 0.3,
    { autoAlpha: 0.0 });
  }

  showSuccess() {
    TweenMax.set(this.success,
    { autoAlpha: 1.0 });

    setTimeout(() => {
      this.success.classList.add('play');
    }, 2000)
  }

  foundCandy(category) {
    this.candies[category].found++
    this.checkFoundCandies()
  }

  checkFoundCandies() {
    for(const key in this.candies) {
      const counter = document.getElementById(key)
      counter.innerHTML = Math.min(this.candies[key].found, this.candies[key].total)  + ' / ' + this.candies[key].total
    }

    this.checkEndGame()
  }
}

const hud = new HUD(props.candies)
export default hud
