var myCanvas = document.getElementById("grafica4");
var graficas = document.getElementById("graficas");
myCanvas.width = graficas.offsetWidth;
myCanvas.height = graficas.offsetHeight*5;

var ctx1 = myCanvas.getContext("2d");


const fecha_filtro = document.getElementById("date_results"); 
const usuarios_filtro = document.getElementById("usuarios_results");
const pomodoros_filtro = document.getElementById("id_pomodoro_results");

fecha_filtro.addEventListener("change", function(){
  ObtenerUsuarios(fecha_filtro.value);
});

function ObtenerUsuarios(fecha_f){
  let json1={
    "fecha": fecha_f
  }
  console.log(json1)
  fetch('http://192.168.0.6:4000/filtarUsariosFecha', {
    method: 'POST',
    body: JSON.stringify(json1),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
    //  alert(err);

      //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
      let insert = "";
      for (let i = 0; i < response.length; i++) {
        insert += `<option value="${response[i].id_usuario}">${response[i].nombre}</option>`;
      }
      usuarios_filtro.innerHTML = insert;
      console.log("2")
      usuarios_filtro.addEventListener("change", function(){
        ObtenerIDS(usuarios_filtro.value);
      });
  })
}

function ObtenerIDS(id_usuario){
  fetch(`http://192.168.0.6:4000/filtrarDataPorIdPomodoro/${id_usuario}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
    //  alert(err);

      //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
      let insert = "";
      for (let i = 0; i < response.length; i++) {
        insert += `<option value="${response[i]}">${response[i]}</option>`;
      }
      pomodoros_filtro.innerHTML = insert;
      
  })
  
}
/*
function default1(){
  fetch(`http://192.168.0.6:4000/filtrarDataPorIdPomodoro/${id_usuario}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
    //  alert(err);

      //alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
      let insert = "";
      for (let i = 0; i < response.length; i++) {
        insert += `<option value="${response[i]}">${response[i]}</option>`;
      }
      pomodoros_filtro.innerHTML = insert;
      
  })
}
*/

function drawLine1(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}


function drawBar1(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color, text, init){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
    //nombre de barra
    ctx.save();
    ctx.translate( upperLeftCornerX+5,  upperLeftCornerY );
    ctx.rotate(0);
    ctx.fillStyle='white';
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
    ctx.fillText( text, 10, -5);
    ctx.restore();
    //inicio
    ctx.save();
    ctx.translate(  upperLeftCornerX+10, ctx.canvas.clientHeight)//ctx.canvas.clientHeight );
    ctx.rotate(-(Math.PI/2));
    ctx.fillStyle='white';
    ctx.textAlign = "left";
    ctx.font = "20px Arial";
    ctx.fillText( init, 0, 10 );
    ctx.restore();
}


