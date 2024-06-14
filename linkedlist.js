class Node {
    constructor(value, next) {
        this._value = value;
        this._next = next;
    }

    toString() {
        return "Value: " + this._value; 
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
    }

    append(value) {
        const node = new Node(value, null);
        if(this._head === null && this._tail === null) {
            this._head = node;
            this._tail = node;
            return;
        }
        this._tail._next = node;
        this._tail = this._tail._next;
    }

    prepend(value) {
        let newRoot = new Node(value, this._head);
        if(this._head === null && this._tail === null) {
            this._head = newRoot;
            this._tail = newRoot;
            return;
        }
        this._head = newRoot;
    }

    size() {
        let size = 0;
        let curr = this._head;

        while(curr !== null) {
            size++;
            curr = curr._next;
        }

        return size;
    }

    head() {
        return this._head;
    }

    tail() {
        return this._tail;
    }

    at(index) {
        let currIndex = 0;
        let curr = this._head;
        while(currIndex !== index && curr !== null) {
            currIndex++;
            curr = curr._next;
        }

        if(currIndex !== index || curr === null) {
            return null;
        } else {
            return curr;
        }
    }

    pop() {
        let curr = this._head;
        while(curr !== null && curr._next !== this._tail) {
            curr = curr._next;
        }

        this._tail = curr;
        this._tail._next = null;
    }

    contains(value) {
        let curr = this._head;
        while(curr !== null && curr._value !== value) {
            curr = curr._next;
        }

        if(curr === null) {
            return false;
        } else {
            return true;
        }
    }

    find(value) {
        let curr = this._head;
        let index = 0;

        while(curr !== null && curr._value !== value) {
            index++;
            curr = curr._next;
        }

        if(curr === null) {
            return "Not Found";
        } else {
            return index;
        }
    }

    toString() {
        let curr = this._head;
        let listString = "";

        while(curr !== this._tail) {
            listString += curr._value + " -> ";
            curr = curr._next;
        }
        listString += curr._value;
        console.log(listString);
    }

}

let list = new LinkedList();

list.append(5);
list.append(6);
list.prepend(7);
list.toString();
console.log("List size: " + list.size());
console.log("List Head: " + list.head());
console.log("List Tail: " + list.tail());
console.log(list.at(0));
list.pop();
list.toString();
console.log(list.contains(0));
console.log(list.find(5));