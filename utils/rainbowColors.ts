import React from 'react';

// Pastel rainbow colors for black squares
export const PASTEL_RAINBOW_COLORS = [
  '#FFB3BA', // Pastel Pink
  '#FFDFBA', // Pastel Orange
  '#FFFFBA', // Pastel Yellow
  '#BAFFC9', // Pastel Green
  '#BAE1FF', // Pastel Blue
  '#C9BAFF', // Pastel Purple
  '#FFBAFF', // Pastel Magenta
  '#BAFFFF', // Pastel Cyan
];

// Light pastel color for white squares
export const WHITE_SQUARE_COLOR = '#F7F3E9';

// Generate rainbow square styles for the chessboard
export const generateRainbowSquareStyles = (): { [square: string]: React.CSSProperties } => {
  const styles: { [square: string]: React.CSSProperties } = {};
  
  // Chess board files (a-h) and ranks (1-8)
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
  
  let colorIndex = 0;
  
  for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const square = files[fileIndex] + ranks[rankIndex];
      const isBlackSquare = (rankIndex + fileIndex) % 2 === 1;
      
      if (isBlackSquare) {
        // Use different rainbow colors for black squares
        styles[square] = {
          backgroundColor: PASTEL_RAINBOW_COLORS[colorIndex % PASTEL_RAINBOW_COLORS.length],
        };
        colorIndex++;
      } else {
        // Use consistent color for white squares
        styles[square] = {
          backgroundColor: WHITE_SQUARE_COLOR,
        };
      }
    }
  }
  
  return styles;
}; 