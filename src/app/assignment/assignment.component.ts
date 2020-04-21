import { Component, OnInit, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  column;
  rows;
  completeArray;
  heroPosition;
  moves:number=0;
  constructor() { }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      console.log(this.heroPosition , this.column.length);
      if(this.heroPosition % this.column.length !==0){
        this.heroPosition++;
        this.removeenemy();
        this.moves++;
      }
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      if(this.heroPosition - this.column.length>0)
      {
        this.heroPosition = this.heroPosition - this.column.length;
        this.removeenemy();
        this.moves++;
      }
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      if(this.heroPosition + this.column.length<=this.completeArray.length)
      {
        this.heroPosition = this.heroPosition + this.column.length;
        this.removeenemy();
        this.moves++;
      }
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if((this.heroPosition-1) % this.column.length !==0){
        this.heroPosition--;
        this.removeenemy();
        this.moves++;
      }
    }
  }

removeenemy = () =>{
  this.completeArray[this.heroPosition-1]=0;
  if(this.completeArray.indexOf(1)==-1)
  {
    alert(`Game Over. Total moves to save princes : ${this.moves}`);
  }
}
  ngOnInit() {
    this.column = new Array(parseInt(prompt('Please enter column number','')));
    this.rows = new Array(parseInt(prompt('Please enter rows number','')));
    this.createCompleteArray();
  }

  createCompleteArray = () =>{
    const length = this.column.length*this.rows.length;
    const enemys = this.generateEnemys(length,[]);
    this.completeArray= new Array(length).fill(0).map((data,index)=>enemys.indexOf(index)!=-1?1:0);
    this.heroPosition = this.getHeroPosition(length);
  }
  getHeroPosition = (length) =>{
    const half = Math.round(length/2);
    if( this.column.length % 2 == 0)
    {
      return half - this.column.length / 2
    }
    else{
    return  half;
    }
    
  }
  generateEnemys = (length,tempArray)=>{
    const numbers = Math.round(Math.sqrt(length)); //this.getHeroPosition(length)
    const random = this.randomGenerator(length);
    console.log(random,this.getHeroPosition(length));
    if(tempArray.indexOf(random)==-1 && random!==this.getHeroPosition(length)-1){
      console.log('inside');
      tempArray.push(random);
      if(tempArray.length==numbers)
      {
        return tempArray;
      }
    }
   return this.generateEnemys(length,tempArray)
  }

  randomGenerator = (num)=>{
    return Math.floor(Math.random() * num);
  }
}
