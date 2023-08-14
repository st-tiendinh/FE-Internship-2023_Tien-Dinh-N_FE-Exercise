function truncate(string, number) {
  let newArray = string.split(' ');
  return newArray.splice(0, number).join(' ');
}

console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
