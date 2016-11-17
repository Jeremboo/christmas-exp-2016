import domready from 'domready'
import Engine from './core/engine'

domready( () => {
  console.log( '[DOM] - DOM is ready' )

  const container = document.getElementById( 'experiment' )
  const experiment = new Engine( container )
} )
