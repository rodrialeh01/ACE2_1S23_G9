let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
document.getElementById('date').value = year + "-0" + month + "-" + day;
document.getElementById('date2').value = year + "-0" + month + "-" + day;
console.log(year + "-" + month + "-" + day);