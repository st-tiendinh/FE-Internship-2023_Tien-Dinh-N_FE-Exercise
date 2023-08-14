/* 
  8. Write a function to find the new time after a specified time from the given time.
  Input: (givenTime string, period number(s))
  Output: newTime string
  Ex: ('12:30:29', 600) => '12:40:29'
  Ex: ('23:30:29', 6000) => '01:10:29'
*/

function findNewTime(timeStr, period) {
  let timeArray = timeStr.split(':');
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1]);
  let seconds = parseInt(timeArray[2]);

  let newSec = seconds + period;
  let newMin = minutes + Math.floor(newSec / 60);
  let newHr = hours + Math.floor(newMin / 60);

  newSec = newSec % 60;
  newMin = newMin % 60;
  newHr = newHr % 24;

  let MinResult = newMin < 10 ? `0${newMin}` : `${newMin}`;
  let hourResult = newHr < 10 ? `0${newHr}` : `${newHr}`;
  let secResult = newSec < 10 ? `0${newSec}` : `${newSec}`;

  return `${hourResult}:${MinResult}:${secResult}`;
}

console.log(findNewTime('12:30:29', 600));
console.log(findNewTime('23:30:29', 6000));
