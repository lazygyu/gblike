import { Colors, GameObject, Sprite } from './graphic.js';

enum CharacterState  {
  idle,
  walk,
  run,
  jumpUp,
  doubleJump,
  fall
};

class Character extends GameObject {
  x: number;
  y: number;
  width: number = 5;
  height: number = 5;
  speed: number = 3;
  velocityX: number = 0;
  velocityY: number = 0;
  state: CharacterState;

  private elapsed: number = 0;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.state = CharacterState.idle;
  }

  update(delta: number): void{
    this.elapsed += delta;
  }

  render(screen){}
}