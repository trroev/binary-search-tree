// driver script

const Tree = require("./BST");

const randomArr = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArr(18));

console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.insert(333);
tree.insert(334);
tree.insert(335);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.prettyPrint();
