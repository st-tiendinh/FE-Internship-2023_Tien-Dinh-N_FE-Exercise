/**
 * 1. Write a JavaScript function to repeat a string a specified times. 
 * Input: (string, repeat times) 
 * Output: the new string Ex: ("FE", 4) => 'FEFEFEFE'
 * @param {string} str - String needs to be repeated
 * @param {number} repeatTime - Number of repetitions
 * @returns {string} - String has been repeated
 */
function repeatString(str, repeatTime) {
  return str.repeat(repeatTime);
}

console.log(repeatString('FE', 4));
