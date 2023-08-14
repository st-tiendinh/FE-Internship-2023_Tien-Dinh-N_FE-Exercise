function repeatString(string, repeatTime) {
  let result = string;
  for (let i = 0; i < repeatTime; i++) {
    result += string;
  }
  return result;
}

console.log(repeatString('FE', 4));
