/* WHAT I NEED TO DO:
 * 
 * Configure it to computer moves / human moves (no flip screen)
 * Random moves
 * Weight assignments for each piece in each square
 * ERROR: I can castle with my pieces there (for example, I can castle as first move)
 * 
 *
 * IDEA: 1: Make ALL variables static        2: make another super class for chess lists
 * 
 * 
 */


class ChessList
{
  constructor(x, y, type, color)
  {
    this.mode = 2;
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

    moveTo(i, x, y)
    {
      this.thePiecesArray[i].moveTo(x, y);
    }

}

class Chess
  {
    
    static mode = 2;
    static turn = 2;
    static whiteCastleRight = 1;
    static whiteCastleLeft = 1;
    static blackCastleRight = 1;
    static blackCastleLeft = 1;
    static highlight = 0;
    static highlight2 = -1;
    static red = 0;
    static redCount = 0;
    static game = 1;
    static drawCount = 0;
    static movesList = [];
    static pause = 0;
    
    constructor(x, y, type, color)
    {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
        this.passant = 0;
        this.isAlive = 1;
    }

    static changeTurn()
    {
      if (Chess.turn == 2) {Chess.turn = 1;} else {Chess.turn = 2;}
    }
    
    moveTo(x, y)
    {
      this.x = x;
      this.y = y;
    }
    
    realMoveTo(x, y, arr, reset)
    {

      const a = [...arr];
     
      const drawCountReset = Chess.drawCount;
      const movesListReset = Chess.movesList;
      const blackCastleLeftReset = Chess.blackCastleLeft;
      const blackCastleRightReset = Chess.blackCastleRight;
      const whiteCastleLeftReset = Chess.whiteCastleLeft;
      const whiteCastleRightReset = Chess.whiteCastleRight;


      Chess.drawCount++;
        

      for (let z = 0; z < a.length && reset == 1; z++)
      {
        if (reset==1)
        {
        a[z].isAlive = 0;
        }
      }

      if (reset == 1)
      {
        Chess.drawCount = drawCountReset;
        Chess.movesList = movesListReset;
        Chess.blackCastleLeft = blackCastleLeftReset;
        Chess.blackCastleRight = blackCastleRightReset;
        Chess.whiteCastleLeft = whiteCastleLeftReset;
        Chess.whiteCastleRight = whiteCastleRightReset;
        return;
      }
      
      


      for (let z = 0; z < a.length; z++)
      {

        if (a[z].x == x && a[z].y == y) {a[z].isAlive = 0; Chess.drawCount = 0; Chess.movesList = [];}
            
        if (this.type == 1 && this.x != x && a[z].x == x && this.y == a[z].y && a[z].passant == 1)
        {a[z].isAlive = 0; Chess.drawCount = 0; Chess.movesList = [];}
      }


          
      if (this.type == 1) {Chess.drawCount = 0;}
          
      if (this.type == 6 && Math.abs(x - this.x) == 2)
      {
        for (let z = 0; z < a.length; z++)
        {
          if (a[z].type == 4 && a[z].color == this.color && ((a[z].x > this.x) == (x > this.x)))
          {
            a[z].realMoveTo(x+(Math.abs(this.x - x) / (this.x - x)), a[z].y, a, 0);
          }
        }
      }


      if (x==1 && y==1) {Chess.blackCastleLeft = 0;}
      if (x==8 && y==1) {Chess.blackCastleRight = 0;}
      if (x==1 && y==8) {Chess.whiteCastleLeft = 0;}
      if (x==8 && y==8) {Chess.whiteCastleRight = 0;}
      
      if (this.type == 4 && this.x == 1 && this.y == 1 && this.color == 1) {Chess.blackCastleLeft = 0;}
      if (this.type == 4 && this.x == 8 && this.y == 1 && this.color == 1) {Chess.blackCastleRight = 0;}
      if (this.type == 4 && this.x == 1 && this.y == 8 && this.color == 2) {Chess.whiteCastleLeft = 0;}
      if (this.type == 4 && this.x == 8 && this.y == 8 && this.color == 2) {Chess.whiteCastleRight = 0;}
      
      if (this.type == 6 && this.color == 2) {Chess.whiteCastleLeft = 0; Chess.whiteCastleRight = 0;}
      if (this.type == 6 && this.color == 1) {Chess.blackCastleLeft = 0; Chess.blackCastleRight = 0;}
                
      for (let i = 0; i < a.length; i++) {a[i].passant = 0;}
      
      if (this.type == 1 && Math.abs(this.y - y) == 2) {this.passant = 1;}
      
      if (this.type == 1) {Chess.movesList = [];}
      
      

      this.x = x;
      this.y = y;


    }
    
