function validateName(){
    const name = document.getElementById('name').value;
    if(name.length > 0){
      console.log("name: ", name);
      localStorage.setItem('name', name);
      window.location.href = './Dashboard.html';
    }else{
      alert('No se puede ingresar la aplicación sin ingresar su Nombre')
    }
}