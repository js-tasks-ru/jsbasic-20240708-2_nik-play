function factorial(n) {
  let d = n , sum = 1;
  if (n === 0 || n === 1) {
      return 1;
  } else {
  for (sum; sum != n; ++sum){
  d *= sum;
  } 
  }
  return d;
}