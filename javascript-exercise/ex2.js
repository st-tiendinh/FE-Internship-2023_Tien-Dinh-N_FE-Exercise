/**
 * 2. Write a JavaScript function to count the occurrence of a substring in a string.
 * Input: (string, substring)
 * Output: the occurrence of a substring in a string
 * Ex: ("The quick brown fox jumps over the lazy dog", 'the') => 2
 * Ex: ("The quick brown fox jumps over the lazy dog", 'fox') => 1
 * @param {string} str - Orignal string
 * @param {string} subString - Substrings to count
 * @returns {number} - Number of substrings that exist in the original string
 */
function countSubString(str, subString) {
  return str.toLowerCase().split(subString).length - 1;
}

console.log(countSubString('The quick brown fox jumps over the lazy dog', 'the'));
console.log(countSubString('The quick brown fox jumps over the lazy dog', 'fox'));
console.log(countSubString('The quick brown fox jumps over the lazy dog', 'brown fox'));
