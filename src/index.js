require("./css/index.less");
import Body from './Body';
import Player from './Player';
import UI from './UI';

const w = 2;
const A = 15;

const draw = SVG('canvas');
const man = new Body('Dima', {
  onMove: updateBone,
  position: {
    x: canvas.offsetWidth / 2,
    y: 100
  }
});

const players = [];
// man.forEachBone((bone) => {
const player1 = new Player({
  x: (t) => A * Math.sin(w * t),
  plot: (x, y, t) => {
    man.bones.hip.rotate(x);
  }
});

const player2 = new Player({
  x: (t) => 180 - 15 - A * Math.sin(w * t),
  plot: (x, y, t) => {
    man.bones.neck.rotate(x);
  }
});

players.push(player1);
players.push(player2);


const ui = new UI('ui', {
  onPlay: () => {
    players.forEach(p => p.play());
  },
  onPause: () => {
    players.forEach(p => p.pause());
  },
  onReset: () => {
    players.forEach(p => p.reset());
  }
});

logBones();
drawMan();

function logBones() {
  document.getElementById('log').textContent = man;
}

function drawMan() {
  man.bones.neck.head = draw.circle(30).center(man.bones.neck.end.x, man.bones.neck.end.y);

  man.forEachBone((bone, key) => {
    if (key === 'neck') return;

    const { x: x0, y: y0 } = bone.start;
    const { x: x1, y: y1 } = bone.end;

    var line = draw.line(x0, y0, x1, y1)
      .stroke({ width: 10 })
      .attr('stroke-linecap', 'round')
      ;

    if (key === 'pole') line.stroke({ width: 2 })
    bone.line = line;
  });
}

function updateBone(e) {
  console.log('Updating bone ' + e.target.name);
  const bone = e.target;
  const { x: x0, y: y0 } = bone.start;
  const { x: x1, y: y1 } = bone.end;

  if (bone.name === 'neck') {
    bone.head.center(x1, y1);
    return;
  };



  bone.line.plot(x0, y0, x1, y1);

  logBones();
}

window.players = players;
window.man = man;
