function showSalary(users, age) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.age <= age) {
      result.push(`${user.name}, ${user.balance}`) 
      
    } 
  } 
  let result2 = result.join("\n");
  return result2;
}
