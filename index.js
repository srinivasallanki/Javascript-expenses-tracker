// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

const ewalletFom = document.querySelector('#ewallet-form');

// date format change function
function addredDated() {
  const now = new Date().toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const date = now.split(',')[0].split(' ')
  const time = now.split(',')[1]
  return `${date[1]} ${date[0]}${time}`
}





ewalletFom.addEventListener('submit', ewalletFunction, false);

function ewalletFunction(e) {
  e.preventDefault();
  const time = addredDated()
  const type = document.querySelector('.add__type').value
  const desc = document.querySelector('.add__description').value
  const value = document.querySelector('.add__value').value
  if (desc.length > 0 && value.length > 0) {
    document.querySelector('#error').style.display = "none";
    addExpenses(type, desc, value, time)
  } else {
    document.querySelector('#error').style.display = "block";

  }
}

// showItems
showItems();
function showItems() {
  let items = JSON.parse(localStorage.getItem('items'))
  console.log(items)
  const collection = document.querySelector('.collection')

  items.map((item) => {
    const newExpensesItemHtml = `<div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${item.desc}</p>
            </div>
            <div class="item-time">
              <p>${item.time}</p>
            </div>
          </div>
          <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
            <p>${item.type} $${item.value}</p>
          </div>
        </div>`;
    collection.insertAdjacentHTML('afterbegin', newExpensesItemHtml)
    showTotoalCost();
  })


}

// Add Item
function addExpenses(type, desc, value, time) {
  const newExpensesItemHtml = `<div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${desc}</p>
            </div>
            <div class="item-time">
              <p>${time}</p>
            </div>
          </div>
          <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
            <p>${type} $${value}</p>
          </div>
        </div>`

  const collection = document.querySelector('.collection')
  collection.insertAdjacentHTML('afterbegin', newExpensesItemHtml)
  addItemToLS(type, desc, value, time);
  showTotoalCost();
  ewalletFormReset();
}

// Form Reset
function ewalletFormReset() {
  document.querySelector('.add__type').value = '+'
  document.querySelector('.add__description').value = ''
  document.querySelector('.add__value').value = ''
}

// getItemsFromLS
function getItemsFromLS() {
  let items = localStorage.getItem('items')
  if (items) {
    items = JSON.parse(items)
  } else {
    items = []
  }
  return items;
}

//addItemToLS
function addItemToLS(type, desc, value, time) {
  let items = getItemsFromLS()
  items.push({ type, desc, value, time })
  localStorage.setItem('items', JSON.stringify(items))
}

//showTotoalCost
showTotoalCost();
function showTotoalCost() {
  let items = JSON.parse(localStorage.getItem('items'))
  console.log(items)
  let income = 0;
  let expense = 0;

  for (let item of items) {
    if (item.type === '+') {
      income = income += parseInt(item.value);
    } else {
      expense = expense += parseInt(item.value);
    }
  }
  let total = income - expense
  document.querySelector('.income__amount p').innerHTML = income
  document.querySelector('.expense__amount p').innerHTML = expense
 let totalblance = document.querySelector('.balance__amount').innerHTML = total
  if (totalblance<100){

  }
  document.querySelector('header ').className = totalblance < 100 ? 'red' : 'green'



}