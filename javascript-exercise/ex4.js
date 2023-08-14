/* 4. Write a function to get a unique random array number in the specified range.
Input: (array length, min, max)
Output: new array
Ex: (4, 1, 10) => [3, 6, 1, 9] 
 */

function uniqueRandomArray(len, min, max) {
  let newArray = [];

  while (newArray.length !== len) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    let isUnique = !newArray.some((num, index) => {
      return num === randomNumber;
    });
    if (isUnique) {
      newArray.push(randomNumber);
    }
  }
  return newArray;
}

console.log(uniqueRandomArray(4, 1, 10));
