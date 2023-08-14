/* 
  6. Write a function that calculates the sum of the ordered elements that are divisible 
  by a specified number in the array.
  Input: (array, number)
  Output: number
  Ex: ([1, 2, 3, 4, 5, 6, 7], 2) => 12
  2 4 6

  Ex: ([1, 2, 3, 4, 5, 6, 7], 3) => 9
  3 6
  
*/

function sumOfOrderedElement(array, number) {
  let result = array.filter((num) => {
    return num % number === 0;
  });
  return result.reduce((acc, cur) => acc + cur);
}

console.log(sumOfOrderedElement([1, 2, 3, 4, 5, 6, 7], 2));
console.log(sumOfOrderedElement([1, 2, 3, 4, 5, 6, 7], 3));
