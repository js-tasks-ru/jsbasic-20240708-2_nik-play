function sumSalary(salaries) {
  let x = 0;
  for (let key in salaries) {
  if (typeof salaries[key] === "number" && isFinite(salaries[key]) == true) {
    x += salaries[key]
  } 
  }
  return x;
}
