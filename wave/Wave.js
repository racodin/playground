import { Point } from './Point.js';

export class Wave {
  constructor(index, totalPoints, color){
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init(){
    // this.point = new Point(this.centerX, this.centerY);

    this.points = [];
    
    for(let i=0; i<this.totalPoints; i++){
      const point = new Point(this.index + i, this.pointGap * i, this.centerX);
      this.points[i] = point;
    }
  }

  draw(context){
    context.beginPath();
    context.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    context.moveTo(prevX, prevY);

    for(let i=1; i<this.totalPoints; i++){
      if(i < this.totalPoints - 1){
        this.points[i].update();
      }
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      context.arc(prevX, prevY, 10, 0, Math.PI * 2);
      // context.lineTo(cx, cy);
      // context.quadraticCurveTo(prevX, prevY, cx, cy);
      
      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    context.lineTo(prevX, prevY);
    context.lineTo(this.stageWidth, this.stageHeight);
    context.lineTo(this.points[0].x, this.stageHeight);
    context.fill();
    context.closePath();
    context.stroke();
  }
}