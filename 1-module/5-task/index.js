function truncate(str, maxlength) {
  let text = str, newstr;
  if (str.length > maxlength) {
    text = str.slice(0, --maxlength);
    newstr = text + "…";
    return newstr ;
  } else  return text;
}