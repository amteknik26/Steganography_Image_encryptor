var start;
var hide;


function uploadStart(){
  var canvas=document.getElementById("can1");
  var file=document.getElementById("filebox1");
  start=new SimpleImage(file);
  start.drawTo(canvas);
}

function uploadHide(){
  var canvas=document.getElementById("can2");
  var file=document.getElementById("filebox2");
  hide=new SimpleImage(file);
  hide.drawTo(canvas);
}

function steganoStart()
{
start = chop2hide(start);
hide = shift(hide);
 var stego = combine(start,hide);
 var canvas=document.getElementById("can3");
 stego.drawTo(canvas);
}

function chop2hide(image)
{
  for(var pixel of image.values())
    {
      pixel.setRed(Math.floor(pixel.getRed()/16)*16);
      pixel.setGreen(Math.floor(pixel.getGreen()/16)*16);
      pixel.setBlue(Math.floor(pixel.getBlue()/16)*16);
    }
  return image;
}

function shift(image)
{
  for(var pixel of image.values())
    {
      pixel.setRed(Math.floor(pixel.getRed()/16));
      pixel.setGreen(Math.floor(pixel.getGreen()/16));
      pixel.setBlue(Math.floor(pixel.getBlue()/16));
    }
  return image;
}

function combine(start,hide)
{
  var ans=new SimpleImage();
  for(var pixel of ans.values())
    {
     var x=pixel.getX();
     var y=pixel.getY();
      var pixel1=start.getPixel(x,y);
      var pixel2=hide.getPixel(x,y);
      pixel.setRed(pixel1.getRed()+pixel2.getRed());
      pixel.setGreen(pixel1.getGreen()+pixel2.getGreen());
      pixel.setBlue(pixel1.getBlue()+pixel2.getBlue());
    }
  return ans;
}

