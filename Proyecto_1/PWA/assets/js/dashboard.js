const usuario = localStorage.getItem('name');
let idActualUser = 0;

function setRestTime(){
    const RestTime = document.getElementById('RestTime').value;
}

function getLastID(){          
    fetch(`http://localhost:4000/getLastId`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
        idActualUser = response.actual_id_user;
        console.log("idActualUser: ", idActualUser);
    })
}