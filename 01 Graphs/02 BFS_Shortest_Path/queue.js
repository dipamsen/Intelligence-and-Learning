class Queue extends Array {
  enqueue(element) {
    this.push(element);
  }
  dequeue() {
    return this.shift();
  }
}