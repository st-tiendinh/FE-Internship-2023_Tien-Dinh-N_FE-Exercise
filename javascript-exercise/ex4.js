/**
 * 4. Write a function to get a unique random array number in the specified range.
 * Input: (array length, min, max)
 * Output: new array
 * Ex: (4, 1, 10) => [3, 6, 1, 9] 
 * @param {number} len - Array length
 * @param {number} min - Min threshold
 * @param {number} max - Max threshold
 * @returns {array} - Unique random array
 */
function uniqueRandomArray(len, min, max) {
  let newArray = [];
  if (max - min <= len) {
    return newArray;
  }
  while (newArray.length !== len) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (!newArray.includes(randomNumber)) {
      newArray.push(randomNumber);
    }
  }
  return newArray;
}

console.log(uniqueRandomArray(4, 6, 10));
