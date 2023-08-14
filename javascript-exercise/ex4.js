/* 4. Write a function to get a unique random array number in the specified range.
Input: (array length, min, max)
Output: new array
Ex: (4, 1, 10) => [3, 6, 1, 9] 
 */

function uniqueRandomArray(len, min, max) {
  let newArray = [];
  let count = 0;
  let isUnique = false;

  while (count < len) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    isUnique = !newArray.some((num, index) => {
      return num === randomNumber;
    });
    if (isUnique) {
      newArray.push(randomNumber);
      ++count;
      if (newArray.length == len) {
        return newArray;
      }
    }
  }
}

console.log(uniqueRandomArray(4, 1, 10));
