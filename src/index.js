require("./css/index.less");
import Skier from './Skier';
import Player from './Player';
import UI from './UI';

const w = 2;
const A = 15;
const pi = 180;
const { sin, cos, pow } = Math;

const defaultProps = {
  x0: 0,
  A: 1,
  power: 1,
  w: 1,
  phi: 0
};

const lawsOfMotion = {
  // foot:     lawOfMotion({ A: 0 }),
  leg:      lawOfMotion(),
  neck:     lawOfMotion(),
  // hip:      lawOfMotion(),
  // loin:     lawOfMotion(),
  // back:     lawOfMotion(),
  // arm:      lawOfMotion(),
  // forearm:  lawOfMotion(),
  // pole:     lawOfMotion(),
};

lawsOfMotion.neck = lawsOfMotion.back;

const draw = SVG('canvas');
const man = new Skier('Dima', {
  onMove: updateBone,
  position: {
    x: canvas.offsetWidth / 2,
    y: 100
  }
});

const players = gatherPlayers(lawsOfMotion);
console.log('players');
console.log(players);

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

function gatherPlayers(laws) {
  let players = [];
  for (let key in laws) {
    const bone = man.bones[key];

    if (!bone) {
      console.warn(`Bone ${key} isn't present in ${man.name}`);
      continue;
    }

    const player = new Player({
      x: laws[key],
      plot: x => bone.rotate(x)
    });

    players.push(player);
  }
  return players;
}


function lawOfMotion(props) {
  const { x0, A: Amp, power, w: freq , phi } = { ...defaultProps, ...props };
  return t => x0 + Amp * A * pow(sin(freq * w * t + phi), power);
}

function logBones() {
  document.getElementById('log').textContent = man;
}

function drawMan() {
  man.bones.neck.head =
    draw
      .circle(30)
      .center(man.bones.neck.end.x, man.bones.neck.end.y);

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
