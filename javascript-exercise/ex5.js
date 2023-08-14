/**
 * 5. Write a function to generate a random hexa color code.
 * Input: ()
 * Output: string
 * Ex: () => #1A7B9D
 * @returns {string} - Randomly generated hexa color code
 */
function genRandomHexaColorCode() {
  let hexadecimalString = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += hexadecimalString[Math.floor(Math.random() * 16)];
  }
  return hex;
}

console.log(genRandomHexaColorCode());
