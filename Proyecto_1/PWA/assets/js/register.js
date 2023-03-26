function validateName(){
    const name = document.getElementById('name').value;
    if(name.length > 0){
      console.log("name: ", name);
      localStorage.setItem('name', name);
      RegistrarUsuario(name);
      setLogueado();
      window.location.href = './Dashboard.html';
    }else{
      alert('No se puede ingresar la aplicación sin ingresar su Nombre')
    }
}

function RegistrarUsuario(user){
  var objeto={
    "nombre": user,
    "tiempo_trabajo": 25,
    "tiempo_descanso": 5
  }
  console.log(objeto)
  fetch('http://192.168.0.7:4000/confPD', {
    method: 'POST',
    body: JSON.stringify(objeto),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      alert(err);

      //alert("Ocurrio un error, ver la consola")
    })
}

function setLogueado(){
  let logueado = {
    "estado": 1
  }
  fetch(`http://192.168.0.7:4000/updateLogin`, {
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
    })
}

// const RegistrarUsuario = async (user) => {
//   try {
//     const response = await fetch('http://localhost:4000/confPD', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*' },
//       body: JSON.stringify({
//         nombre: user,
//         tiempo_trabajo: 25,
//         tiempo_descanso: 5
//       })
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };