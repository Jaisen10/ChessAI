/* WHAT I NEED TO DO:
 * 
 * Configure it to computer moves / human moves (no flip screen)
 * Random moves
 * Weight assignments for each piece in each square
 * ERROR: I can castle with my pieces there (for example, I can castle as first move)
 * 
 */


class ChessList
{

  static boardFlips = 1;

  constructor()
  {
    this.mode = 2;  // this is to determine whether board flips, etc.
    this.turn = 2;
    this.whiteCastleRight = 1;
    this.whiteCastleLeft = 1;
    this.blackCastleRight = 1;
    this.blackCastleLeft = 1;
    this.highlight = 0;
    this.highlight2 = -1;
    this.red = 0;
    this.redCount = 0;
    this.game = 1;
    this.drawCount = 0;
    this.movesList = [];
    this.pause = 0;
    this.thePiecesArray = initializeBoard();
   }

   changeTurn()
    {
      if (this.turn == 2) {this.turn = 1;} else {this.turn = 2;}
    }

    
    
    drawIm()
    {
      const arr = [];
      
      for (let i = 0; i < this.thePiecesArray.length; i++)
      {
        if (this.thePiecesArray[i].isAlive == 1 && this.thePiecesArray[i].type != 6)
        {
          arr[arr.length] = this.thePiecesArray[i];
        }
      }
      
      if (arr.length == 0) {return true;}
      
      if (arr.length == 1) {return arr[0].type == 2 || arr[0].type == 3;}
      
      return arr.length == 2 && arr[0].type == 3 && arr[1].type == 3 && (arr[0].x + arr[0].y) % 2 == (arr[1].x + arr[1].y) % 2;
      
    }
    
    
    anyPieceGoTo(x, y, color)
    {
      for (let i=0; i<this.thePiecesArray.length; i++)
        {
          if (!(this.thePiecesArray[i].color == color) && this.canGoTo(i, x, y))
          {
            return true;
          }
        }
        return false;
    }
    
    
    inCheck(color)
    {
        let x = 1;
        let y = 1;

        for (let i=0; i < this.thePiecesArray.length; i++)
        {
            if (this.thePiecesArray[i].color == color && this.thePiecesArray[i].type == 6)
            {
                x = this.thePiecesArray[i].x;
                y = this.thePiecesArray[i].y;
            }
        }

        return this.anyPieceGoTo(x, y, color);
    }
    
   inRealStalemate(color)
    {
        return this.inStalemate(color) && !this.inCheck(color);
    }

    inStalemate(color)
    {
        let x = 1;
        let y = 1;

        for (let i=0; i<this.thePiecesArray.length; i++)
        {
            if (this.thePiecesArray[i].color==color)
            {
              
                x = this.thePiecesArray[i].x;
                y = this.thePiecesArray[i].y;

                for (let xPos = 1; xPos < 9; xPos++)
                {
                    for (let yPos = 1; yPos < 9; yPos++)
                    {
                        if (this.canMoveTo(i, xPos, yPos))
                        {
                          return false;
                        }
                    }
                }
            }
        }
        return true;
    }
 
    inMate(color)
    {
        return this.inCheck(color) && this.inStalemate(color);
    }

    pieceThere(x, y, color)
    {
      for (let i=0; i<this.thePiecesArray.length; i++)
        {
            if (this.thePiecesArray[i].color == color && this.thePiecesArray[i].x==x && this.thePiecesArray[i].y==y && this.thePiecesArray[i].isAlive == 1)
            {
                return true;
            }
        }

        return false;
    }
  

