/**
 * 10. Cho biết kết quả in ra của đoạn code sau.
*/
console.log('stack [1]'); // Đoạn 1 sẽ vào stack đầu tiên và thực thi đầu tiên
setTimeout(function A() {
  console.log('macro [2]');
}, 0); // Đoạn 2, 3, 4 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask)
setTimeout(function B() {
  console.log('macro [3]');
}, 0); // Đoạn 5, 6, 7 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (macroTask) sau đoạn 2, 3, 4
const p = Promise.resolve();
p.then(function C() {
  // Đoạn 9 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (microTask) và thực thi trước 2 cái setTimeout đoạn 2 và 5 phía trên
  // Đoạn 11 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (microTask) thực thi trước 2 macroTask đoạn 2, 3, 4, 5, 6, 7
  setTimeout(function D() {
    // Đoạn 13 sẽ đưa vào callback và thực thi sau đoạn 23
    console.log('macro [4]');
    setTimeout(function E() {
      // Đoạn 14, 15, 16 sẽ đưa cho webApis xử lý để đưa vào CallbackQueue (microTask) thực thi sau đoạn 17, 18, 19
      console.log('macro [5]');
    });
    p.then(function F() {
      console.log('micro [6]'); // Đoạn 17, 18, 19, 20 là microTask nên thực thi trước đoạn 14, 15, 16 (macroTask)
    });
  }, 0);
  console.log('micro [7]'); // Đoạn 21 sẽ vào callback nên thực thi trước đoạn 11
});

// Sau khi thực thi xong p.then() thì đoạn 2, 3, 4, 5, 6, 7 sẽ tiếp tục thực thi
console.log('stack [8]'); // Đoạn 25 sẽ thực thi sau đoạn 1

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
