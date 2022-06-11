import DungeonShooters from './game';
import './style.css'

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const game = new DungeonShooters(canvas);
game.start();
