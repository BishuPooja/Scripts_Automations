const nestedArray = [1, [2, 3, [4, 5]], 6, [7, 8, [9, 10, [11, 12]]]];
const flattenedArray = nestedArray.flat(Infinity);
console.log(flattenedArray);
