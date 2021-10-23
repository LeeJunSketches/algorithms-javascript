import BinarySearchTree from "./BinarySearchTree";

const valuesToAdd = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6];
const inOrderValues: number[] = [];
const preOrderValues: number[] = [];
const postOrderValues: number[] = [];

const tree = new BinarySearchTree();
valuesToAdd.forEach(i => tree.insert(i));

// Walking through
// tree.inOrderTraverse((value: number) => inOrderValues.push(value))
// tree.preOrderTraverse((value: number) => preOrderValues.push(value))
// tree.postOrderTraverse((value: number) => postOrderValues.push(value))

// console.log({ inOrderValues, preOrderValues, postOrderValues });


// Searching
const min = tree.min();
const max = tree.max();

const found = valuesToAdd.every(i => tree.search(i));

console.log({ min, max, found })