    moveTo(i, x, y)
    {
      this.thePiecesArray[i].x = x;
      this.thePiecesArray[i].y = y;
    }

    
    promotePawn(i, t)
    {
      this.thePiecesArray[i].type = t;
    }


     
    realMoveTo(i, x, y)
    {

      this.drawCount++;

      for (let z = 0; z < this.thePiecesArray.length; z++)
      {
        if (this.thePiecesArray[z].x == x && this.thePiecesArray[z].y == y) {this.thePiecesArray[z].isAlive = 0; this.drawCount = 0; this.movesList = [];}
            
        if (this.thePiecesArray[i].type == 1 && this.thePiecesArray[i].x != x && this.thePiecesArray[z].x == x && this.thePiecesArray[i].y == this.thePiecesArray[z].y && this.thePiecesArray[z].passant == 1)
        {this.thePiecesArray[z].isAlive = 0; this.drawCount = 0; this.movesList = [];}
      }
          
      if (this.thePiecesArray[i].type == 1) {this.drawCount = 0;}
          
      if (this.thePiecesArray[i].type == 6 && Math.abs(x - this.thePiecesArray[i].x) == 2)
      {
        for (let z = 0; z < this.thePiecesArray.length; z++)
        {
          if (this.thePiecesArray[z].type == 4 && this.thePiecesArray[z].color == this.thePiecesArray[i].color && ((this.thePiecesArray[z].x > this.thePiecesArray[i].x) == (x > this.thePiecesArray[i].x)))
          {
            this.realMoveTo(z, x+(Math.abs(this.thePiecesArray[i].x - x) / (this.thePiecesArray[i].x - x)), this.thePiecesArray[z].y, this.thePiecesArray);
          }
        }
      }

      if (x==1 && y==1) {this.blackCastleLeft = 0;}
      if (x==8 && y==1) {this.blackCastleRight = 0;}
      if (x==1 && y==8) {this.whiteCastleLeft = 0;}
      if (x==8 && y==8) {this.whiteCastleRight = 0;}
      
      if (this.thePiecesArray[i].type == 4 && this.thePiecesArray[i].x == 1 && this.thePiecesArray[i].y == 1 && this.thePiecesArray[i].color == 1) {this.blackCastleLeft = 0;}
      if (this.thePiecesArray[i].type == 4 && this.thePiecesArray[i].x == 8 && this.thePiecesArray[i].y == 1 && this.thePiecesArray[i].color == 1) {this.blackCastleRight = 0;}
      if (this.thePiecesArray[i].type == 4 && this.thePiecesArray[i].x == 1 && this.thePiecesArray[i].y == 8 && this.thePiecesArray[i].color == 2) {this.whiteCastleLeft = 0;}
      if (this.thePiecesArray[i].type == 4 && this.thePiecesArray[i].x == 8 && this.thePiecesArray[i].y == 8 && this.thePiecesArray[i].color == 2) {this.whiteCastleRight = 0;}
      
      if (this.thePiecesArray[i].type == 6 && this.thePiecesArray[i].color == 2) {this.whiteCastleLeft = 0; this.whiteCastleRight = 0;}
      if (this.thePiecesArray[i].type == 6 && this.thePiecesArray[i].color == 1) {this.blackCastleLeft = 0; this.blackCastleRight = 0;}
                
      for (let j = 0; j < this.thePiecesArray.length; j++) {this.thePiecesArray[j].passant = 0;}
      
      if (this.thePiecesArray[i].type == 1 && Math.abs(this.thePiecesArray[i].y - y) == 2) {this.thePiecesArray[i].passant = 1;}
      
      if (this.thePiecesArray[i].type == 1) {this.movesList = [];}
      

      this.thePiecesArray[i].x = x;
      this.thePiecesArray[i].y = y;

    }

    
    

    canMoveTo(i, newX, newY)
    {
        let x = this.thePiecesArray[i].x;
        let y = this.thePiecesArray[i].y;
        let ic = 999;

        if (this.canGoTo(i, newX, newY) == true)
        {
          for (let j = 0; j < this.thePiecesArray.length; j++)
          {
            if (this.thePiecesArray[j].x == newX && this.thePiecesArray[j].y == newY && this.thePiecesArray[j].isAlive == 1) {this.thePiecesArray[j].isAlive = 0; ic = j;}
             
            if (this.thePiecesArray[i].type == 1 && this.thePiecesArray[i].x != newX && this.thePiecesArray[j].x == newX && this.thePiecesArray[j].y == this.thePiecesArray[i].y && this.thePiecesArray[j].passant == 1 && this.thePiecesArray[j].isAlive == 1)
            {this.thePiecesArray[j].isAlive = 0; ic = j;}
          }  
          this.moveTo(i, newX, newY);
          
          if (this.inCheck(this.thePiecesArray[i].color))
          {
            this.moveTo(i, x, y);
            if (ic < 500) {this.thePiecesArray[ic].isAlive = 1;}
            return false;
          }
          this.moveTo(i, x, y);
          if (ic < 500) {this.thePiecesArray[ic].isAlive = 1;}
          return true;
        }

        return false;
    }
    

    
    
    canGoTo(i, newX, newY)   // the big transition function
    { 
      
        if (newX > 8 || newX < 1 || newY > 8 || newY < 1 || this.thePiecesArray[i].isAlive == 0) {return false;}

        if (this.thePiecesArray[i].type == 1) // pawn
        {
            if (this.thePiecesArray[i].color == 1) // black
            {
                if (newX == this.thePiecesArray[i].x && newY == this.thePiecesArray[i].y+1)
                {
                    return !this.pieceThere(newX, newY, 1) && !this.pieceThere(newX, newY, 2);
                }

                if (this.thePiecesArray[i].y == 2 && newY == this.thePiecesArray[i].y+2 && newX == this.thePiecesArray[i].x)
                {
                    if (this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y+1, 1) || this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y+1, 2)) {return false;}

                    return !this.pieceThere(newX, newY, 1) && !this.pieceThere(newX, newY, 2);
                }

                if (Math.abs(newX - this.thePiecesArray[i].x) == 1 && newY - this.thePiecesArray[i].y == 1)
                {

                  if (!this.pieceThere(newX, newY, 2))
                  {
                    
                    for (let j = 0; j < this.thePiecesArray.length; j++)
                    {
                      if (this.thePiecesArray[j].color == 2 && this.thePiecesArray[j].passant == 1 && this.thePiecesArray[j].x == newX && this.thePiecesArray[j].y == this.thePiecesArray[i].y) {return true;}
                    }
                    return false;
                  }
             
                  return this.pieceThere(newX, newY, 2) && !this.pieceThere(newX, newY, 1);
                }
            }

