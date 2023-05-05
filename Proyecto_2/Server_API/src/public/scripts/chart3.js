const ctx3 = document.getElementById('grafica3').getContext('2d');
let labels_fecha = []
let values_humedad = []

let ch3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: labels_fecha,
        datasets: [{
            label: '% de humedad',
            data: values_humedad,
            backgroundColor: 'rgba(92, 23, 0, 0.2)',
            borderColor: 'rgba(92, 23, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, values) {
                        var numValue = parseFloat(value);
                        return numValue.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Porcentaje de humedad (%)'
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

function Filtrar3(){
    labels_fecha.splice(0, labels_fecha.length);
    values_humedad.splice(0, values_humedad.length);
    const fi = document.getElementById('fecha_inicio3');
    const ff = document.getElementById('fecha_fin3');
    const hi = document.getElementById('hora_inicio3');
    const hf = document.getElementById('hora_fin3');

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
    fetch('http://localhost:4001/filtarHumedad', {
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
        console.log(response);
        for(let i = 0; i < response.length; i++){
            let time = new Date(response[i].tiempo);
            let tiempo =  time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            labels_fecha.push(tiempo);
            values_humedad.push(response[i].humedad);
        }
        ch3.update();
    })
}