const head = Symbol('head');

class CircularDoublyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this[head] = null;
  }

  add(data) {
    let newNode = new CircularDoublyLinkedListNode(data);

    if (this[head] === null) {
      this[head] = newNode;
      newNode.next = newNode;
      newNode.previous = newNode;
    } else {
      const tail = this[head].previous;
      tail.next = newNode;
      newNode.previous = tail;
      newNode.next = this[head];
      this[head].previous = newNode;
    }
  }

  insertBefore(data, index) {
    const newNode = new CircularDoublyLinkedListNode(data);

    if (this[head] === null) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    if (index === 0) {
      const tail = this[head].previous;
      tail.next = newNode;
      newNode.previous = tail;
      newNode.next = this[head];
      this[head].previous = newNode;
      this[head] = newNode;
    } else {
      let current = this[head],
        previous = null;

      let i = 0;

      while (current.next !== this[head] && i < index) {
        previous = current;
        current = current.next;
        i++;
      }

      if (i < index) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
      }

      previous.next = newNode;
      newNode.previous = previous;

      newNode.next = current;
      current.previous = newNode;
    }
  }

  insertAfter(data, index) {
    const newNode = new CircularDoublyLinkedListNode(data);

    if (this[head] === null) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    let current = this[head];

    if (index > 0) {
      let i = 0;

      do {
        current = current.next;
        i++;
      } while (current !== this[head] && i < index);

      if (i < index) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
      }
    }

    newNode.next = current.next;
    current.next.previous = newNode;

    current.next = newNode;
    newNode.previous = current;
  }

  get(index) {
    if (index > -1 && this[head] !== null) {
      let current = this[head];
      let i = 0;

      do {
        if (i === index) {
          return current.data;
        }
        current = current.next;

        i++;
      } while (current !== this[head] && i <= index);
    }

    return undefined;
  }

  indexOf(data) {
    if (this[head] === null) {
      return -1;
    }
    let current = this[head];
    let index = 0;
    do {
      if (current.data === data) {
        return index;
      }
      current = current.next;

      index++;
    } while (current !== this[head]);

    return -1;
  }

  remove(index) {
    if (this[head] === null || index < 0) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    let current = this[head];
    if (index === 0) {
      if (current.next === this[head]) {
        this[head] = null;
      } else {
        const tail = this[head].previous;

        tail.next = current.next;
        current.next.previous = tail;

        this[head] = tail.next;
      }

      return current.data;
    }

    let i = 0;

    do {
      current = current.next;
      i++;
    } while (current !== this[head] && i < index);

    if (current !== this[head]) {
      current.previous.next = current.next;
      current.next.previous = current.previous;
      return current.data;
    }

    throw new RangeError(`Index ${index} does not exist in the list.`);
  }

  clear() {
    this[head] = null;
  }

  get size() {
    if (this[head] === null) {
      return 0;
    }
    let current = this[head];

    let count = 0;

    do {
      count++;
      current = current.next;
    } while (current !== this[head]);

    return count;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  *values() {
    if (this[head] !== null) {
      if (this[head].next === this[head]) {
        yield this[head].data;
      } else {
        let current = this[head];

        do {
          yield current.data;
          current = current.next;
        } while (current !== this[head]);
      }
    }
  }

  uniqueValues() {
    let arr = [];
    if (this[head] === null) {
      throw new Error('No node is present');
    }
    for (let ele of this) {
      if (!arr.includes(ele)) {
        arr.push(ele);
      }
    }

    return arr;
  }

  toString() {
    return [...this].toString();
  }
}

exports.CircularDoublyLinkedList = CircularDoublyLinkedList;

let val1 = new CircularDoublyLinkedList();
val1.add(1);
val1.add(20);
val1.add(10);
val1.add(10);

console.log(val1.size);
console.log(val1.uniqueValues());
