import props from './props'
import { loadAssetsFromProps } from './loaderManager';
import soundPlayer from './sounds';
import TextAnim from './textAnim';

class HUD {
  constructor( candies ) {
    this.callbackEndGame = f => f;

    this.hud = document.getElementById( 'hud' )
    this.progress = document.getElementById( 'progress' )
    this.sound = document.getElementById( 'sound' )
    this.loaderTitle = document.getElementById( 'loader-title' )

    this._titleAnimation = new TextAnim(this.loaderTitle, 50, 'top');
    this._titleAnimation.show();

    this.candies = {}
    this.mutted = false;
    for ( const candy of candies ) {
      const container = document.createElement( 'div' )
      container.id = candy.category
      container.classList.add( 'counter' )
      container.classList.add( candy.category )
      this.hud.appendChild( container )

      const entry = {
        category: candy.category,
        found: 0,
        total: candy.positions.length
      }
      this.candies[candy.category] = entry
    }

    this.checkFoundCandies()

    this.sound.addEventListener('click', this.toggleSound.bind(this));
  }

  /**
   * LOADER
   **/
  updateLoader(purcent) {
    this.progress.style.width = `${purcent}%`;
  }

  load( callback ) {
    // TODO show loader
    this.updateLoader(10);
    console.log('... Loading');

    loadAssetsFromProps({
      onProgress: ( status ) => {
        this.updateLoader(80 * status);
      },
      onComplete: () => {
        this.updateLoader(100);
        callback();
      },
    })
  }

  /**
   * GAME
   **/
  startGame(callbackEndGame) {
    this.callbackEndGame = callbackEndGame;
    if (!this.mutted) soundPlayer.soundBackground.play();
  }

  endGame() {
    console.log( 'YAS ! Good job mate' );
    if (!this.mutted) soundPlayer.soundFinal.play();
    this.callbackEndGame();
  }

  checkEndGame() {
    let endGame = true

    for( const key in this.candies ) {
      if( this.candies[key].found < this.candies[key].total ) {
        endGame = false
        break
      }
    }

    if( endGame ) this.endGame();
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
  foundCandy( category ) {
    this.candies[category].found++
    this.checkFoundCandies();
    console.log(this.candies[category].found)

    if(!this.mutted) {
      soundPlayer.candyFound.play();
      if(this.candies[category].found === 3) {
        soundPlayer.counterFill.play();
      }
    }
  }

  checkFoundCandies() {
    for( const key in this.candies ) {
      const counter = document.getElementById( key )
      counter.innerHTML = Math.min( this.candies[key].found, this.candies[key].total )  + ' / ' + this.candies[key].total
    }

    this.checkEndGame()
  }
}

const hud = new HUD( props.candies )
export default hud
