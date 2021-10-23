export default class Node {
    public left: Node | null;
    public right: Node | null;

    constructor(public key: number) {
        this.left = null;
        this.right = null;
    }
}