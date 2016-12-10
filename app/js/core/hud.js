import props from './props'
import { loadAssetsFromProps } from './loaderManager';

class HUD {
  constructor( candies ) {
    this.callbackEndGame = f => f;

    this.hud = document.getElementById( 'hud' )
    this.loader = document.getElementById( 'loader' )

    this.candies = {}
    for( const candy of candies ) {
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
  }

  /**
   * LOADER
   **/
  updateLoader(purcent) {
    this.loader.innerHTML = purcent;
  }

  load( callback ) {
    // TODO show loader
    this.updateLoader(10);
    console.log('... Loading');

    loadAssetsFromProps({
      onProgress: ( status ) => {
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
    // TODO hide loader
  }

  endGame() {
    console.log( 'YAS ! Good job mate' )
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
   * CANDY
   **/
  foundCandy( category ) {
    this.candies[category].found++
    this.checkFoundCandies()
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
