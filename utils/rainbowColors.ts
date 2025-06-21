import React from 'react';

// Pastel color scheme for chessboard squares (4 colors from image + complementary green)
const RAINBOW_COLORS = [
  '#FF7F6B', // Coral/Orange
  '#FFD93D', // Golden Yellow  
  '#6BCFCF', // Teal/Turquoise
  '#B19CD9', // Lavender/Purple
  '#7ED957', // Complementary Green
];

const WHITE_SQUARE_COLOR = '#F5F1E8'; // Cream/beige background color from image

export const generateRainbowSquareStyles = () => {
  const squareStyles: { [square: string]: { backgroundColor: string } } = {};
  
  // Get all black squares in order (a8, c8, e8, g8, b7, d7, f7, h7, etc.)
  const blackSquares: string[] = [];
  
  for (let rank = 8; rank >= 1; rank--) {
    for (let file = 0; file < 8; file++) {
      const square = String.fromCharCode(97 + file) + rank; // Convert to chess notation
      const isBlackSquare = (file + rank) % 2 === 1;
      
      if (isBlackSquare) {
        blackSquares.push(square);
      }
    }
  }
  
  // Assign colors sequentially to black squares
  blackSquares.forEach((square, index) => {
    const colorIndex = index % RAINBOW_COLORS.length;
    squareStyles[square] = {
      backgroundColor: RAINBOW_COLORS[colorIndex]
    };
  });
  
  // Assign white squares the same color
  for (let rank = 1; rank <= 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const square = String.fromCharCode(97 + file) + rank;
      const isWhiteSquare = (file + rank) % 2 === 0;
      
      if (isWhiteSquare) {
        squareStyles[square] = {
          backgroundColor: WHITE_SQUARE_COLOR
        };
      }
    }
  }
  
  return squareStyles;
}; 