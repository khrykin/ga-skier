require("./css/index.less");
import Body from './Body';

const draw = SVG('canvas');
const man = new Body('Dima', {
  onMove: updateBone,
  position: {
    x: canvas.offsetWidth / 2,
    y: 100
  }
});

logBones();
drawMan();

function logBones() {
  document.getElementById('log').textContent = man;
}

function drawMan() {
  draw.circle(30).center(man.bones.neck.end.x, man.bones.neck.end.y);

  for (let key in man.bones) {
    if (key === 'neck') continue;

    const bone = man.bones[key];
    const { x: x0, y: y0 } = bone.start;
    const { x: x1, y: y1 } = bone.end;

    var line = draw.line(x0, y0, x1, y1)
      .stroke({ width: 10 })
      .attr('stroke-linecap', 'round')
      ;

    if (key === 'pole') line.stroke({ width: 2 })
    bone.line = line;
  }
}

function updateBone(e) {
  console.log('Updating bone ' + e.target.name);

  const bone = e.target;
  const { x: x0, y: y0 } = bone.start;
  const { x: x1, y: y1 } = bone.end;

  bone.line.plot(x0, y0, x1, y1);

  logBones();
}

window.man = man;