            if (this.thePiecesArray[i].color == 2) // white
            {
                if (newX == this.thePiecesArray[i].x && newY == this.thePiecesArray[i].y-1)
                {
                    return !this.pieceThere(newX, newY, 1) && !this.pieceThere(newX, newY, 2);
                }

                if (this.thePiecesArray[i].y == 7 && newY == this.thePiecesArray[i].y-2 && newX == this.thePiecesArray[i].x)
                {
                    if (this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y-1, 1) || this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y-1, 2)) {return false;}

                    return !this.pieceThere(newX, newY, 1) && !this.pieceThere(newX, newY, 2);
                }

                if (Math.abs(newX - this.thePiecesArray[i].x) == 1 && this.thePiecesArray[i].y - newY == 1)
                {
                  
                  if (!this.pieceThere(newX, newY, 1))
                  {
                    for (let j = 0; j < this.thePiecesArray.length; j++)
                    {
                      if (this.thePiecesArray[j].color == 1 && this.thePiecesArray[j].passant == 1 && this.thePiecesArray[j].x == newX && this.thePiecesArray[j].y == this.thePiecesArray[i].y) {return true;}
                    }
                    
                    return false;
                  }  
                  
                  return this.pieceThere(newX, newY, 1) && !this.pieceThere(newX, newY, 2);
                }
            }
        }

        if (this.thePiecesArray[i].type == 2) // knight
        {
            if ((Math.abs(newX - this.thePiecesArray[i].x) == 1 && Math.abs(newY - this.thePiecesArray[i].y) == 2) || (Math.abs(newX - this.thePiecesArray[i].x) == 2 && Math.abs(newY - this.thePiecesArray[i].y) == 1))
            {              
              return !this.pieceThere(newX, newY, this.thePiecesArray[i].color);
              ;
            }

            return false;
        }

        if (this.thePiecesArray[i].type == 3) // bishop
        {
            if (!(Math.abs(newX - this.thePiecesArray[i].x) / Math.abs(newY - this.thePiecesArray[i].y) == 1)) {return false;}

            let numX = (newX - this.thePiecesArray[i].x) / Math.abs(newX - this.thePiecesArray[i].x);
            let numY = (newY - this.thePiecesArray[i].y) / Math.abs(newY - this.thePiecesArray[i].y);

            for (let j = 1; j < Math.abs(newX - this.x); j++)
            {
                if (this.pieceThere(this.thePiecesArray[i].x + numX*j, this.thePiecesArray[i].y + numY*j, 1)) {return false;}
                if (this.pieceThere(this.thePiecesArray[i].x + numX*j, this.thePiecesArray[i].y + numY*j, 2)) {return false;}
            }

            return !this.pieceThere(newX, newY, this.thePiecesArray[i].color);
        }

        if (this.thePiecesArray[i].type == 4) // rook
        {
            if (!(newX == this.thePiecesArray[i].x ^ newY == this.thePiecesArray[i].y)) {return false;}

            let num;

            for (let j = 1; j < Math.max(Math.abs(newX - this.thePiecesArray[i].x), Math.abs(newY - this.thePiecesArray[i].y)); j++)
            {
                if (newY == this.thePiecesArray[i].y)
                {
                    num = (newX - this.thePiecesArray[i].x) / Math.abs(newX - this.thePiecesArray[i].x);

                    if (this.pieceThere(this.thePiecesArray[i].x + num*j, this.thePiecesArray[i].y, 1) || this.pieceThere(this.thePiecesArray[i].x + num*j, this.thePiecesArray[i].y, 2)) {return false;}
                }

                if (newX == this.thePiecesArray[i].x)
                {
                    num = (newY - this.thePiecesArray[i].y) / Math.abs(newY - this.thePiecesArray[i].y);

                    if (this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y + num*j, 1) || this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y + num*j, 2)) {return false;}
                }
            }

            return !this.pieceThere(newX, newY, this.thePiecesArray[i].color);
        }

        if (this.thePiecesArray[i].type == 5) // queen
        {
            if (!(newX == this.thePiecesArray[i].x ^ newY == this.thePiecesArray[i].y) && !(Math.abs(newX - this.thePiecesArray[i].x) / Math.abs(newY - this.thePiecesArray[i].y) == 1)) {return false;}

            if (newX == this.thePiecesArray[i].x || newY == this.thePiecesArray[i].y)
            {
                let num;

                for (let j = 1; j < Math.max(Math.abs(newX - this.thePiecesArray[i].x), Math.abs(newY - this.thePiecesArray[i].y)); j++)
                {
                    if (newY == this.thePiecesArray[i].y)
                    {
                        num = (newX - this.thePiecesArray[i].x) / Math.abs(newX - this.thePiecesArray[i].x);

                        if (this.pieceThere(this.thePiecesArray[i].x + num*j, this.thePiecesArray[i].y, 1) || this.pieceThere(this.thePiecesArray[i].x + num*j, this.thePiecesArray[i].y, 2)) {return false;}
                    }

                    if (newX == this.thePiecesArray[i].x)
                    {
                        num = (newY - this.thePiecesArray[i].y) / Math.abs(newY - this.thePiecesArray[i].y);

                        if (this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y + num*j, 1) || this.pieceThere(this.thePiecesArray[i].x, this.thePiecesArray[i].y + num*j, 2)) {return false;}
                    }
                }
            }

            else
            {
                let numX = (newX - this.thePiecesArray[i].x) / Math.abs(newX - this.thePiecesArray[i].x);
                let numY = (newY - this.thePiecesArray[i].y) / Math.abs(newY - this.thePiecesArray[i].y);

                for (let j = 1; j < Math.abs(newX - this.thePiecesArray[i].x); j++)
                {
                    if (this.pieceThere(this.thePiecesArray[i].x + numX*j, this.thePiecesArray[i].y + numY*j, 1)) {return false;}
                    if (this.pieceThere(this.thePiecesArray[i].x + numX*j, this.thePiecesArray[i].y + numY*j, 2)) {return false;}
                }
            }

            return !this.pieceThere(newX, newY, this.thePiecesArray[i].color);
        }

        if (this.thePiecesArray[i].type == 6) // king
        {
          

          
          if (newY == this.thePiecesArray[i].y && Math.abs(newX - this.thePiecesArray[i].x) == 2)
          {
            if (this.thePiecesArray[i].color == 2 && newX > this.thePiecesArray[i].x && !this.pieceThere(6, 8, 1) && !this.pieceThere(6, 8, 2) && !this.pieceThere(7, 8, 1) && !this.pieceThere(7, 8, 2))
            {
              return this.whiteCastleRight==1 && !this.anyPieceGoTo(5, 8, this.thePiecesArray[i].color) && !this.anyPieceGoTo(6, 8, this.thePiecesArray[i].color) && !this.anyPieceGoTo(7, 8, this.thePiecesArray[i].color);
            }
            
            if (this.thePiecesArray[i].color == 2 && newX < this.thePiecesArray[i].x && !this.pieceThere(4, 8, 1) && !this.pieceThere(4, 8, 2) && !this.pieceThere(3, 8, 1) && !this.pieceThere(3, 8, 2) && !this.pieceThere(2, 8, 1) && !this.pieceThere(2, 8, 2))
            {
              return this.whiteCastleLeft==1 && !this.anyPieceGoTo(5, 8, this.thePiecesArray[i].color) && !this.anyPieceGoTo(4, 8, this.thePiecesArray[i].color) && !this.anyPieceGoTo(3, 8, this.thePiecesArray[i].color);
            }
            
            if (this.thePiecesArray[i].color == 1 && newX > this.thePiecesArray[i].x && !this.pieceThere(6, 1, 1) && !this.pieceThere(6, 1, 2) && !this.pieceThere(7, 1, 1) && !this.pieceThere(7, 1, 2))
            {
              return this.blackCastleRight==1 && !this.anyPieceGoTo(5, 1, this.thePiecesArray[i].color) && !this.anyPieceGoTo(6, 1, this.thePiecesArray[i].color) && !this.anyPieceGoTo(7, 1, this.thePiecesArray[i].color);
            }
            
            if (this.thePiecesArray[i].color == 1 && newX < this.thePiecesArray[i].x && !this.pieceThere(4, 1, 1) && !this.pieceThere(4, 1, 2) && !this.pieceThere(3, 1, 1) && !this.pieceThere(3, 1, 2) && !this.pieceThere(2, 1, 1) && !this.pieceThere(2, 1, 2))
            {
              return this.blackCastleRight==1 && !this.anyPieceGoTo(5, 1, this.thePiecesArray[i].color) && !this.anyPieceGoTo(4, 1, this.thePiecesArray[i].color) && !this.anyPieceGoTo(3, 1, this.thePiecesArray[i].color);
            }
          }
          
          
          return (Math.abs(newX - this.thePiecesArray[i].x) < 2 && Math.abs(newY - this.thePiecesArray[i].y) < 2) && !(newX == this.thePiecesArray[i].x && newY == this.thePiecesArray[i].y) && !this.pieceThere(newX, newY, this.thePiecesArray[i].color);
        }

        return false;
    }
  

}




