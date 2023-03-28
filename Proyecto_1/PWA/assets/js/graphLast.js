var myCanvas2 = document.getElementById("grafica3");
var graficas = document.getElementById("graficas");
myCanvas2.width = graficas.offsetWidth;
myCanvas2.height = graficas.offsetHeight*5;

var ctx = myCanvas2.getContext("2d");







function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}


function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color, text, init, end){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
    //nombre de barra
    ctx.save();
    ctx.translate( upperLeftCornerX+5,  upperLeftCornerY );
    ctx.rotate(-( Math.PI / 2) );
    ctx.fillStyle='white';
    ctx.textAlign = "left";
    ctx.fillText( text, 5, 25 );
    ctx.restore();
    //inicio
    ctx.save();
    ctx.translate(  upperLeftCornerX+10, ctx.canvas.clientHeight)//ctx.canvas.clientHeight );
    ctx.rotate(-( Math.PI / 2) );
    ctx.fillStyle='white';
    ctx.textAlign = "rigth";
    ctx.fillText( init, 0, 0 );
    ctx.restore();
    //fin
    ctx.save();
    ctx.translate(  upperLeftCornerX+width-5, ctx.canvas.clientHeight)//ctx.canvas.clientHeight );
    ctx.rotate(-( Math.PI / 2) );
    ctx.fillStyle='white';
    ctx.textAlign = "rigth";
    ctx.fillText( end, 0, 0 );
    ctx.restore();
}


class BarChart2 {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = 100;
  }
  drawGridLines() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var gridValue = 0;
    while (gridValue <= this.maxValue) {
      var gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.options.padding;
      drawLine(
        this.ctx,
        20,
        gridY,
        this.canvas.width,
        gridY,
        '#DAAF'
      );
      drawLine(
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
      this.ctx.font = "12px Arial";
      this.ctx.fillText(gridValue, 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.options.gridStep;
    }
  }
  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var barIndex = 0;
    var numberOfBars = dataRanking.length;
    var barSize = canvasActualWidth / numberOfBars;
    var values = dataRanking;
    var currentPomodoro;
    for (let val of values) {      
      /*if(val.pomId != currentPomodoro ){
        drawLine(
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
        drawBar(
            this.ctx,
            this.options.padding + barIndex * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            this.colors[barIndex % this.colors.length],
            //(barIndex%3==0),
            val.name,
            val.init, 
            val.end
        );
      } else {
        drawBar(
            this.ctx,
            this.options.padding + barIndex * barSize,
            this.canvas.height - barHeight - this.options.padding,
            barSize,
            barHeight,
            this.colors[barIndex % this.colors.length],
            //(barIndex%3==0),
            val.name,
            val.init, 
            val.end
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
    for (let ctg of dataRanking) {
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
var myBarchart2 = new BarChart2({
  canvas: myCanvas2,
  seriesName: "Porcentajes de Pomodoros",
  padding: 50,
  gridStep: 2.5,
  gridColor: "white",
  data: dataRanking,
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




function LeerJson(){
  fetch('http://192.168.0.19:4000/pomodoros',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',}})
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response)
    for (let i = 0; i < response.length; i++) {
      var totalTiempo = response[i].sentado + response[i].parado;
      var porcentajeSentado = (response[i].sentado * 100) / totalTiempo;
      var porcentajeParado = (response[i].parado * 100) / totalTiempo;
      if (response[i].fase % 2 != 0) {
        dataRanking.push(
          {name:"Trabajo", total: porcentajeSentado, init:response[i].fecha_inicio, end:response[i].fecha_fin, pomId:response[i].id_pomodoro}
        );
        dataRanking.push(
          {name:"Penalización parado", total: porcentajeParado, init:response[i].fecha_inicio, end:response[i].fecha_fin, pomId:response[i].id_pomodoro}
        );
      }else{
        dataRanking.push(
          {name:"Descanso", total: porcentajeParado, init:response[i].fecha_inicio, end:response[i].fecha_fin, pomId:response[i].id_pomodoro}
        );
        dataRanking.push(
          {name:"Penalización sentado", total: porcentajeSentado, init:response[i].fecha_inicio, end:response[i].fecha_fin, pomId:response[i].id_pomodoro}
        );
      }
    }
  })
}

setTimeout(function() {
  addEventListener('resize', myBarchart2.draw, false);
  //addEventListener('resize', Cumplimiento.draw, false);
}, 15)

var dataRanking = [];
LeerJson();
myBarchart2.draw();