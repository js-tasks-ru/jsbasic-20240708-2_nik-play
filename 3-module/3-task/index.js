function camelize(str) {
/** я не понял как надо было представить массив 
символов, поэтому решение получилось такое громоздкое */ 
let arr = str.split('');
arr.forEach(function(item, index) {
if ((item === "-")) {
  arr.splice(index, 1);
  arr[index] = arr[index].toUpperCase();
}
});
let string = arr.join('');
  return string;
}
