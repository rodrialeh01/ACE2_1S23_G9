
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
    var doughnutData2 = [
        {
            value: Number(data[0].humedad),
            color:"#68dff0"
        },
        {
            value : Number(restante),
            color : "#444c57"
        }
    ];
    var myDoughnut = new Chart(document.getElementById("serverstatus02").getContext("2d")).Doughnut(doughnutData2);
    humedad_por.innerHTML = data[0].humedad + ' %  Humedad'

    //GRAFICA DE PORCENTAJE DE AGUA
    let restante1= 100 -Number(data[0].pr_agua);
    var doughnutData = [
        {
            value: Number(data[0].pr_agua),
            color:"#68dff0"
        },
        {
            value : Number(restante1),
            color : "#444c57"
        }
    ];
    var myDoughnut = new Chart(document.getElementById("serverstatus03").getContext("2d")).Doughnut(doughnutData);
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