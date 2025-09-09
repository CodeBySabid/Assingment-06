 1) What is the difference between var, let, and const?
Ans:
     var: The same variable can be declared repeatedly and the value can be changed.
let: Once declared, the variable cannot be declared a second time, but the value can be changed.
const: Once declared, the variable cannot be declared a second time, and the value cannot be changed.

 2) What is the difference between map(), forEach(), and filter()? 
 Ans:
      map() → Creates a new array from an array and each element is changed in some way.
forEach() → Runs a loop over each element of the array and returns each element separately. But does not return the array.
filter() → Creates a new array with only these elements if the condition matches the element in the array.

 3) What are arrow functions in ES6?
 Ans:
      Arrow functions are a shortcut for writing functions. They are shorter and easier to read than writing a normal function.
Normal function
function add(a, b) {
return a + b;
}
and Arrow function
const addArrow = (a, b) => a + b;
Both functions will work the same.

 4) How does destructuring assignment work in ES6?
 Ans:
      Destructuring: A shortcut to extract individual values ​​from an array or object. In the case of an array, values ​​can be extracted according to a specific index. In the case of an object, values ​​can be extracted by property name.

 5) Explain template literals in ES6. How are they different from string concatenation?
 Ans:
      Template literal is a modern way of writing strings which is written with backtick (`). It can be easily inserted into a variable or expression string using ${}. There is no problem in writing a multi-line string.  
