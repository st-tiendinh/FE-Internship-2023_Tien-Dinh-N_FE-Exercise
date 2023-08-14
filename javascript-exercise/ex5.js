/* 
  5. Write a function to generate a random hexa color code.
  Input: ()
  Output: string
  Ex: () => #1A7B9D
*/

function genRandomHexaColorCode() {
  let string = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += string[Math.floor(Math.random() * 16)];
  }
  return hex;
}

console.log(genRandomHexaColorCode());
