function getMinMax(str) {
    let arr = str.split(' '), result = {}, arr1 = [], num;
    arr.forEach(function(item) {
     num = parseFloat(item)
   if (isFinite(num)) { 
   arr1.push(num)
   }
    });
    result.max = ( Math.max(...arr1));
    result.min = ( Math.min(...arr1));
      return result;
}
