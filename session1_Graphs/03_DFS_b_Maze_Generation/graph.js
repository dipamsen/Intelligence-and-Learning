
/** Vertex Class */
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.top = true;
    this.bottom = true;
    this.right = true;
    this.left = true;
    this.neighbours = [];
  }
  display(col) {
    let x = this.x * span;
    let y = this.y * span;
    noStroke()
    if (col) fill(col);
    else if (this.visited) fill(255);
    else fill(51)
    rect(x, y, span)
    stroke(0);
    strokeWeight(4);
    if (this.top) line(x, y, x + span, y);
    if (this.right) line(x + span, y, x + span, y + span);
    if (this.bottom) line(x, y + span, x + span, y + span);
    if (this.left) line(x, y, x, y + span);
  }

  getNeighbours() {
    let neighbours = [];
    if (this.y > 0) {
      let top = maze[this.y - 1][this.x]
      neighbours.push(top);
    }
    if (this.y < rows - 1) {
      let bottom = maze[this.y + 1][this.x]
      neighbours.push(bottom);
    }
    if (this.x > 0) {
      let left = maze[this.y][this.x - 1]
      neighbours.push(left);
    }
    if (this.x < cols - 1) {
      let right = maze[this.y][this.x + 1]
      neighbours.push(right);
    }
    this.neighbours = neighbours;
  }


  getRandomUnvisited() {
    let unvisited = this.neighbours.filter(cell => !cell.visited);
    return random(unvisited)
  }

  static removeWall(c1, c2) {
    if (c1.x == c2.x) {
      if (c1.y > c2.y) {
        c1.top = false;
        c2.bottom = false;
      } else if (c1.y < c2.y) {
        c1.bottom = false;
        c2.top = false;
      }
    } else if (c1.y == c2.y) {
      if (c1.x > c2.x) {
        c1.left = false;
        c2.right = false;
      } else if (c1.x < c2.x) {
        c1.right = false;
        c2.left = false;
      }
    }
  }
}
