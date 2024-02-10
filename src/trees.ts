/**
 * A Tree type.
 */
export type Tree<T> = T & {
  children?: Tree<T>[];
};

/**
 * Type for a tree node comparator.
 */
export type TreeComparator<T> = (a: T, b: T) => number;

/**
 * Adds a new elements into the tree at the given node.
 *
 * @param tree The tree to add the new element into.
 * @param at The node in the tree where to add the new element.
 * @param children The element to add.
 * @param comparator The tree node comparator.
 */
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

/**
 * Creates a tree structure from the given array.
 *
 * @param array The array to create the tree from.
 * @param comparator The tree nodes comparator.
 * @returns the result tree.
 */
export const treeFromArray = <T extends { parent?: T }>(
  array: T[],
  comparator: TreeComparator<T>
): Tree<T> | undefined => {
  const root = array.find(({ parent }) => !parent);

  if (!root) return;

  const tree: Tree<T> = root;
  treeDoGenerateFromArray(root, tree, array, comparator);

  return tree;
};

/**
 * Truncates the given tree from the given node.
 *
 * @param tree The tree to truncate.
 * @param from The node to truncate the tree from.
 * @param comparator The tree nodes comparator.
 * @returns the truncated tree.
 */
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

/**
 * Gets an array containing all the ancestors of the given node in an ascending order.
 *
 * @param node The node from which to extract the ancestor trail.
 * @param comparator The tree nodes comparator.
 * @returns an array containing all the ancestors of the given node in an ascending order.
 */
export const treeGetAncestorsTrail = <T extends { parent?: T }>(
  node: T,
  comparator: TreeComparator<T>
): T[] => {
  const array: T[] = [];
  treeDoGenerateArray(node, array, comparator);
  return array.reverse();
};

export const TreeHelpers = {
  /**
   * Adds a new elements into the tree at the given node.
   *
   * @param tree The tree to add the new element into.
   * @param at The node in the tree where to add the new element.
   * @param children The element to add.
   * @param comparator The tree node comparator.
   */
  push: treePush,
  /**
   * Creates a tree structure from the given array.
   *
   * @param array The array to create the tree from.
   * @param comparator The tree nodes comparator.
   * @returns the result tree.
   */
  fromArray: treeFromArray,
  /**
   * Truncates the given tree from the given node.
   *
   * @param tree The tree to truncate.
   * @param from The node to truncate the tree from.
   * @param comparator The tree nodes comparator.
   * @returns the truncated tree.
   */
  truncate: treeTruncate,
  /**
   * Gets an array containing all the ancestors of the given node in an ascending order.
   *
   * @param node The node from which to extract the ancestor trail.
   * @param comparator The tree nodes comparator.
   * @returns an array containing all the ancestors of the given node in an ascending order.
   */
  getAncestorsTrail: treeGetAncestorsTrail,
};

export const Trees = {
  /**
   * Tree helper methods.
   */
  helper: TreeHelpers,
};
