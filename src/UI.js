const emptyHandler = () => {};

class UI {
  isPlaying = false;
  constructor(el, {
    onPause = emptyHandler,
    onPlay = emptyHandler,
    onReset = emptyHandler
  }) {
    this.el = document.getElementById(el);
    this.onPause = onPause;
    this.onPlay = onPlay;
    this.onReset = onReset;

    this.render();
  }

  render() {
    let playButton = document.createElement('BUTTON');
    let resetButton = document.createElement('BUTTON');

    playButton.textContent = 'Play';
    resetButton.textContent = 'Reset';

    playButton.addEventListener('click', e => {
      if (this.isPlaying) {
        this.isPlaying = false;
        playButton.textContent = 'Play';
        this.onPause();
      } else {
        this.isPlaying = true;
        playButton.textContent = 'Pause';
        this.onPlay();
      }
    });

    resetButton.addEventListener('click', e => {
      this.onReset();
    });

    this.el.appendChild(playButton);
    this.el.appendChild(resetButton);

  }
}

export default UI;
