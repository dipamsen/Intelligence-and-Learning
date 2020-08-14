
class Tree {
  constructor() {
    this.root = null;
  }
  addNode(val) {
    let node = new Node(val);
    if (this.root == null) {
      this.root = node;
    } else {
      this.root.addNode(node);
    }
  }
  traverse(type) {
    if (type == "inorder") this.root.inOrder();
  }
  display() {
    translate(xSpace / 2, ySpace);
    xSpace /= 2;
    if(this.root) this.root.show();
  }
  
}

class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.value = val;
  }
  inOrder(arr) {
    if (this.left) this.left.inOrder(arr);
    arr.push(this.value);
    if (this.right) this.right.inOrder(arr);
  }
  unColor() {
    if (this.left) this.left.unColor();
    this.green = null;
    if (this.right) this.right.unColor();
  }
  search(val) {
    
    if (this.value == val) {
      return this;
    }
    if (this.left && val < this.value) {
      return this.left.search(val);
    }
    if (this.right && val > this.value) {
      return this.right.search(val);
    }
    return false;
  }
  addNode(node) {
    if (node.value < this.value) {
      // go to left
      if (this.left == null) {
        this.left = node;
      } else {
        this.left.addNode(node);
      }
    } else if (node.value > this.value) {
      // go to right
      if (this.right == null) {
        this.right = node;
      } else {
        this.right.addNode(node);
      }
    }
  }
  show() {
    fill(200);
    strokeWeight(2);
    stroke(255);
    if(this.green) fill('lightgreen');
    ellipse(0, 0, 30)
    noStroke();
    fill(0);
    text(this.value, 0, 0);
    if (this.left) {
      push();
      stroke(255);
      line(-8, 13, -xSpace / 2 + 5, ySpace - 15)
      translate(-xSpace / 2, ySpace);
      xSpace /= 2
      this.left.show();
      xSpace *= 2
      pop();
    }
    if (this.right) {
      push();
      stroke(255);
      line(8, 13, xSpace / 2 - 5, ySpace - 15)
      translate(xSpace / 2, ySpace);
      xSpace /= 2
      this.right.show();
      xSpace *= 2
      pop();
    }
  }
}