import props from './props'
import { loadAssetsFromProps } from './loaderManager';

import soundPlayer from './sounds';
import TextAnim from './textAnim';
import { TweenMax } from 'gsap';

class HUD {
  constructor(candies) {
    this.callbackEndGame = f => f;

    this.hud = document.getElementById('hud')
    this.loader = document.getElementById('loader')
    this.progress = document.getElementById('progress')
    this.sound = document.getElementById('sound')
    this.loaderTitle = document.getElementById('loader-title')
    this.logo = document.getElementById('logo')
    this.tuto = document.getElementById('tuto')
    this.success = document.getElementById('success')

    this.candies = {}
    this.mutted = false;
    for (const candy of candies) {
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

    this.sound.addEventListener('click', this.toggleSound.bind(this));
    this.hideLogo = this.hideLogo.bind(this);
  }

  /**
   * LOADER
   **/
  updateLoader(percent) {
    this.progress.style.width = `${percent}%`;
  }

  load(callback) {
    this._titleAnimation = new TextAnim(this.loaderTitle, 50, 'top');
    setTimeout(() => {
      this.updateLoader(10);
      loadAssetsFromProps({
        onProgress: (status) => {
          this.updateLoader(80 * status);
        },
        onComplete: () => {
          this.updateLoader(100);
          if (!this.mutted) soundPlayer.soundBackground.play();

          TweenMax.to(this.loader, 0.3, {
            autoAlpha: 0.0,
            onComplete: () => {
              const ok = document.getElementById('ok');
              setTimeout(() => {
                this.logo.classList.add('play');
                TweenMax.staggerFromTo(document.getElementsByClassName('header-sentence'), 0.5,
                  { autoAlpha: 0, y: 5 },
                  { autoAlpha: 1, y: 0, delay: -0.6 },
                  0.2,
                  () => {
                    ok.classList.add('ok-visible');
                    ok.addEventListener('click', () => {
                      ok.disable = true;
                      ok.classList.remove('ok-visible');
                      this.hideHeader(callback);
                    });
                  }
                );
              }, 500);
            },
          });
        },
      })
    }, 200);
  }

  hideHeader(callback) {
    TweenMax.staggerFromTo(document.getElementsByClassName('header-sentence'), 0.5,
      { autoAlpha: 1, y: 0, delay: 0.8 },
      { autoAlpha: 0, y: 5 },
      -0.2,
      () => {
        callback();
      }
    );

    setTimeout(() => {
      this.hideLogo();
    }, 400);

    setTimeout(() => {
      tuto.classList.add('play');
    }, 1500);
  }

  /**
   * GAME
   **/
  startGame(callbackEndGame) {
    this.callbackEndGame = callbackEndGame;
    this.showHUD();
  }

  endGame() {
    console.log('YAS ! Good job mate');
    if (!this.mutted) soundPlayer.soundFinal.play();
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
   * SOUND
   **/
  toggleSound() {
    this.mutted = !this.mutted;
    if (this.mutted) {
      soundPlayer.soundBackground.pause();
      this.sound.classList.remove('play');
    } else {
      soundPlayer.soundBackground.play();
      this.sound.classList.add('play');
    }
  }

  /**
   * CANDY
   **/
  showHUD() {
    const candyDivs = document.querySelectorAll('.counter');

    TweenMax.to(this.sound, 0.3, { autoAlpha: 1.0, delay: 4.6 });

    TweenMax.staggerFromTo(candyDivs, 0.3,
    { autoAlpha: 0.0, x: -10 },
    { autoAlpha: 1.0, x: 0, delay: 4.0 }, 0.2);
  }

  hideLogo() {
    this.logo.classList.add('reverse');

    // TweenMax.to(this.tuto, 0.3,
    // { autoAlpha: 0.0 });
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
    this.checkFoundCandies();

    if(!this.mutted) {
      soundPlayer.candyFound.play();
      if(this.candies[category].found === 3) {
        soundPlayer.counterFill.play();
      }
    }
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
