import { Chess } from 'chess.js';

export const parseFromPGN = (pgn: string): Chess => {
  const chess = new Chess();
  try {
    chess.load_pgn(pgn);
    return chess;
  } catch (error) {
    throw new Error('Invalid PGN format');
  }
};

export const parseFromFEN = (fen: string): Chess => {
  const chess = new Chess();
  try {
    chess.load(fen);
    return chess;
  } catch (error) {
    throw new Error('Invalid FEN format');
  }
};

export const validateFEN = (fen: string): boolean => {
  try {
    const chess = new Chess();
    chess.load(fen);
    return true;
  } catch {
    return false;
  }
};

export const validatePGN = (pgn: string): boolean => {
  try {
    const chess = new Chess();
    chess.load_pgn(pgn);
    return true;
  } catch {
    return false;
  }
}; 