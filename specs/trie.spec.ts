import {
  Trie,
  TrieKeyType,
  ArrayWithLastOfType,
  constructTrieNode,
  mergeTrieNode,
  contstructTrie,
  trieHasKey,
  trieGetValue,
  trieDeleteKey,
  traverseTrie,
  findNodefromPath
} from '../trie'; // Adjust the import path as per your project structure

describe('Trie Functions', () => {
  // Example trie for testing
  const exampleTrie: Trie<string | number, number> = {
    'a': {
      'b': {
        'c': 1,
        'd': 2,
      },
      'e': 3,
    },
    'f': 4,
    1: 5,
  };

  test('constructTrieNode constructs a trie node correctly', () => {
    const nodeArray: TrieKeyType[] = ['x', 'y', 'z'];
    const terminator: number = 10;
    const result = constructTrieNode(nodeArray, terminator);

    expect(result).toEqual({ 'x': { 'y': { 'z': 10 } } });
  });

  test('mergeTrieNode merges two trie nodes correctly', () => {
    const trie1: Trie<string | number, number> = {
      'a': {
        'b': 1,
        'c': {
          'd': 2,
        },
      },
    };

    const trie2: Trie<string | number, number> = {
      'a': {
        'b': 10,
        'c': {
          'e': 3,
        },
      },
    };

    const merged = mergeTrieNode(trie1, trie2);

    expect(merged).toEqual({
      'a': {
        'b': 10,
        'c': {
          'd': 2,
          'e': 3,
        },
      },
    });
  });

  test('contstructTrie constructs a trie from raw trie data', () => {
    const rawTrieData: Array<ArrayWithLastOfType<TrieKeyType, number>> = [
      ['a', 'b', 'c', 1],
      ['a', 'b', 'd', 2],
      ['a', 'e', 3],
      ['f', 4],
      [1, 5],
    ];

    const trie = contstructTrie(rawTrieData);

    expect(trie).toEqual(exampleTrie);
  });

  test('trieHasKey correctly checks if a key exists in the trie', () => {
    expect(trieHasKey(exampleTrie, ['a', 'b', 'c'])).toBe(true);
    expect(trieHasKey(exampleTrie, ['a', 'b', 'x'])).toBe(false);
    expect(trieHasKey(exampleTrie, [1])).toBe(true);
    expect(trieHasKey(exampleTrie, ['g'])).toBe(false);
  });

  test('trieGetValue retrieves the value associated with a key in the trie', () => {
    expect(trieGetValue(exampleTrie, ['a', 'b', 'c'])).toBe(1);
    expect(trieGetValue(exampleTrie, ['a', 'e'])).toBe(3);
    expect(trieGetValue(exampleTrie, [1])).toBe(5);
    expect(trieGetValue(exampleTrie, ['g'])).toBe(undefined);
  });

  test('trieDeleteKey deletes a key and its associated value from the trie immutably', () => {
    const originalTrie: typeof exampleTrie = { ...exampleTrie };
    const modifiedTrie = trieDeleteKey(originalTrie, ['a', 'b', 'c']);

    expect(trieHasKey(modifiedTrie, ['a', 'b', 'c'])).toBe(false);
    expect(trieGetValue(modifiedTrie, ['a', 'b', 'c'])).toBe(undefined);

    // Ensure original trie remains unchanged
    expect(trieHasKey(originalTrie, ['a', 'b', 'c'])).toBe(true);
    expect(trieGetValue(originalTrie, ['a', 'b', 'c'])).toBe(1);
  });

  test('findNodefromPath finds the node in the trie for a given path', () => {
    const pathToFind = ['a', 'b', 'c'];
    const foundNode = findNodefromPath(exampleTrie, pathToFind);
    expect(foundNode).toEqual(1);

    const nonExistentPath = ['a', 'x'];
    const nonExistentNode = findNodefromPath(exampleTrie, nonExistentPath);
    expect(nonExistentNode).toBeUndefined();
  });
});