class Chess
  {
    
    constructor(x, y, type, color)
    {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
        this.passant = 0;
        this.isAlive = 1;
    }
    
}

























const mainList = new ChessList();

drawBoard(mainList);

document.getElementById("board").style.visibility="visible";

mainList.movesList[0] = [];

let game = setInterval(myFunction, 1, mainList);

let c = 0;

for (let t = 0; t < mainList.thePiecesArray.length; t += 1)
{
  mainList.movesList[0][c] = mainList.thePiecesArray[t].x;
  mainList.movesList[0][c+1] = mainList.thePiecesArray[t].y;
  mainList.movesList[0][c+2] = mainList.thePiecesArray[t].type;
  mainList.movesList[0][c+3] = mainList.thePiecesArray[t].isAlive;
  mainList.movesList[0][c+4] = mainList.thePiecesArray[t].passant;
  c += 5;
}
mainList.movesList[0][c] = mainList.blackCastleRight;
mainList.movesList[0][c+1] = mainList.blackCastleLeft;
mainList.movesList[0][c+2] = mainList.whiteCastleRight;
mainList.movesList[0][c+3] = mainList.whiteCastleLeft;
mainList.movesList[1] = 1;





// highlight is the tile the current piece in hand was on; highlight2 is the tile the mouse is hovering over with piece in hand

