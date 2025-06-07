export class DialogueManager {
  constructor(ctx) {
    this.ctx = ctx;
    this.active = false;
    this.text = '';
  }

  show(text) {
    this.text = text;
    this.active = true;
    this.render();
  }

  hide() {
    this.active = false;
  }

  render() {
    if (this.active) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
      this.ctx.fillRect(10, 340, 460, 80);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '14px monospace';
      this.ctx.fillText(this.text, 20, 380);
    }
  }
}