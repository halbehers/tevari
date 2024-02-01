export type Tree<T> = T & {
  children?: Tree<T>[];
};

export type TreeComparator<T> = (a: T, b: T) => number;

export const treePush = <T>(
  tree: Tree<T>,
  at: Tree<T>,
  children: Tree<T>[],
  comparator: TreeComparator<T>
) => {
  if (comparator(tree, at) === 0) {
    tree.children = children;
    return;
  }
  if (!tree.children) return;

  for (const child of tree.children) {
    treePush(child, at, children, comparator);
  }
};

const treeDoGenerateFromArray = <T extends { parent?: T }>(
  from: T,
  tree: Tree<T>,
  array: T[],
  comparator: TreeComparator<T>
) => {
  const children = array.filter((element) =>
    element.parent ? comparator(from, element.parent) === 0 : false
  );

  treePush(tree, from, children, comparator);

  for (const child of children) {
    treeDoGenerateFromArray(child, tree, array, comparator);
  }
};

export const treeFromArray = <T extends { parent?: T }>(
  array: T[],
  comparator: TreeComparator<T>
) => {
  const root = array.find(({ parent }) => !parent);

  if (!root) return;

  const tree: Tree<T> = root;
  treeDoGenerateFromArray(root, tree, array, comparator);

  return tree;
};

export const treeTruncate = <T>(
  tree: Tree<T>,
  from: T,
  comparator: TreeComparator<T>
): Tree<T> | undefined => {
  if (comparator(tree, from) === 0) {
    return tree;
  }

  if (tree.children) {
    for (const child of tree.children) {
      const match = treeTruncate(child, from, comparator);
      if (match) return match;
    }
  }
};

const treeDoGenerateArray = <T extends { parent?: T }>(
  node: T,
  array: T[],
  comparator: TreeComparator<T>
) => {
  array.push(node);
  if (!node.parent) return;

  treeDoGenerateArray(node.parent, array, comparator);
};

export const treeGetAncestorsTrail = <T extends { parent?: T }>(
  node: T,
  comparator: TreeComparator<T>
) => {
  const array: T[] = [];
  treeDoGenerateArray(node, array, comparator);
  return array.reverse();
};

export const TreeHelpers = {
  push: treePush,
  fromArray: treeFromArray,
  truncate: treeTruncate,
  getAncestorsTrail: treeGetAncestorsTrail,
};

const Trees = {
  helper: TreeHelpers,
};

export default Trees;
