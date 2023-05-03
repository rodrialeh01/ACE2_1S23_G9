const ctx2 = document.getElementById('grafica2').getContext('2d');
let labels_fecha2 = []
let values_ti = []

let ch2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels_fecha2,
        datasets: [{
            label: '°C',
            data: values_ti,
            backgroundColor: 'rgba(28, 133, 214, 0.2)',
            borderColor: 'rgba(28, 133, 214, 1)',
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

function Filtrar2(){
    labels_fecha2.splice(0, labels_fecha2.length);
    values_ti.splice(0, values_ti.length);
    const fi = document.getElementById('fecha_inicio2');
    const ff = document.getElementById('fecha_fin2');
    const hi = document.getElementById('hora_inicio2');
    const hf = document.getElementById('hora_fin2');

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
    fetch('http://localhost:4001/filtroTmpInt', {
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
            labels_fecha2.push(tiempo);
            values_ti.push(response[i].tmp_int);
        }
        ch2.update();
    })
}