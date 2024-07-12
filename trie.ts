export type ArrayWithLastOfType<A, B> = [...A[], B];

export type TrieKeyType = string | symbol | number;

export type Trie<T extends TrieKeyType, K> = {
  [key in T]: Trie<T, K> | K;
}

export function constructTrieNode<T extends TrieKeyType, K>(nodeArray: Array<T>, terminator: K): Trie<T, K> {
  const depth = nodeArray.length;

  if (depth === 0) {
    return { [terminator as unknown as T]: null } as Trie<T, K>;
  }
  let trie: Trie<T, K> = { [nodeArray[depth - 1]]: terminator } as Trie<T, K>;

  for (let i = depth - 2; i >= 0; i--) {
    trie = { [nodeArray[i]]: { ...trie } } as Trie<T, K>;
  }

  return trie;
}

export function mergeTrieNode<T extends TrieKeyType, K>(trie1: Trie<T, K>, trie2: Trie<T, K>): Trie<T, K> {
  let mergedTrie = { ...trie1 };

  for (const key in trie2) {
    if (trie2.hasOwnProperty(key)) {
      if (
        typeof mergedTrie[key] === 'object' &&
        typeof trie2[key] === 'object' &&
        !Array.isArray(mergedTrie[key]) &&
        !Array.isArray(trie2[key])
      ) {
        mergedTrie[key] = mergeTrieNode(mergedTrie[key] as Trie<T, K>, trie2[key] as Trie<T, K>);
      } else {
        mergedTrie[key] = trie2[key];
      }
    }
  }

  return mergedTrie;
}

export function contstructTrie<T extends TrieKeyType, K>(rawTrieData: Array<ArrayWithLastOfType<T, K>>): Trie<T, K> {
  let trie = {} as Trie<T, K>;
  for (let arr of rawTrieData) {
    const depth = arr.length;
    const terminator = arr[depth - 1] as K;
    const nodeArray = arr.slice(0, depth - 1) as Array<T>;

    trie = mergeTrieNode(trie, constructTrieNode(nodeArray, terminator));
  }

  return trie;
}

export function trieHasKey<T extends TrieKeyType, K>(trie: Trie<T, K>, key: T[]): boolean {
  let current: any = trie;
  for (const k of key) {
    if (current[k] === undefined) {
      return false;
    }
    current = current[k];
  }
  return true;
}

export function trieGetValue<T extends TrieKeyType, K>(trie: Trie<T, K>, key: T[]): K | undefined {
  let current: any = { ...trie };
  for (const k of key) {
    if (current[k] === undefined) {
      return undefined;
    }
    current = current[k];
  }
  return current as K;
}

export function trieDeleteKey<T extends TrieKeyType, K>(trie: Trie<T, K>, key: Array<T>): Trie<T, K> {
  if (key.length === 0) {
    return { ...trie };
  }

  let current: any = { ...trie };
  let parent: any = null;
  let currentKey: T | undefined = undefined;

  for (const k of key) {
    if (current[k] === undefined) {
      return { ...trie };
    }
    parent = current;
    currentKey = k;
    current = current[k];
  }

  if (parent && currentKey !== undefined) {
    const updatedParent = { ...parent };
    delete updatedParent[currentKey];
    return updatedParent;
  }

  return { ...trie }; 
}

export function traverseTrie<T extends TrieKeyType, K>(original_trie: Trie<T, K>, callback: (key: T[], value: K | Trie<T, K>) => void, key: T[] = []): void {
  const trie = { ...original_trie };

  for (const k in trie) {
    if (trie.hasOwnProperty(k)) {
      const newKey = [...key, k as T];
      const value = trie[k];
      callback(newKey, value);
      if (typeof value === 'object' && !Array.isArray(value)) {
        traverseTrie(value as Trie<T, K>, callback, newKey);
      }
    }
  }
}

export function findNodefromPath<T extends TrieKeyType, K>(trie: Trie<T, K>, path: Array<T>): Trie<T, K> | undefined {
  let current: any = { ...trie };
  for (const key of path) {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }
  return current as Trie<T, K>;
}
