export const COLOURS = ['red', 'green', 'blue', 'yellow'];

export const EMPTY_COLOUR = 'gray';

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export default Block;
