const usuario = localStorage.getItem('name');
let idActualUser = 0;
var state = 0;
function setRestTime(){
    const RestTime = document.getElementById('RestTime').value;
}

function getLastID(){          
    fetch(`http://192.168.0.6:4000/getLastId`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
        console.log(response);
        console.log("id: ", response[0].actual_id_user);
        console.log("id2: ", response[0])
        idActualUser = response[0].actual_id_user;
        console.log("idActualUser: ", idActualUser)
        document.querySelector('#welcome').innerHTML = "Bienvenido " + usuario;
        getLastTime();
    })
}
getLastID();

function getStateConfig(){
    fetch(`http://192.168.0.6:4000/getConfigTime`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
        console.log(response);
        console.log("state: ", response[0].configurar);
        state = response[0].configurar;
    })
}

function getLastTime(){
    fetch(`http://192.168.0.6:4000/getLastTime/${idActualUser}`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
        console.log(response);
        console.log("resttime: ", response[0].tiempo_descanso);
        console.log("worktime: ", response[0].tiempo_trabajo);
        document.querySelector('#RestTime').value = response[0].tiempo_descanso;
        document.querySelector('#WorkTime').value = response[0].tiempo_trabajo;
        document.querySelector('#trabajo').innerHTML = response[0].tiempo_trabajo;
        document.querySelector('#descanso').innerHTML = response[0].tiempo_descanso;
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
    if(state == 1){
        alert('No se puede modificar el tiempo de trabajo, ya que el pomodoro esta en ejecucion')
        return;
    }
    var objeto = {
        'id_usuario': idActualUser,
        'tiempo_trabajo': trabajo
    }
    console.log(objeto)
    fetch(`http://192.168.0.6:4000/updateConfig`, {
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
        location.href = './Dashboard.html'
    })
}

setInterval(function() {
   // getStateConfig();
}, 1000); // 1000 = 1 segundos en milisegundos
/*
setInterval(function() {
    getLastTime();
}, 1000); // 1000 = 1 segundos en milisegundos
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
    if(state == 1){
        alert('No se puede modificar el tiempo de trabajo, ya que el pomodoro esta en ejecucion')
        return;
    }
    var objeto = {
        'id_usuario': idActualUser,
        'tiempo_descanso': descanso
    }
    console.log(objeto)
    fetch(`http://192.168.0.6:4000/updateConfig2`, {
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
        //alert('Se modifico correctamente el tiempo')
        location.href = './Dashboard.html'
    })
}

function setLogueado(){
    let logueado = {
      "estado": 0
    }
    fetch(`http://192.168.0.6:4000/updateLogin`, {
      method: 'PUT',
      body: JSON.stringify(logueado),
      headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',}})
      .then(res => res.json())
      .catch(err => {
          console.error('Error:', err)
      })
      .then(response =>{
            console.log(response);
          location.href = './index.html'
      })
  }