const ctx4 = document.getElementById('grafica4');
let labels_fecha = []
let values_agua = []

let ch4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: labels_fecha,
        datasets: [{
            label: '%',
            data: values_agua,
            backgroundColor: 'rgba(0, 65, 97, 0.2)',
            borderColor: 'rgba(0, 65, 97, 1)',
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
                    text: 'Porcentaje de agua (%)'
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

function Filtrar4(){
    labels_fecha.splice(0, labels_fecha.length);
    values_agua.splice(0, values_agua.length);
    const fi = document.getElementById('fecha_inicio4');
    const ff = document.getElementById('fecha_fin4');
    const hi = document.getElementById('hora_inicio4');
    const hf = document.getElementById('hora_fin4');

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
    fetch('http://localhost:4001/filtarAgua', {
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
            values_agua.push(response[i].pr_agua);
        }
        ch4.update();
    })
}