/**
 * 3. Write a JavaScript function to truncate a string to a certain number of words.
 * Input: (string, number)
 * Output: new string
 * Ex: ('The quick brown fox jumps over the lazy dog', 4) => "The quick brown fox"
 * @param {string} str - Original string
 * @param {number} number - Number of words
 * @returns 
 */
function truncate(str, number) {
  return str.split(' ').splice(0, number).join(' ');
}

console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
