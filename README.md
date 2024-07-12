# Trie Data Structure Library

This TypeScript library provides a trie (prefix tree) implementation with various operations for efficient data storage and retrieval.

## Installation

Install the library using npm:

```bash
npm install trie
```

## Usage

### Importing

```typescript
import {
  constructTrieNode,
  mergeTrieNode,
  contstructTrie,
  trieHasKey,
  trieGetValue,
  trieDeleteKey,
  traverseTrie,
  type TrieKeyType,
  type ArrayWithLastOfType,
  type Trie,
} from "trie";
```

### Types

#### `TrieKeyType`

Represents the type of keys that can be used in the trie (`string`, `number`, or `symbol`).

#### `ArrayWithLastOfType<A, B>`

A utility type for arrays where the last element has a specific type.

#### `Trie<T extends TrieKeyType, K>`

The trie data structure type, where `T` represents the type of keys and `K` represents the type of values stored in the trie.

### Functions

#### `constructTrieNode(nodeArray: Array<T>, terminator: K): Trie<T, K>`

Constructs a trie node from an array of keys ending with a terminator value.

#### `mergeTrieNode(trie1: Trie<T, K>, trie2: Trie<T, K>): Trie<T, K>`

Merges two trie nodes into a single trie node.

#### `contstructTrie(rawTrieData: Array<ArrayWithLastOfType<T, K>>): Trie<T, K>`

Constructs a trie from raw data represented as an array of arrays, where each inner array ends with a terminator value.

#### `trieHasKey(trie: Trie<T, K>, key: T[]): boolean`

Checks if a key exists in the trie.

#### `trieGetValue(trie: Trie<T, K>, key: T[]): K | undefined`

Retrieves the value associated with a key in the trie.

#### `trieDeleteKey(trie: Trie<T, K>, key: T[]): void`

Deletes a key and its associated value from the trie.

#### `traverseTrie(trie: Trie<T, K>, callback: (key: T[], value: K | Trie<T, K>) => void, key: T[] = []): void`

Traverses the trie and invokes a callback function for each node, passing the current key path and node value.

### Examples

#### Example 1: Constructing and Using a Trie

```typescript
// Constructing a trie node
const nodeArray = ["x", "y", "z"];
const terminator = 10;
const result = constructTrieNode(nodeArray, terminator);
console.log(result);
// Output: { 'x': { 'y': { 'z': 10 } } }

// Merging two trie nodes
const trie1: Trie<string | number, number> = { a: { b: 1 } };
const trie2: Trie<string | number, number> = { a: { c: 2 } };
const merged = mergeTrieNode(trie1, trie2);
console.log(merged);
// Output: { 'a': { 'b': 1, 'c': 2 } }

// Constructing a trie from raw data
const rawTrieData: Array<ArrayWithLastOfType<TrieKeyType, number>> = [
  ["a", "b", "c", 1],
  ["a", "b", "d", 2],
  ["a", "e", 3],
  ["f", 4],
  [1, 5],
];
const trie = contstructTrie(rawTrieData);
console.log(trie);
// Output: {
//   'a': {
//     'b': {
//       'c': 1,
//       'd': 2,
//     },
//     'e': 3,
//   },
//   'f': 4,
//   1: 5,
// }

// Checking if a key exists in the trie
console.log(trieHasKey(trie, ["a", "b", "c"])); // true
console.log(trieHasKey(trie, ["a", "b", "x"])); // false
console.log(trieHasKey(trie, [1])); // true
console.log(trieHasKey(trie, ["g"])); // false

// Retrieving a value from the trie
console.log(trieGetValue(trie, ["a", "b", "c"])); // 1
console.log(trieGetValue(trie, ["a", "e"])); // 3
console.log(trieGetValue(trie, [1])); // 5
console.log(trieGetValue(trie, ["g"])); // undefined

// Deleting a key from the trie
trieDeleteKey(trie, ["a", "b", "c"]);
console.log(trieHasKey(trie, ["a", "b", "c"])); // false
console.log(trieGetValue(trie, ["a", "b", "c"])); // undefined

// Traversing the trie
const keys: string[] = [];
const values: number[] = [];
traverseTrie(trie, (key, value) => {
  keys.push(key.join("."));
  values.push(value as number);
});
console.log(keys); // Output: ['a.b.d', 'a.e', 'f', '1']
console.log(values); // Output: [2, 3, 4, 5]
```

## Performance Considerations

The trie data structure provides efficient operations for storing and retrieving data, especially useful for scenarios requiring prefix-based searches or hierarchical data organization. However, like any data structure, performance can vary based on implementation details and usage patterns.

## License

This library is licensed under the MIT License. See the LICENSE file for more details.

## Contributions.
Contributions are welcome! Please fork the repository and submit a pull request.