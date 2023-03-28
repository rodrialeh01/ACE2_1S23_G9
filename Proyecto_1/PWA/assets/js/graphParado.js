var myCanvas3 = document.getElementById("grafica2");
var graficas = document.getElementById("graficas");
myCanvas3.width = graficas.offsetWidth;
myCanvas3.height = graficas.offsetHeight;

var ctx3 = myCanvas3.getContext("2d");

const fecha_filtro2 = document.getElementById("date_parado"); 
const usuarios_filtro2 = document.getElementById("usuarios_parado");
const pomodoros_filtro2 = document.getElementById("id_pomodoro_parado");

fecha_filtro2.addEventListener("change", function(){
  ObtenerUsuarios2(fecha_filtro2.value);
});

function ObtenerUsuarios2(fecha_f){
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
      usuarios_filtro2.innerHTML = insert;
      console.log("2")
      usuarios_filtro2.addEventListener("change", function(){
        ObtenerIDS2(usuarios_filtro1.value);
      });
  })
}

function ObtenerIDS2(id_usuario){
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
      pomodoros_filtro2.innerHTML = insert;
      
  })
  
}





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
    ctx.fillText( init, -10, 0 );
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


class BarChart3 {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = 1;
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
    var numberOfBars = dataParado.length;
    var barSize = canvasActualWidth / numberOfBars;
    var values = dataParado;
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
    for (let ctg of dataParado) {
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



function activarObtenerData2(){
  ctx3.clearRect(0, 0, myCanvas3.width, myCanvas3.height);
  ObtenerData2(pomodoros_filtro2.value, usuarios_filtro2.value);
}

var dataParado = [];
function ObtenerData2(id_pom, id_us){
  fetch('http://192.168.0.6:4000/filtrarDataPorUsuario/36',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',}})
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response)
    for (let i = 0; i < response.length; i++) {
        var estado = response[i].estado;
        if (estado == 1){
          estado = 0;
        }else{
            estado = 1;
        }
        let fechacomp = response[i].fecha_inicio.split(",");
        let fechacomp2 = response[i].fecha_fin.split(",");
        dataParado.push(
            {name:"", total: estado, init:fechacomp[1], end:fechacomp2[1], pomId:""}
            );
      }
      var myBarchart3 = new BarChart3({
        canvas: myCanvas3,
        seriesName: "",
        padding: 50,
        gridStep: 1,
        gridColor: "white",
        data: dataParado,
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
      myBarchart3.draw();
      document.getElementById("titleg2").innerHTML = "Validación que el usuario no esté sentado desde " + response[0].fecha_inicio + " hasta " + response[response.length-1].fecha_fin;
  })
}

setTimeout(function() {
  addEventListener('resize', myBarchart3.draw, false);
  //addEventListener('resize', Cumplimiento.draw, false);
}, 15)


