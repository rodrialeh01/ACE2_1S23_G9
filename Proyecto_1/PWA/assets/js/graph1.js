var myCanvas = document.getElementById("myCanvas");
let cw = myCanvas.width = graficas.offsetWidth;
let ch = myCanvas.height = graficas.offsetHeight;

var ctx = myCanvas.getContext("2d");

/*
ctx: reference to the drawing context
startX: the X coordinate of the line starting point
startY: the Y coordinate of the line starting point
endX: the X coordinate of the line end point
endY: the Y coordinate of the line end point
color: the color of the line 
*/
function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

/*
ctx: reference to the drawing context
upperLeftCornerX: the X coordinate of the bar's upper left corner
upperLeftCornerY: the X coordinate of the bar's upper left corner
width: the width of the bar
height: the height of the bar
color: the color of the bar
*/
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color, text, init, end){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
    //nombre de barra
    ctx.save();
    ctx.translate( upperLeftCornerX+5,  upperLeftCornerY );
    ctx.rotate(-( Math.PI / 4) );
    ctx.fillStyle='black';
    ctx.textAlign = "left";
    ctx.fillText( text, 0, 0 );
    ctx.restore();
    //inicio
    ctx.save();
    ctx.translate(  upperLeftCornerX+10, ctx.canvas.clientHeight)//ctx.canvas.clientHeight );
    ctx.rotate(-( Math.PI / 2) );
    ctx.fillStyle='blue';
    ctx.textAlign = "rigth";
    ctx.fillText( init, 0, 0 );
    ctx.restore();
    //fin
    ctx.save();
    ctx.translate(  upperLeftCornerX+width-5, ctx.canvas.clientHeight)//ctx.canvas.clientHeight );
    ctx.rotate(-( Math.PI / 2) );
    ctx.fillStyle='blue';
    ctx.textAlign = "rigth";
    ctx.fillText( end, 0, 0 );
    ctx.restore();
}
class BarChart {
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
      this.ctx.font = "10px Arial";
      this.ctx.fillText(gridValue, 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.options.gridStep;
    }
  }
  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var barIndex = 0;
    var numberOfBars = this.options.data.length;
    var barSize = canvasActualWidth / numberOfBars;
    var values = this.options.data;
    var currentPomodoro;
    for (let val of values) {      
      if(val.pomId != currentPomodoro ){
        drawLine(
          this.ctx,
          this.options.padding + barIndex * barSize,
          this.options.padding,
          this.options.padding + barIndex * barSize,          
          ctx.canvas.clientHeight,
          "red"
        );
        currentPomodoro=val.pomId;
      }
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
    let legend = document.querySelector("legend[for='myCanvas']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let ctg of this.options.data) {
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
var myBarchart = new BarChart({
  canvas: myCanvas,
  seriesName: "Porcentajes de Pomodoros:16/03/2023 - 18/03/2023",
  padding: 50,
  gridStep: 2.5,
  gridColor: "black",
  data: [
    {name:"Trabajo", total: 80, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización sentado", total: 10, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización Parado", total: 5, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Trabajo2", total: 80, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización sentado2", total: 10, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización Parado2", total: 5, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Trabajo3", total: 80, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización sentado3", total: 10, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización Parado3", total: 5, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Trabajo4", total: 80, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización sentado4", total: 10, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Penalización Parado4", total: 5, init:"12:00:00", end:"12:20:00", pomId:1},
    {name:"Trabajo5", total: 80, init:"12:00:00", end:"12:20:00", pomId:2},
    {name:"Penalización sentado5", total: 10, init:"12:00:00", end:"12:20:00", pomId:2},
    {name:"Penalización Parado5", total: 5, init:"12:00:00", end:"12:20:00", pomId:2},
    {name:"Trabajo6", total: 80, init:"12:00:00", end:"12:20:00", pomId:3},
    {name:"Penalización sentado6", total: 10, init:"12:00:00", end:"12:20:00", pomId:3},
    {name:"Penalización Parado6", total: 5, init:"12:00:00", end:"12:20:00", pomId:3},
  ],
  colors: ["#a55ca5", "#67b6c7", "#bccd7a"],
  titleOptions: {
    align: "center",
    fill: "black",
    font: {
      weight: "bold",
      size: "18px",
      family: "Lato"
    }
  }
});

setTimeout(function() {
    myBarchart.draw();
    addEventListener('resize', myBarchart.draw, false);
}, 15);