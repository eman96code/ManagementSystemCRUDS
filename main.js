// getting elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let moodUpdate = 'create';
let temp ;

// get total
function getTotal() {
  if (price.value != '' & price.value != 0) {
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = 'rgb(145, 19, 19)';
  } 
}
// create product 
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product)
} else {
  dataPro = []
}
submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  }
  if (title.value != '' &&
  price.value != '' &&
  category.value != '' &&
  product.count < 100) {
    if (moodUpdate === 'create') {
      if (product.count > 1) {
        for (let i=0;i<product.count;i++) {
          dataPro.push(product);
        } 
      } else {
        dataPro.push(product);
      }
    }else{
      dataPro[temp] = product;
      moodUpdate='create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
      getTotal()  
    }
    clearData();
  }
  // save to localStorage
  localStorage.setItem('product', JSON.stringify(dataPro)); 
  showData()
}
// clear  inputs 
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}
// read
function showData() {
  getTotal();
  let tableBody = '';
  for (let i=0;i<dataPro.length;i++) {
    tableBody+= `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
      </tr>
  `
  }
  document.getElementById('tbody').innerHTML = tableBody;
  let deletAllBtn = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    deletAllBtn.innerHTML = `
      <button onclick='deleteAllData()'>Delete All (${dataPro.length})</button>
    `
  } else {
    deletAllBtn.innerHTML = '';
  }
}
// delete data
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product= JSON.stringify(dataPro);
  showData() 
}
// delete all data
function deleteAllData() {
  localStorage.clear();
  dataPro.splice(0);
  showData()
}
// update data
function updateData(i) {
  title.value= dataPro[i].title;
  price.value= dataPro[i].price;
  taxes.value= dataPro[i].taxes;
  ads.value= dataPro[i].ads;
  discount.value= dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value= dataPro[i].category;
  submit.innerHTML = 'Update';
  moodUpdate = 'update';
  temp = i;
  scroll({
    top:0,
    behavior:"smooth"
  })
}
// search data
let searchMood = 'title';
let search= document.getElementById('search');
// getting search mood
function getSearchMood(id) {
  if( id == "searchByTitle") {
    searchMood = 'title';
  }else {
    searchMood = 'category';
  }
  search.focus();
  search.placeholder = 'search by ' + searchMood;
  search.value = '';
  showData()
}
// getting data and show it
function searchData(value) {
  let tableBody = '';
  for (let i=0;i<dataPro.length;i++) {
    if (searchMood == 'title') {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        
        tableBody+= `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick='updateData(${i})' id="update">update</button></td>
          <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `
      }
    }else{
      if (dataPro[i].category.includes(value.toLowerCase())) {
        tableBody+= `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick='updateData(${i})' id="update">update</button></td>
          <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `
      }
    }
  }
  document.getElementById('tbody').innerHTML = tableBody;
}
showData();