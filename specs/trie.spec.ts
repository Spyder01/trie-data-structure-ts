import {
  constructTrieNode,
  mergeTrieNode,
  contstructTrie,
  trieHasKey,
  trieGetValue,
  trieDeleteKey,
  traverseTrie,
  TrieKeyType,
  ArrayWithLastOfType,
  Trie
} from '../trie';

describe('Trie Operations', () => {
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

  // Existing tests omitted for brevity

  test('constructTrieNode handles empty nodeArray', () => {
    const result = constructTrieNode([], 10);
    expect(result).toEqual({ 10: null });
  });

  test('mergeTrieNode handles empty trie1', () => {
    const trie2: Trie<string | number, number> = {
      'a': {
        'b': 10,
      },
    };
    const merged = mergeTrieNode({}, trie2);
    expect(merged).toEqual(trie2);
  });

  test('trieDeleteKey handles non-existent key', () => {
    let trie: Trie<string | number, number> = { ...exampleTrie };
    trieDeleteKey(trie, ['x', 'y', 'z']);
    expect(trie).toEqual(exampleTrie);
  });

  test('traverseTrie handles empty trie', () => {
    const emptyTrie: Trie<string | number, number> = {};
    const callback = jest.fn();
    traverseTrie(emptyTrie, callback);
    expect(callback).not.toHaveBeenCalled();
  });
});