document.onmousemove = move;
function move(event)
{
  let mouse = 0;
  
  for (let x = 1; x < 9 && mainList.highlight != 0; x++)
  {
    
    for (let y = 1; y < 9; y++)
    {
      let square = x.toString() + "$" + y.toString();
      square = document.getElementById(square);       // gets all the chess tiles
      
      if (mouseIsOver(square, event)) {mainList.highlight2 = square.id; mouse = 1}  // if mouse hovers over a tile, set variable to its id
    }
  }
  if (mouse == 0) {mainList.highlight2 = -1}    // otherwise set variable to -1
  
  for (let i = 0; i < mainList.thePiecesArray.length && mainList.highlight != 0 && mainList.pause == 0; i++)
  {
    let x = mainList.highlight;
    let y = x.charAt(2);
    x = x.charAt(0);
    x = parseInt(x);
    y = parseInt(y);
    
    if (mainList.thePiecesArray[i].x == x && mainList.thePiecesArray[i].y == y)    // if the chess piece is the one that came from highlighted tile (the one in hand)
    {
      x = event.clientX + scrollX - 25;
      y = event.clientY + scrollY - 35;
      y = y.toString() + "px";
      x = x.toString() + "px";
      document.getElementById(i.toString()).style.top=y;   // make chess piece go to mouse x and y
      document.getElementById(i.toString()).style.left=x;
      
      drawBoard(mainList);
    }
  }
}



for(let i=0; i<mainList.thePiecesArray.length; i++)
{
  let element = document.getElementById(i.toString());   // sets element to the chess piece object
  element.onmousedown = down;                            // if mouse clicks chess piece, function down starts
  function down(event)
  {
    if (mainList.game == 1 && mainList.pause == 0)
    {
      let x = event.clientX + scrollX - 25;
      let y = event.clientY + scrollY - 35;
      y = y.toString() + "px";
      x = x.toString() + "px";
      element.style.top=y;
      element.style.left=x;                 // sets x and y of piece to mouse x and y
      let squareId = mainList.thePiecesArray[i].x.toString() + "$" + mainList.thePiecesArray[i].y.toString();
      mainList.highlight = squareId;           // sets the highlight to the id of the tile object
      document.onmouseup = function() {if (mainList.highlight == squareId) {mainList.highlight = 0; mainList.highlight2 = -1; tryToMove(i, mainList);}};
    }
  }
}













function myFunction(mainList)
{
  
  if (mainList.inMate(mainList.turn))
  {
    mainList.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, mainList);
    if (mainList.turn == 1)
    {setTimeout(function () {alert("Game over. White wins!");}, 100);}
    else {setTimeout(function () {alert("Game over. Black wins!");}, 100);}
  }
  
  if (mainList.inRealStalemate(mainList.turn))
  {
    mainList.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, mainList);
    setTimeout(function () {alert("Game over due to stalemate.");}, 100);
  }
  

  if (mainList.drawIm())
  {
    mainList.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, mainList);
    setTimeout(function () {alert("Game over due to insufficient mating material.");}, 100);
  }
  
  if (mainList.drawCount > 99)
  {
    mainList.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, mainList);
    setTimeout(function () {alert("Game over because no piece was captured and no pawn moved in the previous 50 moves.");}, 100);
  }
  
  for (let i = 1; i < mainList.movesList.length; i += 2)
  {
    if (mainList.movesList[i] > 2)
    {
      mainList.game = 0;
      clearInterval(game);
      setInterval(drawBoard, 1, mainList);
      setTimeout(function () {alert("Game over due to repetition.");}, 100);
    }
  }

  drawBoard(mainList);
}






function arrEquals(arr1, arr2)
{
  if (arr1.length != arr2.length) {return false;}
  for (let i = 0; i < arr1.length; i++)
  {
    if (arr1[i] != arr2[i]) {return false;}
  }
  return true;
}




function mouseIsOver(square, event)
{
  let rect = square.getBoundingClientRect();
  if (event.clientX > rect.x && event.clientX < rect.right && event.clientY > rect.y && event.clientY < rect.bottom)
  {
    return true;
  }
  return false;
}







