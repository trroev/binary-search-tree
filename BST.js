class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    let middle = parseInt(sortedArray.length / 2);
    let root = new Node(sortedArray[middle]);

    root.left = this.buildTree(sortedArray.slice(0, middle));
    root.right = this.buildTree(sortedArray.slice(middle + 1));

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) {
      return (root = new Node(value));
    }
    root.data < value
      ? (root.right = this.insert(value, root.right))
      : (root.left = this.insert(value, root.left));
    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.data = this.#minValue(root.right);
      root.right = this.delete(root.right, root.data);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (root.data !== value) {
      return root.data < value
        ? this.find(value, root.right)
        : this.find(value, root.left);
    }
    return root;
  }

  // breadth first traversal
  levelOrder(callback) {
    if (!this.root) return [];
    const queue = [this.root];
    const result = [];
    while (queue.length) {
      let level = [];
      let len = queue.length;
      for (let i = 0; i < len; i++) {
        const node = queue.shift();
        level.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node);
      }
      result.push(level);
    }
    if (!callback) return result;
  }

  // depth first traversals
  // left, root, right
  inorder(node = this.root, callback, inorderList = []) {
    if (node === null) return [];

    this.inorder(node.left, callback, inorderList);
    callback ? callback(node) : inorderList.push(node.data);
    this.inorder(node.right, callback, inorderList);

    if (inorderList.length > 0) return inorderList;
  }

  // root, left, right
  preorder(node = this.root, callback, preorderList = []) {
    if (node === null) return [];

    callback ? callback(node) : preorderList.push(node.data);
    this.preorder(node.left, callback, preorderList);
    this.preorder(node.right, callback, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  // left, right, root
  postorder(node = this.root, callback, postorderList = []) {
    if (node === null) return [];

    this.postorder(node.left, callback, postorderList);
    this.postorder(node.right, callback, postorderList);
    callback ? callback(node) : postorderList.push(node.data);

    if (postorderList.length > 0) return postorderList;
  }

  height(node = this.root) {
    if (node === null) return -1;

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(value, node = this.root, level = 0) {
    if (!value) return null;
    if (node === null) return 0;
    if (node.data === value.data) return level;
    let count = this.depth(value, node.left, level + 1);
    if (count !== 0) return count;
    return this.depth(value, node.right, level + 1);
  }

  isBalanced(root = this.root) {
    if (root === null) return false;

    let left = root.left;
    let right = root.right;

    if (Math.abs(this.height(left) - this.height(right)) > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    let reBalanced = [...new Set(this.inorder().sort((a, b) => a - b))];
    this.root = this.buildTree(reBalanced);
  }

  #minValue(root = this.root) {
    if (!root.left) {
      return root.data;
    } else {
      return this.#minValue(root.left);
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

module.exports = Tree;