    promotePawn(t)
    {
      this.type = t;
    }
    
    static drawIm(a)
    {
      const arr = [];
      
      for (let i = 0; i < a.length; i++)
      {
        if (a[i].isAlive == 1 && a[i].type != 6)
        {
          arr[arr.length] = a[i];
        }
      }
      
      if (arr.length == 0) {return true;}
      
      if (arr.length == 1) {return arr[0].type == 2 || arr[0].type == 3;}
      
      return arr.length == 2 && arr[0].type == 3 && arr[1].type == 3 && (arr[0].x + arr[0].y) % 2 == (arr[1].x + arr[1].y) % 2;
      
    }
    
    
    static anyPieceGoTo(x, y, color, a)
    {
      for (let i=0; i<a.length; i++)
        {
          if (!(a[i].color == color) && a[i].canGoTo(x, y, a))
          {
            return true;
          }
        }
        return false;
    }
    
    
    static inCheck(color, a)
    {
        let x = 1;
        let y = 1;

        for (let i=0; i < a.length; i++)
        {
            if (a[i].color == color && a[i].type == 6)
            {
                x = a[i].x;
                y = a[i].y;
            }
        }

        return Chess.anyPieceGoTo(x, y, color, a);
    }
    
   static inRealStalemate(color, a)
    {
        return Chess.inStalemate(color, a) && !Chess.inCheck(color, a);
    }

    static inStalemate(color, a)
    {
        let x = 1;
        let y = 1;

        for (let i=0; i<a.length; i++)
        {
            if (a[i].color==color)
            {
                x = a[i].x;
                y = a[i].y;

                for (let xPos = 1; xPos < 9; xPos++)
                {
                    for (let yPos = 1; yPos < 9; yPos++)
                    {
                        if (a[i].canMoveTo(xPos, yPos, a))
                        {
                          return false;
                        }
                    }
                }
            }
        }
        return true;
    }
 
