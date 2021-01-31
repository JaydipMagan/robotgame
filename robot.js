class Robot{

    // Position
    i;
    j;

    // Dimensions
    size;

    // Direction
    NORTH = 0;
    EAST = 1;
    SOUTH = 2;
    WEST = 3;
    faceDirection;

    constructor(i,j,size){
        this.i=i;
        this.j=j;
        this.size = size;
        this.direction = this.WEST;
    }


    move(key,cell){
        console.log(cell);
        if(key==UP_ARROW){
            if(!cell.walls[this.NORTH]){
                this.faceDirection = this.NORTH;
                this.j-=1;
            }
        }
        if(key==LEFT_ARROW){
            if(!cell.walls[this.WEST]){
                this.faceDirection = this.WEST;
                this.i-=1;
            }
        }
        if(key==DOWN_ARROW){
            if(!cell.walls[this.SOUTH]){
                this.faceDirection = this.SOUTH;
                this.j+=1;
            }
        }
        if(key==RIGHT_ARROW){
            if(!cell.walls[this.EAST]){
                this.faceDirection = this.EAST;
                this.i+=1;
            }
        }
    }

    render(){
        let x = this.i * this.size;
        let y = this.j * this.size;
        noStroke();
        fill("red");
        rect(x,y,this.size,this.size);
        fill("blue");
        rect(x+(this.size*0.25),y,this.size*0.5,this.size*0.5);
    }
}