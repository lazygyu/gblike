import { Screen } from './graphic';

let scr:Screen;
let t:any = null;

function update(time:number) {
  const ang = ((time / 50) % 360) * (Math.PI / 180);
  scr.beginScene();
  scr.fill(0);
  scr.line(80, 72, (Math.sin(ang) * 120 + 80)|0, (Math.cos(ang) * 120 + 72)|0, 3);
  scr.endScene();
  t.innerText = ang * (180/Math.PI);
  requestAnimationFrame(update);
}

window.onload = () => {
  scr = new Screen(document.querySelector('#canv') as HTMLCanvasElement);
  t = document.querySelector('#log');
  requestAnimationFrame(update);
}