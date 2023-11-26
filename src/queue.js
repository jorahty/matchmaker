import { port, playersPerMatch } from './server.js';

class Queue {
  constructor() {
    this.items = [];
  }

  get length() {
    return this.items.length;
  }

  #render() {
    process.stdout.write('\x1Bc');
    console.log(`Listening on *:${port}`);
    console.log('\n\x1b[1m%s\x1b[0m', 'Queue', `(${this.items.length}/${playersPerMatch})\n`);
    this.items.forEach((item, index) => {
      const colorIndex = item.id.charCodeAt(0) % 7;
      const formatString = `%s \x1b[3${colorIndex}m%s\x1b[0m`;
      console.log(formatString, `${index + 1}`, `${item.id}`);
    });
  }

  push(item) {
    this.items.push(item);
    this.#render();
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.#render();
  }

  clear() {
    this.items.length = 0;
    this.#render();
  }
}

const queue = new Queue();

export default queue;
