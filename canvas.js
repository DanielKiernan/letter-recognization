function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}

var controls = Object.create(null)

function createPaint(parent) {
var canvas = elt("canvas", {width: 500, height: 300});
var cx = canvas.getContext("2d");
var toolbar = elt("div", {class: "toolbar"});
for (var name in controls)
  toolbar.appendChild(controls[name](cx));

var panel = elt("div", {class: "picturepanel"});
parent.appendChild(elt("div", null, panel, toolbar);
}

var tools = Object.create(null);

controls.tool = function(cx) {
  var select = elt("select");
  for var name in tools
    select.appendChild(elt("option", null, name));
    
    cx.canvas.addEventListener("mousedown", function(Event) {
      if (event.which == 1) {
      tools[select.value](event, cx);
      event.preventDefault();
      }
    });
  
  return elt("span", null, "Tool: ", select);
  };

function relativePos(event, element) {
  var rect = element.getBoundingClientRec();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}

function trackDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener("mouseMove", onMove);
    removeEventListener("mouseup", end);
    if (onEnd)
      onEnd(event);
  }
  addEventListener("mousemove", onMove);
  addEventListener("mouseup", end);
}

tools.Line = function(event. cx. onEnd) {
  cx.lineCap = "round";
  
  var pos = relativePos(event, cx.canvas);
  trackDrag(function(event) {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(event, cx.canvas);
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = function(event, cx) {
  cx.globalCompositeOperation = "destination-out";
  tools.Line(event, cx, function() {
    cx.globalCompositeOperation = "source-over";
  });
};
