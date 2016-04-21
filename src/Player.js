const zeroFunc = () => 0;

class Player {
  isPlaying = false;

  constructor({
    x     = zeroFunc,
    y     = zeroFunc,
    plot  = zeroFunc,
    dt    = 0.1,
    t0    = 0
  }) {
    this.x = x;
    this.y = y;
    this.plot = plot;
    this.dt = dt;
    this.t0 = t0;
    this.t = this.t0;
    this.TIMEOUT = dt * 1000;
  }

  play() {
    this.isPlaying = true;

    let player = this;
    setTimeout(function plot() {
      if (!player.isPlaying) return;
      player.t += player.dt;
      const { x, y, t } = player;
      player.plot(x(t), y(t), t);
      setTimeout(plot, player.TIMEOUT);
    }, player.TIMEOUT);
  }

  pause() {
    this.isPlaying = false;
  }

  reset() {
    this.t = this.t0;
  }

  start() {
    this.pause();
    this.reset();
    this.play();
  }

  stop() {
    this.pause();
    this.reset();
  }
}

export default Player;