    static inMate(color, a)
    {
        return Chess.inCheck(color, a) && Chess.inStalemate(color, a);
    }

    
    canMoveTo(newX, newY, a)
    {
        let x = this.x;
        let y = this.y;
        let ic = 999;

        if (this.canGoTo(newX, newY, a) == true)
        {
          for (let i = 0; i < a.length; i++)
          {
            if (a[i].x == newX && a[i].y == newY && a[i].isAlive == 1) {a[i].isAlive = 0; ic = i;}
                                    
            if (this.type == 1 && this.x != newX && a[i].x == newX && a[i].y == this.y && a[i].passant == 1 && a[i].isAlive == 1)
            {a[i].isAlive = 0; ic = i;}
          }  
          this.moveTo(newX, newY);
          
          if (Chess.inCheck(this.color, a))
          {
            this.moveTo(x, y);
            if (ic < 500) {a[ic].isAlive = 1;}
            return false;
          }
          this.moveTo(x, y);
          if (ic < 500) {a[ic].isAlive = 1;}
          return true;
        }

        return false;
    }
    
    
    canGoTo(newX, newY, a)   // the big transition function
    { 
        if (newX > 8 || newX < 1 || newY > 8 || newY < 1 || this.isAlive == 0) {return false;}

        if (this.type == 1) // pawn
        {
            if (this.color == 1) // black
            {
                if (newX == this.x && newY == this.y+1)
                {
                    return !Chess.pieceThere(newX, newY, 1, a) && !Chess.pieceThere(newX, newY, 2, a);
                }

                if (this.y == 2 && newY == this.y+2 && newX == this.x)
                {
                    if (Chess.pieceThere(this.x, this.y+1, 1, a) || Chess.pieceThere(this.x, this.y+1, 2, a)) {return false;}

                    return !Chess.pieceThere(newX, newY, 1, a) && !Chess.pieceThere(newX, newY, 2, a);
                }

                if (Math.abs(newX - this.x) == 1 && newY - this.y == 1)
                {
                  
                  if (!Chess.pieceThere(newX, newY, 2, a))
                  {
                    for (let i = 0; i < a.length; i++)
                    {
                      if (a[i].color == 2 && a[i].passant == 1 && a[i].x == newX && a[i].y == this.y) {return true;}
                    }
                    return false;
                  }
             
                  return Chess.pieceThere(newX, newY, 2, a) && !Chess.pieceThere(newX, newY, 1, a);
                }
            }

            if (this.color == 2) // white
            {
                if (newX == this.x && newY == this.y-1)
                {
                    return !Chess.pieceThere(newX, newY, 1, a) && !Chess.pieceThere(newX, newY, 2, a);
                }

                if (this.y == 7 && newY == this.y-2 && newX == this.x)
                {
                    if (Chess.pieceThere(this.x, this.y-1, 1, a) || Chess.pieceThere(this.x, this.y-1, 2, a)) {return false;}

                    return !Chess.pieceThere(newX, newY, 1, a) && !Chess.pieceThere(newX, newY, 2, a);
                }

                if (Math.abs(newX - this.x) == 1 && this.y - newY == 1)
                {
                  
                  if (!Chess.pieceThere(newX, newY, 1, a))
                  {
                    for (let i = 0; i < a.length; i++)
                    {
                      if (a[i].color == 1 && a[i].passant == 1 && a[i].x == newX && a[i].y == this.y) {return true;}
                    }
                    return false;
                  }  
                  
                  return Chess.pieceThere(newX, newY, 1, a) && !Chess.pieceThere(newX, newY, 2, a);
                }
            }
        }

        if (this.type == 2) // knight
        {
            if ((Math.abs(newX - this.x) == 1 && Math.abs(newY - this.y) == 2) || (Math.abs(newX - this.x) == 2 && Math.abs(newY - this.y) == 1))
            {              
              return !Chess.pieceThere(newX, newY, this.color, a);
              ;
            }

            return false;
        }

        if (this.type == 3) // bishop
        {
            if (!(Math.abs(newX - this.x) / Math.abs(newY - this.y) == 1)) {return false;}

            let numX = (newX - this.x) / Math.abs(newX - this.x);
            let numY = (newY - this.y) / Math.abs(newY - this.y);

            for (let i = 1; i < Math.abs(newX - this.x); i++)
            {
                if (Chess.pieceThere(this.x + numX*i, this.y + numY*i, 1, a)) {return false;}
                if (Chess.pieceThere(this.x + numX*i, this.y + numY*i, 2, a)) {return false;}
            }

            return !Chess.pieceThere(newX, newY, this.color, a);
        }

        if (this.type == 4) // rook
        {
            if (!(newX == this.x ^ newY == this.y)) {return false;}

            let num;

            for (let i = 1; i < Math.max(Math.abs(newX - this.x), Math.abs(newY - this.y)); i++)
            {
                if (newY == this.y)
                {
                    num = (newX - this.x) / Math.abs(newX - this.x);

                    if (Chess.pieceThere(this.x + num*i, this.y, 1, a) || Chess.pieceThere(this.x + num*i, this.y, 2, a)) {return false;}
                }

                if (newX == this.x)
                {
                    num = (newY - this.y) / Math.abs(newY - this.y);

                    if (Chess.pieceThere(this.x, this.y + num*i, 1, a) || Chess.pieceThere(this.x, this.y + num*i, 2, a)) {return false;}
                }
            }

            return !Chess.pieceThere(newX, newY, this.color, a);
        }

        if (this.type == 5) // queen
        {
            if (!(newX == this.x ^ newY == this.y) && !(Math.abs(newX - this.x) / Math.abs(newY - this.y) == 1)) {return false;}

            if (newX == this.x || newY == this.y)
            {
                let num;

                for (let i = 1; i < Math.max(Math.abs(newX - this.x), Math.abs(newY - this.y)); i++)
                {
                    if (newY == this.y)
                    {
                        num = (newX - this.x) / Math.abs(newX - this.x);

                        if (Chess.pieceThere(this.x + num*i, this.y, 1, a) || Chess.pieceThere(this.x + num*i, this.y, 2, a)) {return false;}
                    }

                    if (newX == this.x)
                    {
                        num = (newY - this.y) / Math.abs(newY - this.y);

                        if (Chess.pieceThere(this.x, this.y + num*i, 1, a) || Chess.pieceThere(this.x, this.y + num*i, 2, a)) {return false;}
                    }
                }
            }

            else
            {
                let numX = (newX - this.x) / Math.abs(newX - this.x);
                let numY = (newY - this.y) / Math.abs(newY - this.y);

                for (let i = 1; i < Math.abs(newX - this.x); i++)
                {
                    if (Chess.pieceThere(this.x + numX*i, this.y + numY*i, 1, a)) {return false;}
                    if (Chess.pieceThere(this.x + numX*i, this.y + numY*i, 2, a)) {return false;}
                }
            }

            return !Chess.pieceThere(newX, newY, this.color, a);
        }

        if (this.type == 6) // king
        {
          
          if (newY == this.y && Math.abs(newX - this.x) == 2)
          {
            if (this.color == 2 && newX > this.x)
            {
              return Chess.whiteCastleRight==1 && !Chess.anyPieceGoTo(5, 8, this.color, a) && !Chess.anyPieceGoTo(6, 8, this.color, a) && !Chess.anyPieceGoTo(7, 8, this.color, a);
            }
            
            if (this.color == 2 && newX < this.x)
            {
              return Chess.whiteCastleLeft==1 && !Chess.anyPieceGoTo(5, 8, this.color, a) && !Chess.anyPieceGoTo(4, 8, this.color, a) && !Chess.anyPieceGoTo(3, 8, this.color, a);
            }
            
            if (this.color == 1 && newX > this.x)
            {
              return Chess.blackCastleRight==1 && !Chess.anyPieceGoTo(5, 1, this.color, a) && !Chess.anyPieceGoTo(6, 1, this.color, a) && !Chess.anyPieceGoTo(7, 1, this.color, a);
            }
            
            if (this.color == 1 && newX < this.x)
            {
              return Chess.blackCastleRight==1 && !Chess.anyPieceGoTo(5, 1, this.color, a) && !Chess.anyPieceGoTo(4, 1, this.color, a) && !Chess.anyPieceGoTo(3, 1, this.color, a);
            }
          }
          
          
          return (Math.abs(newX - this.x) < 2 && Math.abs(newY - this.y) < 2) && !(newX == this.x && newY == this.y) && !Chess.pieceThere(newX, newY, this.color, a);
        }

        return false;
    }

   
    static pieceThere(x, y, color, a)
    {
      for (let i=0; i<a.length; i++)
        {
            if (a[i].color == color && a[i].x==x && a[i].y==y && a[i].isAlive == 1)
            {
                return true;
            }
        }

        return false;
    }
  
}









































const pieces = initializeBoard();
drawBoard(pieces);

document.getElementById("board").style.visibility="visible";
let game = setInterval(myFunction, 1);
Chess.movesList[0] = [];
let c = 0;






for (let t = 0; t < pieces.length; t += 1)
{
  Chess.movesList[0][c] = pieces[t].x;
  Chess.movesList[0][c+1] = pieces[t].y;
  Chess.movesList[0][c+2] = pieces[t].type;
  Chess.movesList[0][c+3] = pieces[t].isAlive;
  Chess.movesList[0][c+4] = pieces[t].passant;
  c += 5;
}
Chess.movesList[0][c] = Chess.blackCastleRight;
Chess.movesList[0][c+1] = Chess.blackCastleLeft;
Chess.movesList[0][c+2] = Chess.whiteCastleRight;
Chess.movesList[0][c+3] = Chess.whiteCastleLeft;
Chess.movesList[1] = 1;






// highlight is the tile the current piece in hand was on; highlight2 is the tile the mouse is hovering over with piece in hand

document.onmousemove = move;
function move(event)
{
  let mouse = 0;
  for (let x = 1; x < 9 && Chess.highlight != 0; x++)
  {
    for (let y = 1; y < 9; y++)
    {
      let square = x.toString() + "$" + y.toString();
      square = document.getElementById(square);       // gets all the chess tiles
      
      if (mouseIsOver(square, event)) {Chess.highlight2 = square.id; mouse = 1}  // if mouse hovers over a tile, set variable to its id
    }
  }
  if (mouse == 0) {Chess.highlight2 = -1}    // otherwise set variable to -1
  
  for (let i = 0; i < pieces.length && Chess.highlight != 0 && Chess.pause == 0; i++)
  {
    let x = Chess.highlight;
    let y = x.charAt(2);
    x = x.charAt(0);
    x = parseInt(x);
    y = parseInt(y);
    
    if (pieces[i].x == x && pieces[i].y == y)    // if the chess piece is the one that came from highlighted tile (the one in hand)
    {
      x = event.clientX + scrollX - 25;
      y = event.clientY + scrollY - 35;
      y = y.toString() + "px";
      x = x.toString() + "px";
      document.getElementById(i.toString()).style.top=y;   // make chess piece go to mouse x and y
      document.getElementById(i.toString()).style.left=x;
      
      drawBoard(pieces);
    }
  }
}




for(let i=0; i<pieces.length; i++)
{
  let element = document.getElementById(i.toString());   // sets element to the chess piece object
  element.onmousedown = down;                            // if mouse clicks chess piece, function down starts
  function down(event)
  {
    if (Chess.game == 1 && Chess.pause == 0)
    {
      let x = event.clientX + scrollX - 25;
      let y = event.clientY + scrollY - 35;
      y = y.toString() + "px";
      x = x.toString() + "px";
      element.style.top=y;
      element.style.left=x;                 // sets x and y of piece to mouse x and y
      let squareId = pieces[i].x.toString() + "$" + pieces[i].y.toString();
      Chess.highlight = squareId;           // sets the highlight to the id of the tile object
      document.onmouseup = function() {if (Chess.highlight == squareId) {Chess.highlight = 0; Chess.highlight2 = -1; tryToMove(i, pieces);}};
    }
  }
}












































function myFunction()
{
  if (Chess.inMate(Chess.turn, pieces))
  {
    Chess.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, pieces);
    if (Chess.turn == 1)
    {setTimeout(function () {alert("Game over. White wins!");}, 100);}
    else {setTimeout(function () {alert("Game over. Black wins!");}, 100);}
  }
  
