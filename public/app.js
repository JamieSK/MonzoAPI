let transactionsString;
let transactions;
let balanceSeries;
let categorySeries;
let map;
let currentBalance = 0;

let plotCategoryChart = function() {
  let container = document.getElementById('pie-chart');
  new PieChart(container, 'Categories', categorySeries);
};

let plotBalanceGraph = function() {
  let container = document.getElementById('line-graph');
  new LineGraph(container, 'Balance', 'Balance', balanceSeries);
};

let removeUnderscores = function() {
  for (cat of categorySeries[0].data) {
    cat.name = cat.name.replace(/_/, ' ');
  }
};

let capitaliseCategories = function() {
  for (cat of categorySeries[0].data) {
    let capitalisedName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
    cat.name = capitalisedName;
  }
};

let prettifyCategoryNames = function() {
  capitaliseCategories();
  removeUnderscores();
};

let populateCategorySeries = function(transaction) {
  if (transaction.amount >= 0) return;
  if (!categorySeries) {
    categorySeries = [{
      name: 'Categories',
      colorByPoint: true,
      data: [],
    }];
  }
  let found = false;
  for (categoryObject of categorySeries[0].data) {
    if (categoryObject.name === transaction.category) {
      found = true;
      categoryObject.y -= transaction.amount;
      break;
    }
  }
  if (!found) {
    categorySeries[0].data.push({
      name: transaction.category,
      y: -transaction.amount,
    });
  }
};

let populateBalanceSeries = function(transaction) {
  if (!balanceSeries) {
    balanceSeries = [
      {name: 'Balance', data: []},
      {name: 'Spend', data: []},
    ];
  }
  currentBalance += transaction.amount;
  balanceSeries[0].data.push(currentBalance / 100);
  balanceSeries[1].data.push(transaction.amount / 100);
};

let addTransactionToMap = function(transaction) {
  if (transaction.merchant) {
    let lat = transaction.merchant.address.latitude;
    let lng = transaction.merchant.address.longitude;
    let centre = {lat: lat, lng: lng};
    let label = transaction.merchant.emoji;
    let info = transaction.merchant.name;
    map.addMarker(centre, label, info);
  }
};

let parseData = function() {
  transactions = JSON.parse(transactionsString).transactions;
  transactions.forEach((transaction) => {
    populateBalanceSeries(transaction);
    populateCategorySeries(transaction);
    addTransactionToMap(transaction);
  });
  prettifyCategoryNames();
  plotBalanceGraph();
  plotCategoryChart();
};

let fetchMap = function() {
  let container = document.getElementById('map');
  let location = {lat: 55.8570633, lng: -4.2440243};
  map = new MapWrapper(container, location, 13);
  map.whereAmI();
};

let response = function(event) {
  transactionsString = event.target.responseText;
  parseData();
};

let listTransactions = function() {
  let request = new XMLHttpRequest();
  let url = 'https://api.monzo.com/transactions' +
  `?expand[]=merchant&account_id=${current_account_id}`;
  request.open('GET', url);
  request.setRequestHeader('Authorization', 'Bearer ' + access_token);
  request.addEventListener('load', response);
  request.send();
};

let getTransactionsFromLocalStorage = function() {
  transactionsString = localStorage.getItem('currentTransactions');
  parseData();
};

let app = function() {
  fetchMap();
  // listTransactions();
  getTransactionsFromLocalStorage();
};

window.addEventListener('load', app);
