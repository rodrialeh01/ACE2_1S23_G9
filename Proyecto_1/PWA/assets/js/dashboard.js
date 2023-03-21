const usuario = localStorage.getItem('name');
let idActualUser = 0;
function setRestTime(){
    const RestTime = document.getElementById('RestTime').value;
}

function getLastID(){          
    fetch(`http://192.168.0.2:4000/getLastId`, {
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
        console.log(response);
        console.log("id: ", response[0].actual_id_user);
        console.log("id2: ", response[0])
        idActualUser = response[0].actual_id_user;
        console.log("idActualUser: ", idActualUser)
        getLastTime();
    })
}
getLastID();


function getLastTime(){
    fetch(`http://192.168.0.2:4000/getLastTime/${idActualUser}`, {
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
        console.log(response);
        console.log("resttime: ", response[0].tiempo_descanso);
        console.log("worktime: ", response[0].tiempo_trabajo);
        document.querySelector('#RestTime').value = response[0].tiempo_descanso;
        document.querySelector('#WorkTime').value = response[0].tiempo_trabajo;
    })
}


function ModificarTiempoT(){
    var trabajo = document.querySelector('#WorkTime').value
    if(isNaN(parseInt(trabajo))){
        alert('No se puede ingresar letras')
        return;
    }
    if(parseInt(trabajo)<1 || parseInt(trabajo)>45){
        alert('No se puede ingresar un numero menor a 1 o mayor a 45 minutos')
        return;
    }
    var objeto = {
        'id_usuario': idActualUser,
        'tiempo_trabajo': trabajo
    }
    console.log(objeto)
    fetch(`http://192.168.0.2:4000/updateConfig`, {
    method: 'PUT',
    body: JSON.stringify(objeto),
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
    })
    .then(response =>{
        console.log(response);
        alert('Se modifico correctamente el tiempo')
    })
}
/*
setInterval(function() {
    getLastID();
}, 1000); // 5000 = 5 segundos en milisegundos

setInterval(function() {
    getLastTime();
}, 1000); // 5000 = 5 segundos en milisegundos
*/
function ModificarTiempoR(){
    var descanso = document.querySelector('#RestTime').value
    if(isNaN(parseInt(descanso))){
        alert('No se puede ingresar letras')
        return;
    }
    if(parseInt(descanso)<1 || parseInt(descanso)>45){
        alert('No se puede ingresar un numero menor a 1 o mayor a 45 minutos')
        return;
    }
    var objeto = {
        'id_usuario': idActualUser,
        'tiempo_descanso': descanso
    }
    console.log(objeto)
    fetch(`http://192.168.0.2:4000/updateConfig2`, {
    method: 'PUT',
    body: JSON.stringify(objeto),
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
    })
    .then(response =>{
        console.log(response);
        alert('Se modifico correctamente el tiempo')
    })
}