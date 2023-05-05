
const ctx = document.getElementById('grafica1');
let labels_fecha = []
let values_te = []
let ch1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels_fecha,
        datasets: [{
            label: '°C',
            data: values_te,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, values) {
                        var numValue = parseFloat(value);
                        return numValue.toFixed(1) + '°C';
                    }
                },
                title: {
                    display: true,
                    text: 'Temperatura (°C)'
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
function Filtrar(){
    labels_fecha.splice(0, labels_fecha.length);
    values_te.splice(0, values_te.length);
    const fi = document.getElementById('fecha_inicio');
    const ff = document.getElementById('fecha_fin');
    const hi = document.getElementById('hora_inicio');
    const hf = document.getElementById('hora_fin');

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
    fetch('http://localhost:4001/filtroTmpExt', {
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
            values_te.push(response[i].tmp_ext);
        }
        console.log(labels_fecha);
        console.log(values_te);
        ch1.update();
    })
}
