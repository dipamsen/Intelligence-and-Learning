
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
  // helper method that calls the  
  // removeNode with a given data 
  remove(data) {
    // root is re-initialized with 
    // root of a modified tree. 
    this.root = this.removeNode(this.root, data);
  }

  // Method to remove node with a  
  // given data 
  // it recur over the tree to find the 
  // data and removes it 
  removeNode(node, key) {

    // if the root is null then tree is  
    // empty 
    if (node === null)
      return null;

    // if data to be delete is less than  
    // roots data then move to left subtree 
    else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // if data to be delete is greater than  
    // roots data then move to right subtree 
    else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is similar to the root's data  
    // then delete this node 
    else {
      // deleting node with no children 
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children 
      if (node.left === null) {
        node = node.right;
        return node;
      }

      else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children 
      // minumum node of the rigt subtree 
      // is stored in aux 
      var aux = this.findMinNode(node.right);
      node.value = aux.value;

      node.right = this.removeNode(node.right, aux.value);
      return node;
    }

  }
  findMinNode(node) {
    if (node.left === null)
      return node;
    else
      return this.findMinNode(node.left);
  }
  traverse(type) {
    if (type == "inorder") this.root.inOrder();
  }
  display() {
    translate(xSpace / 2, ySpace);
    xSpace /= 2;
    if (this.root) this.root.show();
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
    if (this.green) fill('lightgreen');
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