function tryToMove(i, mainList)
{
  let square;
  let theId;
  for(let x=1; x<9; x++)
  {
    for(let y=1; y<9; y++)
    {
      
      theId = x.toString()+"$"+y.toString();
      square = document.getElementById(theId);   // cycles through all of the tiles
      
      if (mouseIsOver(square, event))
      {

        if (mainList.canMoveTo(i, x, y) && mainList.thePiecesArray[i].color == mainList.turn && (mainList.mode == mainList.turn || mainList.mode == 3 || mainList.mode != 3)) // get this figured out (the mainList.mode == 3 thing)
        {
          
          mainList.realMoveTo(i, x, y);
          
          let counter = 1;
          while (counter == 1 && mainList.thePiecesArray[i].type == 1 && ((mainList.thePiecesArray[i].y == 8 && mainList.thePiecesArray[i].color == 1) || (mainList.thePiecesArray[i].y == 1 && mainList.thePiecesArray[i].color == 2)))
          {
            let prom = prompt("What to promote to?");
            if (prom == "knight") {counter = 0; mainList.promotePawn(i, 2);}
            if (prom == "bishop") {counter = 0; mainList.promotePawn(i, 3);}
            if (prom == "rook") {counter = 0; mainList.promotePawn(i, 4);}
            if (prom == "queen") {counter = 0; mainList.promotePawn(i, 5);}
          }
          
          editMove(mainList);
         
          mainList.pause = 1;

          // if () {computerMove(mainList);}    // UNCOMMENT THIS OUT WHEN FIXED

          drawBoard(mainList);

          setTimeout(function() {if (mainList.game == 1) {mainList.pause = 0;} drawBoard(mainList);}, 100);
        } else
        {
          if ((x != mainList.thePiecesArray[i].x || y != mainList.thePiecesArray[i].y) && mainList.game == 1)
          {
            let squareColor = "#e6cdb4";
            if ((x + y) % 2 == 1) {squareColor = "#ab8a68";}
            square.style.backgroundColor="#Bf3232";
            mainList.red = square.id;
            mainList.redCount++;
          
            setTimeout(function()
            {
              mainList.redCount--;
              if (mainList.redCount == 0)
              {
                theId = x.toString()+"$"+y.toString();
                square = document.getElementById(theId);
                square.style.backgroundColor = squareColor;
                mainList.red = 0;
              }
            }, 400);
          }
        }
      }
    }
  }
}

/*



// HERE!!!

function computerMove(piecesList)
{

  let moves = [];

  for(let i = 0; i < piecesList.thePiecesArray.length; i++)
  {
    for (let x = 1; x < 9; x++)
    {
      for (let y = 1; y < 9; y++)
      {

        if (piecesList.thePiecesArray[i].canMoveTo(x, y, thePieces) && piecesList.thePiecesArray[i].color == piecesList.turn) // HERE!!!
        {
         
          moves[moves.length] = [i, x, y]
          let copy = [...piecesList];
          copy[i].realMoveTo(x, y, copy, 1);  // HERE!!!
        }

      }
    }
  }

  let randomNum = Math.floor(Math.random() * moves.length);
  let theMove = moves[randomNum];

  let ii = theMove[0];
  let xx = theMove[1];
  let yy = theMove[2];

  piecesList[ii].realMoveTo(xx, yy, pieces, 0); // here!!!


  if (piecesList.thePiecesArray[ii].type == 1 && ((piecesList.thePiecesArray[ii].y == 8 && piecesList.thePiecesArray[ii].color == 1) || (piecesList.thePiecesArray[ii].y == 1 && piecesList.thePiecesArray[ii].color == 2)))
  {piecesList[ii].promotePawn(5);}  // here!!!
  
  editMove(piecesList);  // here!!!
  drawBoard(piecesList);

  piecesList.pause = 1;
  setTimeout(function() {if (piecesList.game == 1) {piecesList.pause = 0;} drawBoard(piecesList); if (piecesList.mode != 4 && piecesList.game == 1) {computerMove(piecesList);}}, 1);

}









function evaluation(pieces)
{
  let eval = 0;
  for(let i = 0; i < pieces; i++)
  {
    if (pieces[i].color == 1)
    {
      if (pieces[i].type == 6) {eval += 10000}
      if (pieces[i].type == 5) {eval += 900}
      if (pieces[i].type == 4) {eval += 500}
      if (pieces[i].type == 3) {eval += 300}
      if (pieces[i].type == 2) {eval += 300}
      if (pieces[i].type == 1) {eval += 100}
    } else
    {
      if (pieces[i].type == 6) {eval -= 10000}
      if (pieces[i].type == 5) {eval -= 900}
      if (pieces[i].type == 4) {eval -= 500}
      if (pieces[i].type == 3) {eval -= 300}
      if (pieces[i].type == 2) {eval -= 300}
      if (pieces[i].type == 1) {eval -= 100}
    }
  }

  return eval;
}





*/



