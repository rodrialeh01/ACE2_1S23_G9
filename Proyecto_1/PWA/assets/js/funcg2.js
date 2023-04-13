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