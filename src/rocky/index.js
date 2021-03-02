var rocky = require('rocky');

var settings;

rocky.on('message', function(event) {
  settings = event.data;
});

rocky.postMessage({command: 'settings'});

//drawing the pride flag function
function drawFlag(ctx, flag, x, y, sx, sy) {
  var h = ctx.canvas.unobstructedHeight;
  var w = ctx.canvas.unobstructedWidth;

  function flagDraw(ctx) {
    for (var i = 0; i <= (flagColors.length - 1); i++) {
      ctx.fillStyle = flagColors[i];
      ctx.fillRect(w / 2 - w * sx / 2 + x, h * sy / flagColors.length * i + y, w * sx, (h * sy) / flagColors.length);
    }
  }

  switch (flag) {
    case 'demigirl':
      var flagColors = ["darkgrey", "lightgrey", "shockingpink", "white", "shockingpink", "lightgrey", "darkgrey"];
      flagDraw(ctx);
      break;
    case 'lesbian':
      var flagColors = ["orange", "chromeyellow", "white", "purpureus", "jazzberryjam"];
      flagDraw(ctx);
      break;
    case 'trans':
      var flagColors = ["vividcerulean", "shockingpink", "white", "shockingpink", "vividcerulean"];
      flagDraw(ctx);
      break;
    case 'pride':
      var flagColors = ["red", "orange", "yellow", "green", "blue", "purple"];
      flagDraw(ctx);
      break;
    case 'enby':
      var flagColors = ["yellow", "white", "purple", "black"];
      flagDraw(ctx);
      break;
    case 'bi':
      var flagColors = ["jazzberryjam", "jazzberryjam", "purple", "blue", "blue"];
      flagDraw(ctx);
      break;
    case 'demiboy':
      var flagColors = ["darkgrey", "lightgrey", "vividcerulean", "white", "vividcerulean", "lightgrey", "darkgrey"];
      flagDraw(ctx);
      break;
    case 'agender':
      var flagColors = ["black", "lightgrey", "white", "screamingreen", "white", "lightgrey", "black"];
      flagDraw(ctx);
      break;
    case 'aromantic':
      var flagColors = ["green", "mintgreen", "white", "lightgrey", "black"];
      flagDraw(ctx);
      break;
    case 'asexual':
      var flagColors = ["black", "lightgrey", "white", "purple"];
      flagDraw(ctx);
      break;
    case 'genderfluid':
      var flagColors = ["shockingpink", "white", "fashionmagenta", "black", "electricultramarine"];
      flagDraw(ctx);
      break;
    case 'genderqueer':
      var flagColors = ["purpureus", "white", "green"];
      flagDraw(ctx);
      break;
    case 'pansexual':
      var flagColors = ["fashionmagenta", "yellow", "vividcerulean"];
      flagDraw(ctx);
      break;
    case 'phillypride':
      var flagColors = ["black", "armygreen", "red", "orange", "yellow", "green", "blue", "purple"];
      flagDraw(ctx);
      break;
    case 'polyamory':
      var flagColors = ["blue", "red", "black"];
      flagDraw(ctx);
      break;
  }
}

function time(zeroHour, militaryTime) {
  var d = new Date();
  var hh = d.getHours();
  var h = hh;
  var m = d.getMinutes();
  
  //hours calculations
  function hour () {
    if (h >= 12 && militaryTime == false) {
      h = hh - 12;
    }
    
    if (h == 0) {
      h = 12;
    }
    
    if (h < 10 && zeroHour == true) {
      return "0" + h;
    } else {
      return h;
    }
  }

  //minutes calculations
  function minute () {
    if (m < 10) {
      return "0" + m;
    } else {
      return m;
    }
  }

  return hour() + ":" + minute();
}

function date() {
  var d = new Date();

  function month() {
    var m = d.getMonth();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[m];
  }

  function weekday() {
    var wd = d.getDay();
    var dayweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayweek[wd];
  }

  function day() {
    var dd = d.getDate();
    if (dd < 10) {
      return "0" + dd;
    } else {
      return dd;
    }
  }

  return weekday() + " " + month() + " " + day();
}

function cssColor(color) {
  if (typeof color === 'number') {
    color = color.toString(16);
  } else if (!color) {
    return 'transparent';
  }

  color = padColorString(color);

  return '#' + color;
}

function padColorString(color) {
  color = color.toLowerCase();

  while (color.length < 6) {
    color = '0' + color;
  }

  return color;
}

rocky.on('draw', function(event) {
  //literally all of javascript
  var ctx = event.context;

  //clear everything every time it refreshes
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  //variables
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var fs = true;
  var flag = 'none'; //choices of pride, trans, demigirl, lesbian, and enby
  var dropShadowText = true;
  var zeroInHour = false;
  var militaryTime = false;
  var backgroundColor = 'black';
  var mainColor = 'white';
  var accentColor = 'darkgrey';
  var enableDate = false;

  if (settings) {
    fs = settings.Fullscreen;
    flag = settings.Flag;
    dropShadowText = settings.DropShadowText;
    zeroInHour = settings.ZeroInHour;
    militaryTime = settings.MilitaryTime;
    backgroundColor = cssColor(settings.Background);
    mainColor = cssColor(settings.TextColorMain);
    accentColor = cssColor(settings.TextColorAccent);
    enableDate = settings.EnableDate;
  }

  //background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, w, h);

  //draw the flag (kinda self explanitory)
  if (fs == false) {
    drawFlag(ctx, flag, 0, 10, 0.8, 0.5);
  } else {
    drawFlag(ctx, flag, 0, 0, 1, 1);
  }

  //time styling
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.textAlign = 'center';

  //drawing the background time
  if (fs == false) {
    if (enableDate == true) {
      if (dropShadowText == true) {
        ctx.fillStyle = accentColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2 + 2, h / 2 + 12);
        ctx.fillStyle = mainColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2 - 2, h / 2 + 8);
      } else {
        ctx.fillStyle = mainColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2, h / 2 + 14);
      }
    } else {
      if (dropShadowText == true) {
        ctx.fillStyle = accentColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2 + 2, h / 2 + 20);
        ctx.fillStyle = mainColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2 - 2, h / 2 + 16);
      } else {
        ctx.fillStyle = mainColor;
        ctx.fillText(time(zeroInHour, militaryTime), w / 2, h / 2 + 18);
      }
    }
  } else {
    if (dropShadowText == true) {
      ctx.fillStyle = accentColor;
      ctx.fillText(time(zeroInHour, militaryTime), w / 2 + 2, h / 2 - 26);
      ctx.fillStyle = mainColor;
      ctx.fillText(time(zeroInHour, militaryTime), w / 2 - 2, h / 2 - 30);
    } else {
      ctx.fillStyle = mainColor;
      ctx.fillText(time(zeroInHour, militaryTime), w / 2, h / 2 - 28);
    }
  }

  //date styling
  //ctx.font = '30px bolder Bitham';
  //ctx.font = '42px light Bitham';
  //ctx.font = '21px Roboto';
  //ctx.font = '18px bold Gothic';
  //ctx.font = '24px bold Gothic';
  ctx.font = '28px bold Gothic';

  //draw date
  if (enableDate == true){
    if (fs == false) {
      ctx.fillStyle = mainColor;
      ctx.fillText(date(), w / 2, h / 2 + 52);
    } else {
      ctx.fillStyle = mainColor;
      ctx.fillText(date(), w / 2, h / 2 + 20);
    }
  }
});

rocky.on('secondchange', function(event) {
  rocky.requestDraw();
});