export function filterUniqueByObjectId<T extends { objectID: string }>(
  array: T[]
): T[] {
  const objectIdSet = new Set<string>();

  return array.filter((item) => {
    if (!objectIdSet.has(item.objectID)) {
      objectIdSet.add(item.objectID);
      return true;
    }
    return false;
  });
}