  if (Chess.inRealStalemate(Chess.turn, pieces))
  {
    Chess.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, pieces);
    setTimeout(function () {alert("Game over due to stalemate.");}, 100);
  }
  
  if (Chess.drawIm(pieces))
  {
    Chess.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, pieces);
    setTimeout(function () {alert("Game over due to insufficient mating material.");}, 100);
  }
  
  if (Chess.drawCount > 99)
  {
    Chess.game = 0;
    clearInterval(game);
    setInterval(drawBoard, 1, pieces);
    setTimeout(function () {alert("Game over because no piece was captured and no pawn moved in the previous 50 moves.");}, 100);
  }
  
  for (let i = 1; i < Chess.movesList.length; i += 2)
  {
    if (Chess.movesList[i] > 2)
    {
      Chess.game = 0;
      clearInterval(game);
      setInterval(drawBoard, 1, pieces);
      setTimeout(function () {alert("Game over due to repetition.");}, 100);
    }
  }

  drawBoard(pieces);
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














function tryToMove(i, pieces)
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
        if(pieces[i].canMoveTo(x, y, pieces) && pieces[i].color == Chess.turn && (Chess.mode == Chess.turn ||Chess.mode == 3))
        {
          
          pieces[i].realMoveTo(x, y, pieces, 0);
          
          let counter = 1;
          while (counter == 1 && pieces[i].type == 1 && ((pieces[i].y == 8 && pieces[i].color == 1) || (pieces[i].y == 1 && pieces[i].color == 2)))
          {
            let prom = prompt("What to promote to?");
            if (prom == "knight") {counter = 0; pieces[i].promotePawn(2);}
            if (prom == "bishop") {counter = 0; pieces[i].promotePawn(3);}
            if (prom == "rook") {counter = 0; pieces[i].promotePawn(4);}
            if (prom == "queen") {counter = 0; pieces[i].promotePawn(5);}
          }
          
          editMove(pieces);
         
          Chess.pause = 1;

          computerMove(pieces);


          setTimeout(function() {if (Chess.game == 1) {Chess.pause = 0;} drawBoard(pieces);}, 100);
        } else
        {
          if ((x != pieces[i].x || y != pieces[i].y) && Chess.game == 1)
          {
            let squareColor = "#e6cdb4";
            if ((x + y) % 2 == 1) {squareColor = "#ab8a68";}
            square.style.backgroundColor="#Bf3232";
            Chess.red = square.id;
            Chess.redCount++;
          
            setTimeout(function()
            {
              Chess.redCount--;
              if (Chess.redCount == 0)
              {
                theId = x.toString()+"$"+y.toString();
                square = document.getElementById(theId);
                square.style.backgroundColor = squareColor;
                Chess.red = 0;
              }
            }, 400);
          }
        }
      }
    }
  }
}







