/**
 * 6. Write a function that calculates the sum of the ordered elements that are divisible 
 * by a specified number in the array.
 * Input: (array, number)
 * Output: number
 * Ex: ([1, 2, 3, 4, 5, 6, 7], 2) => 12
 * Ex: ([1, 2, 3, 4, 5, 6, 7], 3) => 9
 * @param {array} array - Original array
 * @param {number} number - The number is divisible
 * @returns {number} - Sum of the ordered elements that are divisible by a specified number in the array
 */
function sumOfOrderedElement(array, number) {
  return array.reduce((sum, current) => {
    return current % number === 0 ? sum + current : sum;
  }, 0);
}

console.log(sumOfOrderedElement([1, 2, 3, 4, 5, 6, 7], 2));
console.log(sumOfOrderedElement([1, 2, 3, 4, 5, 6, 7], 3));
