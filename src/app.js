import { Screen } from './graphic.ts';

let scr = null;

function update(time) {
  scr.beginScene();
  scr.fill( ((time / 250) | 0) % 4);
  scr.endScene();
  requestAnimationFrame(update);
}

window.onload = () => {
  scr = new Screen(document.querySelector('#canv'));
  requestAnimationFrame(update);
}