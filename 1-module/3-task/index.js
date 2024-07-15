function ucFirst(str) {
  let d = str;
  if (d.length == 0) {
    return d;
  } 
  if (d.length == 1) {
    d = (d.toUpperCase())
    return d;
  } 
  if (d.length > 1) { 
    d = (str[0].toUpperCase())
    str = str.replace(str[0], '')
    return d + str;
  }
}
