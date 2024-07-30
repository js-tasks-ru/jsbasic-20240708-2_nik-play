function makeFriendsList(friends) {
  let fullName = friends.map(x => x.firstName + " " + x.lastName);
  let ul = document.createElement("ul");
  ul.classList.add('friends');
  document.body.append(ul);
  for (let friend of friends) {
    ul.insertAdjacentHTML ('beforeEnd', `<li class="friend">${fullName}</li>`);
}
return ul
}