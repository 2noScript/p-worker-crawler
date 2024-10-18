

let a="dsdsdsdsds"

let code = `
globalThis.greet = function(name) {
    return a
}`;



// Sử dụng eval để tạo hàm trong phạm vi toàn cục
eval(code);

// Gọi hàm greet sau khi eval đã thực thi
console.log(greet("Alice")); // Output: Hello, Alice