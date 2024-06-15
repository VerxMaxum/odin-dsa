class HashMap {
    constructor() {
        this.capacity = 16;
        this.size = 0;
        this.bucket = new Array(this.capacity);
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 43;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        if(this.size >= this.loadFactor * this.capacity) {
            resize();
        }

        const index = this.hash(key) % this.bucket.length;
        this.bucket[index] = {key:key, value:value};
    }

    get(key) {
        const index = this.hash(key) % this.bucket.length;
        console.log(this.bucket[index].key);
        if(this.bucket[index] === null || this.bucket[index] === undefined ||
            this.bucket[index].key !== key
        ) {
            return null;
        }
        return this.bucket[index].value;
    }

    has(key) {
        const index = this.hash(key) % this.bucket.length;
        if(this.bucket[index] !== null && this.bucket[index].key === key) {
            return true
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key) % this.bucket.length;
        if(this.bucket[index] !== null) {
            this.bucket[index] = null;
            return true;
        }

        return false;
    }

    length() {
        return this.bucket.filter(e => e !== null).length;
    }

    clear() {
        this.capacity = 16;
        this.bucket = new Array(this.capacity);
    }

    keys() {
        return this.bucket.filter(e => e !== null).map(e => e.key);
    }

    values() {
        return this.bucket.filter(e => e !== null).map(e => e.value);
    }

    entries() {
        return this.bucket.filter(e => e !== null).map(e => [e.key, e.value]);
    }

    resize() {
        this.capacity *= 2;
        const temp = this.bucket;
        this.bucket = new Array(this.capacity);
        temp.forEach(e => {
            this.set(e.key, e.value);
        })
    }
}

let hm = new HashMap();

hm.set("lily", "this is lily");
hm.set("lily", "this is robin");
console.log(hm.entries());
console.log(hm.get("robin"));
console.log(hm.has("lily"));
hm.remove("lily");
console.log(hm.entries());
hm.set("cyborg", "this is cyborg");
console.log(hm.entries());
console.log(hm.length());
hm.clear();
console.log(hm.entries());
hm.set("spidey", "Spiderman");
hm.set("venom", "eddie");
hm.set("ironman", "tony");
console.log(hm.keys());
console.log(hm.values());