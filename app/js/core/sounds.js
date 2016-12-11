import props from './props'
import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.candyFound = new Howl({
      src: ['assets/sounds/candy_found.mp3'],
      volume: 0.5,
      onend: () => {},
    });
    this.counterFill = new Howl({
      src: ['assets/sounds/counter_fill.mp3'],
      volume: 0.6,
      onend: () => {},
    });
    this.soundBackground = new Howl({
      src: ['assets/sounds/filuanddina_winter_ride.mp3'],
      volume: 1,
      loop: true,
      onend: () => {},
    });
    this.soundFinal = new Howl({
      src: ['assets/sounds/sound_final.mp3'],
      volume: 0.9,
      onend: () => {},
    });
  }
}

const sound = new SoundManager( props.candies )
export default sound
