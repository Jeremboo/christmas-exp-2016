import props from './props'

class HUD {
  constructor( candies ) {
    this.el = document.getElementById( 'hud' )

    this.candies = {}
    for( const candy of candies ) {
      const container = document.createElement( 'div' )
      container.id = candy.category
      container.classList.add( 'counter' )
      container.classList.add( candy.category )
      this.el.appendChild( container )

      const entry = {
        category: candy.category,
        found: 0,
        total: candy.positions.length
      }
      this.candies[candy.category] = entry
    }

    this.checkFoundCandies()
  }

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

  checkEndGame() {
    let endGame = true

    for( const key in this.candies ) {
      if( this.candies[key].found < this.candies[key].total ) {
        endGame = false
        break
      }
    }

    if( endGame ) {
      console.log( 'YAS ! Good job mate' )
    }
  }
}

const hud = new HUD( props.candies )
export default hud
