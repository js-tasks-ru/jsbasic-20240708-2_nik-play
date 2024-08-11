/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table")
    this.createThead();
    this.createTbody();
    this.createBt();
  }

  createThead() {
    let tHead = document.createElement("thead")
    let tr = document.createElement('tr')
    for (let row in this.rows[0]) {
      let th = document.createElement('th')
      for (let key in row) {
      th.textContent = row;
      tr.appendChild(th)
      }
      tHead.appendChild(tr)
  }
  this.elem.appendChild(tHead)
   }

  createTbody() {
    let tBody = document.createElement("tbody")
    for (let row of this.rows) {
      let tr = document.createElement("tr");
    for (let key in row) {
      let td = document.createElement('td')
      td.textContent = row[key];
      tr.appendChild(td)
     }
     tBody.appendChild(tr)
    }
    this.elem.appendChild(tBody)
    }

   createBt() {
    let trs = this.elem.querySelectorAll('tbody > tr'); 
    for (let tr of trs) {
      let td = document.createElement('td')
      let button = document.createElement('button')
      button.textContent = "X"
      button.addEventListener('click', () => {
        tr.remove();
      })
      td.appendChild(button)
      tr.appendChild(td)
    }
    }

  

}