function editMove(piecesList)
{
  piecesList.movesList[piecesList.movesList.length] = [];
          
  let c = 0;

  for (let t = 0; t < piecesList.thePiecesArray.length; t += 1)
  {
    piecesList.movesList[piecesList.movesList.length-1][c] = piecesList.thePiecesArray[t].x;
    piecesList.movesList[piecesList.movesList.length-1][c+1] = piecesList.thePiecesArray[t].y;
    piecesList.movesList[piecesList.movesList.length-1][c+2] = piecesList.thePiecesArray[t].type;
    piecesList.movesList[piecesList.movesList.length-1][c+3] = piecesList.thePiecesArray[t].isAlive;
    piecesList.movesList[piecesList.movesList.length-1][c+4] = piecesList.thePiecesArray[t].passant;
    c += 5;
  }
          
  piecesList.movesList[piecesList.movesList.length-1][c] = piecesList.blackCastleRight;
  piecesList.movesList[piecesList.movesList.length-1][c+1] = piecesList.blackCastleLeft;
  piecesList.movesList[piecesList.movesList.length-1][c+2] = piecesList.whiteCastleRight;
  piecesList.movesList[piecesList.movesList.length-1][c+3] = piecesList.whiteCastleLeft;
          
  piecesList.movesList[piecesList.movesList.length] = 1;
          
  for (let t = 0; t < piecesList.movesList.length - 2; t += 2)
  {
    if (arrEquals(piecesList.movesList[t], piecesList.movesList[piecesList.movesList.length - 2])) {piecesList.movesList[t+1]++;}
  }
          
  piecesList.changeTurn();
}















