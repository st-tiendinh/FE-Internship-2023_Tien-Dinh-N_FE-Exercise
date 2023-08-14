function countSubString(string, subString) {
  let count = 0;
  let newArray = string.toLowerCase().split(' ');
  newArray.forEach((str) => {
    if (str === subString) {
      ++count;
    }
  });
  return count;
}

console.log(countSubString('The quick brown fox jumps over the lazy dog', 'the'))
console.log(countSubString('The quick brown fox jumps over the lazy dog', 'fox'))
