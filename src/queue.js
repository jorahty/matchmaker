export default class Queue {
  constructor() {
    this.items = [];
  }

  get length() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.#render();
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index === -1) return;
    this.items.splice(index, 1);
    this.#render();
  }

  clear() {
    const items = this.items.splice(0, this.items.length);
    this.#render();
    return items;
  }

  #render() {
    console.log(`[${this.items.map(() => '*').join()}]`);
  }
}
