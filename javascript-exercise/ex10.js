/**
 * 10. Cho biết kết quả in ra của đoạn code sau.
*/
console.log('stack [1]'); // Đoạn 4 sẽ vào stack đầu tiên và thực thi đầu tiên
setTimeout(function A() {
  console.log('macro [2]');
}, 0); // Đoạn 5, 6, 7 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask)
setTimeout(function B() {
  console.log('macro [3]');
}, 0); // Đoạn 8, 9, 10 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask) sau đoạn 5, 6, 7
const p = Promise.resolve();
// Đoạn 13 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (microTask) và thực thi trước 2 cái setTimeout đoạn 5 và 8 phía trên
p.then(function C() {
  // Đoạn 15 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask) thực thi trước 2 macroTask đoạn 5, 6, 7, 8, 9, 10
  setTimeout(function D() {
    // Đoạn 17 sẽ đưa vào stack và thực thi sau đoạn 26
    console.log('macro [4]');
    // Đoạn 19, 20, 21 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask) thực thi sau đoạn 22, 23, 24
    setTimeout(function E() {
      console.log('macro [5]');
    });
    // Đoạn 23, 24, 25, 26 là microTask nên thực thi trước đoạn 19, 20, 21 (macroTask)
    p.then(function F() {
      console.log('micro [6]'); 
    });
  }, 0);
  console.log('micro [7]'); // Đoạn 26 sẽ vào stack nên thực thi trước đoạn 15
});

// Sau khi thực thi xong p.then() thì đoạn 5, 6, 7, 8, 9, 10 sẽ tiếp tục thực thi
console.log('stack [8]'); // Đoạn 31 sẽ thực thi sau đoạn 1

/* 
Thứ tự thực thi
stack [1]
stack [8]
micro [7]
macro [2]
macro [3]
macro [4]
micro [6]
macro [5] 
*/
