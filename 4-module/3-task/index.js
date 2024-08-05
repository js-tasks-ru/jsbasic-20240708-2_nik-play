function highlight(table) {
  for (let row of table.rows) {
      let statusCell = row.cells[3], ageCell = row.cells[1], genderCell = row.cells[2]

     if (statusCell.dataset.available == 'true') {
       row.classList.add('available')
     } else if (statusCell.dataset.available == 'false') {
      row.classList.add('unavailable')
    } else {
      row.hidden = true
      // забыл про Ваш совет...
    }
    if (genderCell.textContent == 'm') {
      row.classList.add('male')
    } else if (genderCell.textContent == 'f') {
      row.classList.add('female')
    }
    if (ageCell.textContent < 18) {
      row.style="text-decoration: line-through"
  }
}

}