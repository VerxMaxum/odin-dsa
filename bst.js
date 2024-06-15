class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    toString() {
        return this.value;
    }
}

class BinarySearchTree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) { // assume sorted
        const mid = parseInt(array.length / 2);
        const node = new Node(array[mid]);

        if(array.length === 0) {
            return null;
        }
        if(mid === 0) {
            return node;
        }

        node.left = this.buildTree(array.slice(0,mid));
        node.right = this.buildTree(array.slice(mid+1));

        return node;
    }

    insert(value) {
        let root = this.root;
        let parent = null;
        while(root !== null) {
            parent = root;
            if(root.value < value) {
                root = root.right;
            } else if(root.value > value) {
                root = root.left;
            }
        }
        
        root = new Node(value);

        if(value > parent.value) {
            parent.right = root;
        } else {
            parent.left = root;
        }
    }
    
    delete(value) {
        const root = this.root;
        while(root !== null || root !== undefined) {
            if(root.value === value) {
                this.processDelete(root);
            }
            if(root.value < value) {
                root = root.right;
            } else if(root.value > value) {
                root = root.left;
            }
        }
    }

    processDelete(node) {
        if(this.isLeaf(node)) {
            node = null;
        } else if(hasTwoChildren(node)) {
            const nextHighest = this.getNextHighest(node.right);
            this.delete(nextHighest.value);
            node.value = nextHighest.value;
        } else {
            const parent = this.findParent(node.value);
            if(parent.left.value === node.value) {
                if(node.left !== null) {
                    parent.left = node.left;
                } else {
                    parent.left = node.right;
                }
            } else {
                if(node.left !== null) {
                    parent.right = node.left;
                } else {
                    parent.right = node.right;
                }
            }
        }
    }

    findParent(value, root = this.root) {
        while(root !== null) {
            if(root.left.value === value || root.right.value === value) {
                return root;
            }
            if(value > root.value) {
                return this.findParent(root.right);
            }
            return this.findParent(root.left);
        }
    }

    isLeaf(node) {
        return node.left === null && node.right === null;
    }

    hasTwoChildren(node) {
        return node.left !== null && node.right !== null;
    }

    getNextHighest(start) {
        if(start.left === null && start.right !== null) {

        }
        if(start.left === null) {
            const copy = start;
            start = null;
            return copy;
        }

        return this.getNextHighest(start.left);
    }

    find(value, root = this.root) {
        if(root.value === value) {
            return root;
        }
        
        if(value > root.value) {
            return this.find(value, root.right);
        }
        return this.find(value, root.left);
    }
    
    levelOrder() {
        let queue = [];
        let order = "";
        queue.push(this.root);
        while(queue.length !== 0) {
            let node = queue.shift();
            order = order.concat(node.value + " ");
            
            if(node.left !== null) {
                queue.push(node.left);
            }
            if(node.right !== null) {
                queue.push(node.right);
            }
        }

        return order;
    }

    preOrder(start = this.root) {
        if(start !== null) {
            console.log(start.value);
            this.preOrder(start.left);
            this.preOrder(start.right);
        }
    }

    inOrder(start = this.root) {
        if(start !== null) {
            this.inOrder(start.left);
            console.log(start.value);
            this.inOrder(start.right);
        }
    }

    postOrder(start = this.root) {
        if(start !== null) {
            this.postOrder(start.left);
            this.postOrder(start.right);
            console.log(start.value);
        }
    }

    height(node = this.root, height = 0) {
        if(node === null) return height;
        return Math.max(this.height(node.left, height+1), this.height(node.right, height+1))
    }

    depth(root = this.root, depth = -1) {
        if(root === null) return depth;
        return Math.max(this.depth(root.left, depth+1), this.depth(root.right, depth+1));
    }

    isBalanced(start = this.root, depth = 0) {
        return Math.abs(this.depth(start.left) - this.depth(start.right)) < 2;
    }

    rebalance() {
        const newArr = this.levelOrder().split(" ")
        .filter(e => e !== '')
        .map(e => parseInt(e))
        .sort((e1, e2) => e1 - e2);
        
        this.root = this.buildTree(newArr);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// let bst = new BinarySearchTree([1,2,3,4,5]);
let bst = new BinarySearchTree([1,4,7,10,13])
console.log(bst.levelOrder());
console.log(bst.root);

console.log("Preorder");
bst.preOrder();
console.log("Inorder");
bst.inOrder();
console.log("Postorder");
bst.postOrder();
console.log("Height: " + bst.height(bst.root));
console.log("Depth: " + bst.depth());
// bst.insert(10);
// bst.insert(11);
// bst.insert(12);

bst.insert(11);
bst.insert(12);
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.rebalance();
prettyPrint(bst.root);