export const Colors = [
  { r: 31, g: 31, b: 31 },
  { r: 77, g: 83, b: 60 },
  { r: 139, g: 149, b: 109 },
  { r: 196, g: 207, b: 161 }
];

export class Sprite{
  width: number;
  height: number;
  length : number;
  data : Array<number>;
  constructor(opt:any) {
    this.width = opt.width;
    this.height = opt.height;
    this.length = opt.width * opt.height;
    this.data = opt.data;
  }
}

export class GameObject {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(opt:any) {
    this.x = opt.x | 0;
    this.y = opt.y | 0;
    this.width = opt.width | 0;
    this.height = opt.height | 0;
  }

  hasCollision(obj:GameObject) : boolean {
    const tR: number = this.x + this.width,
      oR:number = obj.x + obj.width,
      tB: number = this.y + this.height,
      oB:number = obj.y + obj.height;
    return this.x <= oR && tR >= obj.x && this.y <= oB && tB >= obj.y;
  }
}

export class Screen{
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  buffer: ImageData;
  width: number;
  height: number;

  constructor(canv:HTMLCanvasElement) {
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

  fill(c:number) {
    for (let i: number = 0, l: number = this.buffer.data.length; i < l; i += 4){
      this.buffer.data[i] = Colors[c].r;
      this.buffer.data[i+1] = Colors[c].g;
      this.buffer.data[i+2] = Colors[c].b;
    }
  }

  endScene() {
    this.ctx.putImageData(this.buffer, 0, 0);
  }


  putPixel(x:number, y:number, c:number) {
    const t:number = (x + (y * this.buffer.width)) * 4;
    this.buffer.data[t] = Colors[c].r;
    this.buffer.data[t+1] = Colors[c].g;
    this.buffer.data[t+2] = Colors[c].b;
  }

  putSprite(spr:Sprite, x:number, y:number) {
    let xx:number = x, yy:number = y;
    for (let i:number = 0; i < spr.length; i++){
      if (i > 0 && i % spr.width == 0) {
        xx = x; yy++;
      } else {
        xx++;
      }
      if(!(spr.data[i] & 0x80)) this.putPixel(xx, yy, spr.data[i]&0x03);
    }
  }
}