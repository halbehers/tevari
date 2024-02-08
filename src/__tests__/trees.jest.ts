import {
  Tree,
  TreeComparator,
  treeFromArray,
  treeGetAncestorsTrail,
  treeTruncate,
} from "../trees";

interface TreeNode {
  id: number;
  name: string;
  parent?: TreeNode;
}

const sampleComparator: TreeComparator<TreeNode> = (a, b) => a.id - b.id;

describe("Tree Helper Methods", () => {
  let sampleTree: Tree<TreeNode>;

  beforeEach(() => {
    const sampleArray: TreeNode[] = [
      { id: 1, name: "Root" },
      { id: 2, name: "Child 1", parent: { id: 1, name: "Root" } },
      { id: 3, name: "Child 2", parent: { id: 1, name: "Root" } },
      { id: 4, name: "Grandchild 1", parent: { id: 2, name: "Child 1" } },
    ];
    sampleTree = treeFromArray(sampleArray, sampleComparator) as Tree<TreeNode>;
  });

  test("treeFromArray should correctly create a tree from an array", () => {
    expect(sampleTree).toBeDefined();
    expect(sampleTree.children).toHaveLength(2);
    expect(sampleTree.children![0].name).toBe("Child 1");
    expect(sampleTree.children![1].name).toBe("Child 2");
    expect(sampleTree.children![0].children).toBeDefined();
    expect(sampleTree.children![0].children![0].name).toBe("Grandchild 1");
  });

  test("treeGetAncestorsTrail should correctly return ancestors trail", () => {
    const node = {
      id: 4,
      name: "Grandchild 1",
      parent: { id: 2, name: "Child 1" },
    };
    const ancestors = treeGetAncestorsTrail(node, sampleComparator);
    expect(ancestors.length).toBe(2);
    expect(ancestors[0].name).toBe("Child 1");
    expect(ancestors[1].name).toBe("Grandchild 1");
  });

  test("treeTruncate should correctly truncate the tree from a given node", () => {
    const nodeToTruncate = {
      id: 2,
      name: "Child 1",
      parent: { id: 1, name: "Root" },
    };
    const truncatedTree = treeTruncate(
      sampleTree,
      nodeToTruncate,
      sampleComparator
    );
    expect(truncatedTree).toBeDefined();
    expect(truncatedTree!.children).toHaveLength(1);
    expect(truncatedTree!.children![0].name).toBe("Grandchild 1");
  });
});