function computerMove(thePieces)
{

  let moves = [];

  for(let i = 0; i < thePieces.length; i++)
  {
    for (let x = 1; x < 9; x++)
    {
      for (let y = 1; y < 9; y++)
      {

        if (thePieces[i].canMoveTo(x, y, thePieces) && thePieces[i].color == Chess.turn)
        {
         
          moves[moves.length] = [i, x, y]
          let copy = [...thePieces];
          copy[i].realMoveTo(x, y, copy, 1);
        }

      }
    }
  }

  let randomNum = Math.floor(Math.random() * moves.length);
  let theMove = moves[randomNum];

  let ii = theMove[0];
  let xx = theMove[1];
  let yy = theMove[2];

  thePieces[ii].realMoveTo(xx, yy, pieces, 0);


  if (thePieces[ii].type == 1 && ((thePieces[ii].y == 8 && thePieces[ii].color == 1) || (thePieces[ii].y == 1 && thePieces[ii].color == 2)))
  {thePieces[ii].promotePawn(5);}
  
  editMove(pieces);
  drawBoard(pieces);

  Chess.pause = 1;
  setTimeout(function() {if (Chess.game == 1) {Chess.pause = 0;} drawBoard(pieces); if (Chess.mode != 4 && Chess.game == 1) {computerMove(pieces);}}, 1);

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











function editMove(pieces)
{
  Chess.movesList[Chess.movesList.length] = [];
          
  let c = 0;

  for (let t = 0; t < pieces.length; t += 1)
  {
    Chess.movesList[Chess.movesList.length-1][c] = pieces[t].x;
    Chess.movesList[Chess.movesList.length-1][c+1] = pieces[t].y;
    Chess.movesList[Chess.movesList.length-1][c+2] = pieces[t].type;
    Chess.movesList[Chess.movesList.length-1][c+3] = pieces[t].isAlive;
    Chess.movesList[Chess.movesList.length-1][c+4] = pieces[t].passant;
    c += 5;
  }
          
  Chess.movesList[Chess.movesList.length-1][c] = Chess.blackCastleRight;
  Chess.movesList[Chess.movesList.length-1][c+1] = Chess.blackCastleLeft;
  Chess.movesList[Chess.movesList.length-1][c+2] = Chess.whiteCastleRight;
  Chess.movesList[Chess.movesList.length-1][c+3] = Chess.whiteCastleLeft;
          
  Chess.movesList[Chess.movesList.length] = 1;
          
  for (let t = 0; t < Chess.movesList.length - 2; t += 2)
  {
    if (arrEquals(Chess.movesList[t], Chess.movesList[Chess.movesList.length - 2])) {Chess.movesList[t+1]++;}
  }
          
  Chess.changeTurn();
}
























function drawBoard(pieces)
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
  
  if (Chess.inCheck(2, pieces))
 {
   document.getElementById("1").style.textShadow="1px 1px 1.5px #Bf3232, -1px -1px 1.5px #Bf3232, -1px 1px 1.5px #Bf3232, 1px -1px 1.5px #Bf3232";
 }
  else {document.getElementById("1").style.textShadow="";}
  
  if (Chess.inCheck(1, pieces))
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
    
    //if (Chess.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    //if (Chess.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    
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
    
    //if (Chess.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    //if (Chess.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    
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
      if (Chess.red != square.id)
      {
        if ((xPos + yPos) % 2 == 1) {square.style.backgroundColor="#ab8a68";}
        else {square.style.backgroundColor="#e6cdb4";}
      }
    }
  }
  
  if (Chess.highlight != 0)
  {
    document.getElementById(Chess.highlight).style.backgroundColor="#967694";
    if (Chess.highlight2 != -1)
    {
      document.getElementById(Chess.highlight2).style.backgroundColor="#967694";
    }
  }
  
  for (let i = 0; i < pieces.length && Chess.highlight == 0; i++)
  {
    xPosit = pieces[i].x - 1;
    yPosit = pieces[i].y - 1;
    
    //if (Chess.turn == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    //if (Chess.pause == 1) {xPosit = 7-xPosit; yPosit = 7-yPosit;}
    
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
    
    if (pieces[i].type == 2 && pieces[i].color == 2) {document.getElementById(i).innerHTML = "&#9816";}
    if (pieces[i].type == 3 && pieces[i].color == 2) {document.getElementById(i).innerHTML = "&#9815";}
    if (pieces[i].type == 4 && pieces[i].color == 2) {document.getElementById(i).innerHTML = "&#9814";}
    if (pieces[i].type == 5 && pieces[i].color == 2) {document.getElementById(i).innerHTML = "&#9813";}

    if (pieces[i].type == 2 && pieces[i].color == 1) {document.getElementById(i).innerHTML = "&#9822";}
    if (pieces[i].type == 3 && pieces[i].color == 1) {document.getElementById(i).innerHTML = "&#9821";}
    if (pieces[i].type == 4 && pieces[i].color == 1) {document.getElementById(i).innerHTML = "&#9820";}
    if (pieces[i].type == 5 && pieces[i].color == 1) {document.getElementById(i).innerHTML = "&#9819";}
    
    if (pieces[i].isAlive == 0)
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
