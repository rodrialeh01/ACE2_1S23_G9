const ctx5 = document.getElementById('grafica5').getContext('2d');
let labels_fecha = []
let values_bomba = []

let ch5 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: labels_fecha,
        datasets: [{
            label: 'Señal',
            data: values_bomba,
            borderColor: 'rgba(51, 2, 94, 1)',
            backgroundColor: 'rgba(51, 2, 94, 0.2)',
            pointBackgroundColor: 'rgba(51, 2, 94, 1)',
            pointBorderColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.1,
            stepped: true
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function(value, index, values) {
                        return value == 1 ? 'ON' : 'OFF';
                    }
                },
                title: {
                    display: true,
                    text: 'Estado de la bomba'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            }
        }
    }
});


function Filtrar5(){
    labels_fecha.splice(0, labels_fecha.length);
    values_bomba.splice(0, values_bomba.length);
    const fi = document.getElementById('fecha_inicio5');
    const ff = document.getElementById('fecha_fin5');
    const hi = document.getElementById('hora_inicio5');
    const hf = document.getElementById('hora_fin5');

    console.log(fi.value);
    console.log(ff.value);
    console.log(hi.value);
    console.log(hf.value);
    if(fi.value == "" || ff.value == "" || hi.value == "" || hf.value == ""){
        alert("Faltan campos por llenar para realizar el filtro y mostrar la grafica");
        return;
    }
    let fecha_i =  fi.value + ":" + hi.value + ":00";
    console.log(fecha_i);
    let fecha_f = ff.value + ":" + hf.value + ":00";
    console.log(fecha_f);
    let filtro = {
        "fechaInicio": fecha_i,
        "fechaFinal": fecha_f
    }
    fetch('http://localhost:4001/filtrarEstBomba', {
        method: 'POST',
        body: JSON.stringify(filtro),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)

    })
    .then(response =>{
        for(let i = 0; i < response.length; i++){
            let time = new Date(response[i].tiempo);
            let tiempo =  time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            labels_fecha.push(tiempo);
            values_bomba.push(response[i].est_bomba);
        }
        ch5.update();
    })
}

