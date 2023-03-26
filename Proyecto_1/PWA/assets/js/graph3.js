var myCanvas2 = document.getElementById("grafica2");
var graficas2 = document.getElementById("graficas2");
var s2 = document.getElementById("seconds2");
myCanvas2.width = graficas2.offsetWidth;
myCanvas2.height = graficas2.offsetHeight*5;

var ctx2 = myCanvas2.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = Math.max(...Object.values(this.options.data));
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
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );

      drawLine(
        this.ctx,
        20,
        this.options.padding / 2,
        20,
        gridY + this.options.padding / 2,
        this.options.gridColor
      );

      // Writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue + " s", 0, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridStep;
    }
  }

  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

    var barIndex = 0;
    var numberOfBars = Object.keys(this.options.data).length;
    var barSize = canvasActualWidth / numberOfBars;

    var values = Object.values(this.options.data);

    for (let val of values) {
      var barHeight = Math.round((canvasActualHeight * val) / this.maxValue);

      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

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

    this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);

    this.ctx.restore();
  }

  drawLegend() {
    let pIndex = 0;
    let legend = document.querySelector("legend[for='myCanvas']");
    let ul = document.createElement("ul");
    legend.append(ul);

    for (let ctg of Object.keys(this.options.data)) {
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

var data_graph2 = {
  "Fase 2": 0
}

var myBarchart2 = new BarChart({
  canvas: myCanvas2,
  seriesName: "Penalizacion por no sentarse a tiempo (s)",
  padding: 30,
  gridStep: 1,
  gridColor: "black",
  data: data_graph2,
  colors: ["#FD2619", "#949494"],
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
    addEventListener('resize', myBarchart2.draw, false);
}, 15);

setInterval(function(){
  ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
if(data_graph2["Fase 2"] < 40){
  var myBarchart2 = new BarChart({
    canvas: myCanvas2,
    seriesName: "Penalizacion por no pararse a tiempo (s)",
    padding: 30,
    gridStep: 1,
    gridColor: "black",
    data: data_graph2,
    colors: ["#FD2619", "#949494"],
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
  myBarchart2.draw();
}else if(data_graph2["Fase 2"] < 300){
  var myBarchart2 = new BarChart({
    canvas: myCanvas2,
    seriesName: "Penalizacion por no pararse a tiempo (s)",
    padding: 30,
    gridStep: 10,
    gridColor: "black",
    data: data_graph2,
    colors: ["#FD2619", "#949494"],
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
  myBarchart2.draw();
}else if(data_graph2["Fase 2"] < 1000){
  var myBarchart2 = new BarChart({
    canvas: myCanvas2,
    seriesName: "Penalizacion por no pararse a tiempo (s)",
    padding: 30,
    gridStep: 50,
    gridColor: "black",
    data: data_graph2,
    colors: ["#FD2619", "#949494"],
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
  myBarchart2.draw();

}else{
  var myBarchart2 = new BarChart({
    canvas: myCanvas2,
    seriesName: "Penalizacion por no pararse a tiempo (s)",
    padding: 30,
    gridStep: 100,
    gridColor: "black",
    data: data_graph2,
    colors: ["#FD2619", "#949494"],
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
  myBarchart2.draw();
}
  s2.innerHTML = data_graph2["Fase 2"];
  data_graph2["Fase 2"] += 1;
},1000)