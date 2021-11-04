import Node from './Node';

enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}

type TraverseCallback = (key: number) => void;

const defaultCompareFn = (a: number, b: number): number => {
    if (a < b) return Compare.LESS_THAN;
    if (a > b) return Compare.BIGGER_THAN;
    return Compare.EQUALS;
}


export default class BinarySearchTree {
    private root: Node | null;
    private compareFn: (a: number, b: number) => number;

    constructor(compareFn = defaultCompareFn) {
        this.compareFn = compareFn;
        this.root = null;
    }

    min() {
        return this.minNode(this.root as Node);
    }

    private minNode(node: Node): Node {
        if (!node.left) {
            return node;
        }
        return this.minNode(node.left)
    }

    max() {
        return this.maxNode(this.root as Node);
    }

    private maxNode(node: Node): Node {
        if (!node.right) {
            return node;
        }
        return this.maxNode(node.right)
    }

    insert(key: number) {
        if (!this.root) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    private insertNode(node: Node, key: number) {
        const comparison = this.compareFn(key, node.key);
        const sideToAdd = comparison === Compare.LESS_THAN ? 'left' :  'right';
        const nodeFilled = node[sideToAdd];

        if (!nodeFilled) {
            if(comparison !== Compare.EQUALS) node[sideToAdd] = new Node(key);
        } else {
            this.insertNode(nodeFilled, key)
        }
    }

    inOrderTraverse(callback: TraverseCallback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    private inOrderTraverseNode(node: Node | null, callback: TraverseCallback) {
        if (node) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    preOrderTraverse(callback: TraverseCallback) {
        this.preOrderTraverseNode(this.root, callback);
    }

    private preOrderTraverseNode(node: Node | null, callback: TraverseCallback) {
        if (node) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    postOrderTraverse(callback: TraverseCallback) {
        this.postOrderTraverseNode(this.root, callback);
    }

    private postOrderTraverseNode(node: Node | null, callback: TraverseCallback) {
        if (node) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key);
        }
    }

    search(key: number): Boolean {
        return this.searchNode(this.root as Node, key);
    }

    private searchNode(node: Node, key: number): Boolean {
        if (!node) return false
        if (node.key === key) return true;

        const side = this.compareFn(key, node.key) === Compare.LESS_THAN ? 'left' : 'right';

        const nextNode = node[side];

        return nextNode ? this.searchNode(nextNode, key) : false;
    }

    remove(key: number): void {
        this.root = this.removeNode(this.root, key);
    }

    private removeNode(node: Node | null, key: number): Node | null {
        if (!node) return null;
        const comparison = this.compareFn(key, node.key);

        if (comparison === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (comparison === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            } else if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            const rightSide = node.right;
            const replacement = this.minNode(rightSide)
            node.right = this.removeNode(rightSide, replacement.key);
            node.key = replacement.key;
            return node;
        }


    }
}