function drawBoard(piecesList)
{ 

  if (window.innerWidth >= 480)
  {
    document.body.style.overflowX="hidden";
    document.getElementById("board").style.left="calc(50% - 240px)";
  }
  else
  {
    document.body.style.overflowX="scroll";
    document.getElementById("board").style.left="0px";
  }
  
  if (window.innerHeight >= 480)
  {
    document.body.style.overflowY="hidden";
    document.getElementById("board").style.top="calc(50% - 240px)";
  }
  else
  {
    document.body.style.overflowY="scroll";
    document.getElementById("board").style.top="0px";
  }
  
  if (piecesList.inCheck(2))
 {
   document.getElementById("1").style.textShadow="1px 1px 1.5px #Bf3232, -1px -1px 1.5px #Bf3232, -1px 1px 1.5px #Bf3232, 1px -1px 1.5px #Bf3232";
 }
  else {document.getElementById("1").style.textShadow="";}
  
  if (piecesList.inCheck(1))
  {
    document.getElementById("0").style.textShadow="1px 1px 1.5px #Bf3232, -1px -1px 1.5px #Bf3232, -1px 1px 1.5px #Bf3232, 1px -1px 1.5px #Bf3232";
  }
  else {document.getElementById("0").style.textShadow="";}
  
  const arr1 = document.getElementsByClassName("white");
  const arr2 = document.getElementsByClassName("black");
  
  let xCount;
  let yCount;
  let xPosit;
  let yPosit;
  let rect;
  let thatObject;
  let uni;
  let square;
  
  for (let i = 0; i < arr1.length; i++)
  {
    xPosit = arr1[i].id;
    yPosit = xPosit.charAt(2);
    xPosit = xPosit.charAt(0);
    xPosit = parseInt(xPosit) - 1;
    yPosit = parseInt(yPosit) - 1;

    if (ChessList.boardFlips == 1)
    {
      if (piecesList.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
      if (piecesList.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    }
    
    xPosit *= 60;
    yPosit *= 60;
    
    xPosit = xPosit.toString() + "px";
    yPosit = yPosit.toString() + "px";
    
    arr1[i].style.top=yPosit;
    arr1[i].style.left=xPosit;
  }
  
  for (let i = 0; i < arr2.length; i++)
  {
    xPosit = arr2[i].id;
    yPosit = xPosit.charAt(2);
    xPosit = xPosit.charAt(0);
    xPosit = parseInt(xPosit) - 1;
    yPosit = parseInt(yPosit) - 1;
    
    if (ChessList.boardFlips == 1)
    {
      if (piecesList.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
      if (piecesList.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    }

    xPosit *= 60;
    yPosit *= 60;
   
    xPosit = xPosit.toString() + "px";
    yPosit = yPosit.toString() + "px";
    
    arr2[i].style.top=yPosit;
    arr2[i].style.left=xPosit;
  }

  
  for (let xPos = 1; xPos < 9; xPos++)
  {
    for (let yPos = 1; yPos < 9; yPos++)
    {
      square = document.getElementById(xPos.toString() + "$" + yPos.toString());
      if (piecesList.red != square.id)
      {
        if ((xPos + yPos) % 2 == 1) {square.style.backgroundColor="#ab8a68";}
        else {square.style.backgroundColor="#e6cdb4";}
      }
    }
  }
  

  if (piecesList.highlight != 0)
  {
    document.getElementById(piecesList.highlight).style.backgroundColor="#967694";
    if (piecesList.highlight2 != -1)
    {
      document.getElementById(piecesList.highlight2).style.backgroundColor="#967694";
    }
  }

  for (let i = 0; i < piecesList.thePiecesArray.length && piecesList.highlight == 0; i++)
  {
    xPosit = piecesList.thePiecesArray[i].x - 1;
    yPosit = piecesList.thePiecesArray[i].y - 1;

    if (ChessList.boardFlips == 1)
    {
      if (piecesList.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
      if (piecesList.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    }

    xPosit *= 60;
    yPosit *= 60;
    
    xPosit += 5;
    yPosit -= 5;
    
    if (window.innerWidth >= 480)
    {
      xPosit = xPosit - 240;
      xPosit = "calc(50% + " + xPosit.toString() + "px)";
      document.getElementById(i.toString()).style.left=xPosit;
    }
    else
    {
      xPosit = xPosit.toString() + "px";
      document.getElementById(i.toString()).style.left=xPosit;
    }
    
    if (window.innerHeight >= 480)
    {
      yPosit = yPosit - 240;
      yPosit = "calc(50% + " + yPosit.toString() + "px)";
      document.getElementById(i.toString()).style.top=yPosit;
    }
    else
    {
      yPosit = yPosit.toString() + "px";
      document.getElementById(i.toString()).style.top=yPosit;
    }
    
    if (piecesList.thePiecesArray[i].type == 2 && piecesList.thePiecesArray[i].color == 2) {document.getElementById(i).innerHTML = "&#9816";}
    if (piecesList.thePiecesArray[i].type == 3 && piecesList.thePiecesArray[i].color == 2) {document.getElementById(i).innerHTML = "&#9815";}
    if (piecesList.thePiecesArray[i].type == 4 && piecesList.thePiecesArray[i].color == 2) {document.getElementById(i).innerHTML = "&#9814";}
    if (piecesList.thePiecesArray[i].type == 5 && piecesList.thePiecesArray[i].color == 2) {document.getElementById(i).innerHTML = "&#9813";}

    if (piecesList.thePiecesArray[i].type == 2 && piecesList.thePiecesArray[i].color == 1) {document.getElementById(i).innerHTML = "&#9822";}
    if (piecesList.thePiecesArray[i].type == 3 && piecesList.thePiecesArray[i].color == 1) {document.getElementById(i).innerHTML = "&#9821";}
    if (piecesList.thePiecesArray[i].type == 4 && piecesList.thePiecesArray[i].color == 1) {document.getElementById(i).innerHTML = "&#9820";}
    if (piecesList.thePiecesArray[i].type == 5 && piecesList.thePiecesArray[i].color == 1) {document.getElementById(i).innerHTML = "&#9819";}
    
    if (piecesList.thePiecesArray[i].isAlive == 0)
    {
      document.getElementById(i.toString()).style.display = "none";
    }

  }

}























function initializeBoard()
    {
        const pieces = [];

        pieces[0] = new Chess(5, 1, 6, 1); // black king
        pieces[1] = new Chess(5, 8, 6, 2); // white king

        pieces[2] = new Chess(1, 1, 4, 1); // black pieces
        pieces[3] = new Chess(2, 1, 2, 1);
        pieces[4] = new Chess(3, 1, 3, 1);
        pieces[5] = new Chess(4, 1, 5, 1);
        pieces[6] = new Chess(6, 1, 3, 1);
        pieces[7] = new Chess(7, 1, 2, 1);
        pieces[8] = new Chess(8, 1, 4, 1);

        pieces[9] = new Chess(1, 2, 1, 1); // black pawns
        pieces[10] = new Chess(2, 2, 1, 1);
        pieces[11] = new Chess(3, 2, 1, 1);
        pieces[12] = new Chess(4, 2, 1, 1);
        pieces[13] = new Chess(5, 2, 1, 1);
        pieces[14] = new Chess(6, 2, 1, 1);
        pieces[15] = new Chess(7, 2, 1, 1);
        pieces[16] = new Chess(8, 2, 1, 1);

        pieces[17] = new Chess(1, 8, 4, 2); // white pieces
        pieces[18] = new Chess(2, 8, 2, 2);
        pieces[19] = new Chess(3, 8, 3, 2);
        pieces[20] = new Chess(4, 8, 5, 2);
        pieces[21] = new Chess(6, 8, 3, 2);
        pieces[22] = new Chess(7, 8, 2, 2);
        pieces[23] = new Chess(8, 8, 4, 2);

        pieces[24] = new Chess(1, 7, 1, 2); // white pawns
        pieces[25] = new Chess(2, 7, 1, 2);
        pieces[26] = new Chess(3, 7, 1, 2);
        pieces[27] = new Chess(4, 7, 1, 2);
        pieces[28] = new Chess(5, 7, 1, 2);
        pieces[29] = new Chess(6, 7, 1, 2);
        pieces[30] = new Chess(7, 7, 1, 2);
        pieces[31] = new Chess(8, 7, 1, 2);

        return pieces;
    }
