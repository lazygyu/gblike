const Colors = [
  { r: 31, g: 31, b: 31 },
  { r: 77, g: 83, b: 60 },
  { r: 139, g: 149, b: 109 },
  { r: 196, g: 207, b: 161 }
];

class Sprite{
  constructor(opt) {
    this.width = opt.width;
    this.height = opt.height;
    this.length = opt.width * opt.height;
    this.data = opt.data;
  }
}

class GameObject {
  constructor(opt) {
    this.x = opt.x | 0;
    this.y = opt.y | 0;
    this.width = opt.width | 0;
    this.height = opt.height | 0;
  }

  hasCollision(obj) {
    const tR = this.x + this.width, oR = obj.x + obj.width,
      tB = this.y + this.height, oB = obj.y + obj.height;
    return this.x <= oR && tR >= obj.x && this.y <= oB && tB >= obj.y;
  }
}

class Screen{
  constructor(canv) {
    this.canvas = canv? canv : document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.buffer = null;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  beginScene() {
    this.buffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.buffer.data.fill(255);
  }

  endScene() {
    this.ctx.putImageData(this.buffer);
  }

  putPixel(x, y, c) {
    const t = (x + (y * this.buffer.width)) * 4;
    this.buffer.data[t] = Colors[c].r;
    this.buffer.data[t+1] = Colors[c].g;
    this.buffer.data[t+2] = Colors[c].b;
  }

  putSprite(spr, x, y) {
    let xx = x, yy = y;
    for (let i = 0, l = spr.width * spr.height; i < l; i++){
      if (i > 0 && i % spr.width == 0) {
        xx = x; yy++;
      } else {
        xx++;
      }
      if(!data[i]&0x80) putPixel(xx, yy, spr.data[i]&0x03);
    }
  }
}