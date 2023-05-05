
const socket = io()

socket.on('values', (data) => {
    console.log(data);
    const data_humedad = document.getElementById('data_humedad')
    const data_tmpi = document.getElementById('data_tmpi')
    const data_tmpe = document.getElementById('data_tmpe')
    const data_agua = document.getElementById('data_agua')
    const humedad_por = document.getElementById('data_g_hum')
    const agua_por = document.getElementById('data_g_agua')
    data_humedad.innerHTML = data[0].humedad + ' %'
    data_tmpi.innerHTML = data[0].tmp_int + ' °C'
    data_tmpe.innerHTML = data[0].tmp_ext + ' °C'
    data_agua.innerHTML = data[0].pr_agua + ' %'

    // Grafica de HUMEDAD
    let restante= 100 -Number(data[0].humedad);
    let data1 = [];
    data1.push(data[0].humedad);
    data1.push(restante);
    let restante2 = 100 - Number(data[0].pr_agua);
    let data2 = [];
    data2.push(data[0].pr_agua);
    data2.push(restante2);

    let ghum = document.getElementById('serverstatus02');
    new Chart(ghum, {
        type: 'pie',
        data: {
            labels: ['%Humedad de la tierra', '%Restante'],
            datasets: [{
                label: '% de Humedad',
                data: data1,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',                    
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfica de % de Humedad de la tierra'
                }
            },
            animation: false 
        }
    });
    humedad_por.innerHTML = data[0].humedad + ' %  Humedad'
    let pagua = document.getElementById('serverstatus03');
    new Chart(pagua, {
        type: 'pie',
        data: {
            labels: ['% de agua', '%Restante'],
            datasets: [{
                label: '% de agua',
                data: data2,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',                    
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfica de % de Agua'
                }
            },
            animation: false 
        }
    });
    agua_por.innerHTML = data[0].pr_agua + ' %  Agua'

    //GRAFICA DE TEMPERATURA EXTERNA
    const progressbar = document.getElementById('progressbar1')
    progressbar.style.width = data[0].tmp_ext + '%'
    progressbar.setAttribute('aria-valuenow', data[0].tmp_ext)
    document.getElementById("te").innerHTML = data[0].tmp_ext + ' °C'

    //GRAFICA DE TEMPERATURA INTERNA
    const progressbar2 = document.getElementById('progressbar2')
    progressbar2.style.width = data[0].tmp_int + '%'
    progressbar2.setAttribute('aria-valuenow', data[0].tmp_int)
    document.getElementById("ti").innerHTML = data[0].tmp_int + ' °C'

})