class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    try {
      this.maxValue = Math.max(...Object.values(dataUnificado));
    } catch (e) {
      this.maxValue = 100;
    }
  }
  drawGridLines() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var gridValue = 0;
    while (gridValue <= this.maxValue) {
      console.log("gridValue: " + gridValue)
      var gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.options.padding;
      drawLine1(
        this.ctx,
        20,
        gridY,
        this.canvas.width,
        gridY,
        '#DAAF'
      );
      drawLine1(
        this.ctx,
        25,
        this.options.padding / 2,
        25,
        gridY + this.options.padding / 2,
        this.options.gridColor
      );
      // Writing grid markers 
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "10px Arial";
      this.ctx.fillText(gridValue + "min", 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.options.gridStep;
    }
  }
  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var barIndex = 0;
    var numberOfBars = dataUnificado.length;
    var barSize = canvasActualWidth / numberOfBars;
    var values = dataUnificado;
    var currentPomodoro;
    for (let val of values) {      
      /*if(val.pomId != currentPomodoro ){
        drawLine1(
          this.ctx,
          this.options.padding + barIndex * barSize,
          this.options.padding,
          this.options.padding + barIndex * barSize,          
          ctx.canvas.clientHeight,
          "white"
        );
        currentPomodoro=val.pomId;
      }*/
      var barHeight = Math.round((canvasActualHeight * val.total) / this.maxValue);
      //console.log(barHeight);
      //console.log(val);
      if((barIndex+1) % 3==0 && barIndex!=0){
        drawBar1(
            this.ctx,
            this.options.padding + barIndex * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            this.colors[barIndex % this.colors.length],
            //(barIndex%3==0),
            val.name,
            val.init
        );
      } else {
        drawBar1(
            this.ctx,
            this.options.padding + barIndex * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            this.colors[barIndex % this.colors.length],
            //(barIndex%3==0),
            val.name,
            val.init
        );
      }
      barIndex++;
    }
  }
  drawLabel() {
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = this.titleOptions.align;
    this.ctx.fillStyle = this.titleOptions.fill;
    this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;
    let xPos = this.canvas.width / 2;
    if (this.titleOptions.align == "left") {
      xPos = 10;
    }
    if (this.titleOptions.align == "right") {
      xPos = this.canvas.width - 10;
    }
    this.ctx.fillText(this.options.seriesName, xPos, 50);
    this.ctx.restore();
  }
  drawLegend() {
    let pIndex = 0;
    let legend = document.querySelector("legend[for='grafica4']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let ctg of dataUnificado) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft =
        "20px solid " + this.colors[pIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = ctg;
      ul.append(li);
      pIndex++;
    }
  }
  draw() {
    this.drawGridLines();
    this.drawBars();
    this.drawLabel();
    //this.drawLegend();
  }
}
/*var myBarchart = new BarChart({
  canvas: myCanvas,
  seriesName: "Resultados de Pomodoros Unificados",
  padding: 50,
  gridColor: "white",
  data: dataUnificado,
  colors: ["#ffffff", "#f73232"],
  titleOptions: {
    align: "center",
    fill: "white",
    font: {
      weight: "bold",
      size: "18px",
      family: "Lato"
    }
  }
});

try {
  myBarchart.gridStep= Math.max(...Object.values(dataUnificado))/40;
}catch(err){
  myBarchart.gridStep = 2.5;
}*/
//myBarchart.draw();

function activarObtenerData(){
  ctx1.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ObtenerData(pomodoros_filtro.value, usuarios_filtro.value);
}

var dataUnificado = [];
var numerito = 1;
var contador_debug = 0;
function ObtenerData(id_pom, id_us){
  dataUnificado = [];
  fetch(`http://192.168.0.6:4000/ranking2/${id_us}/${id_pom}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',}})
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response)
    dataUnificado = [];
    var tiempoTrabajo = 0, penalizacionParado=0, tiempoDescanso=0, penalizacionSentado = 0;
    for (let i = 0; i < response.length; i++) {
      if (response[i].fase % 2 != 0) {
        tiempoTrabajo += response[i].sentado;
        penalizacionParado += response[i].parado;
      }else{
        tiempoDescanso += response[i].parado;
        penalizacionSentado += response[i].sentado;
      }
    }

      dataUnificado.push(
        {name:String((tiempoTrabajo/60).toFixed(2)), total: tiempoTrabajo/60, init:"T", pomId:response[0].id_pomodoro}
      );

      dataUnificado.push(
        {name:String((penalizacionParado/60).toFixed(2)), total: penalizacionParado/60, init:"PP", pomId:response[0].id_pomodoro}
      );
    
      dataUnificado.push(
        {name:String((tiempoDescanso/60).toFixed(2)), total: tiempoDescanso/60, init:"D", pomId:response[0].id_pomodoro}
      );

      dataUnificado.push(
        {name:String((penalizacionSentado/60).toFixed(2)), total: penalizacionSentado/60, init:"PS", pomId:response[0].id_pomodoro}
      );
      console.log("dataUnificado: ", dataUnificado);
      
      let maxTotal = dataUnificado.reduce((max, item) => {
        return item.total > max ? item.total : max;
      }, 0);
      var myBarchart = new BarChart({
        canvas: myCanvas,
        seriesName: "",
        padding: 50,
        gridStep:0.5,
        gridColor: "white",
        data: dataUnificado,
        colors: ["#ffffff", "#f73232"],
        titleOptions: {
          align: "center",
          fill: "white",
          font: {
            weight: "bold",
            size: "18px",
            family: "Lato"
          }
        }
      });
      myBarchart.maxValue = maxTotal+maxTotal*0.1;
      myBarchart.draw();
      contador_debug++;
      console.log("contador_debug: ", contador_debug);
      document.getElementById("titleg4").innerHTML = "Resultados de Pomodoros Unificados del " + response[0].fecha_inicio + " al " + response[response.length-1].fecha_fin;
  })
  
}



setTimeout(function() {
  addEventListener('resize', myBarchart.draw, false);
  //addEventListener('resize', Cumplimiento.draw, false);
}, 15)





