declare module 'chess.js' {
  export class Chess {
    constructor(fen?: string);
    fen(): string;
    load(fen: string): boolean;
    load_pgn(pgn: string): boolean;
    moves(): string[];
    move(move: string | { from: string; to: string; promotion?: string }): any;
    undo(): any;
    turn(): 'w' | 'b';
    in_check(): boolean;
    in_checkmate(): boolean;
    in_stalemate(): boolean;
    in_draw(): boolean;
    game_over(): boolean;
    pgn(): string;
  }
} 