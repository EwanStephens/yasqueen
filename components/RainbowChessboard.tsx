import React, { useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { generateRainbowSquareStyles, COLOR_SCHEMES } from '../utils/rainbowColors';

interface RainbowChessboardProps {
  position: string;
  onPieceDrop?: ({ piece, sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) => boolean;
  boardWidth?: number;
  showNotation?: boolean;
  colorScheme?: string;
  boardOrientation?: 'white' | 'black';
}

// Function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness using luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155; // Threshold for light/dark
};

// Generate contrasting colors for notation based on square colors
const generateNotationStyles = (colorScheme: string = 'default') => {
  const scheme = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.default;
  
  // Determine contrasting colors for white and colored squares
  const whiteSquareTextColor = isLightColor(scheme.whiteSquareColor) ? '#000000' : '#FFFFFF';
  
  // For colored squares, we need to check each color and find the most common contrast
  const coloredSquareContrasts = scheme.colors.map(color => isLightColor(color) ? '#000000' : '#FFFFFF');
  // Use the most common contrast color, defaulting to white for dark rainbow colors
  const coloredSquareTextColor = coloredSquareContrasts.filter(c => c === '#FFFFFF').length > scheme.colors.length / 2 ? '#FFFFFF' : '#000000';
  
  return {
    lightSquareNotationStyle: {
      color: whiteSquareTextColor,
      fontWeight: 'bold',
      textShadow: whiteSquareTextColor === '#000000' ? '0 0 2px rgba(255,255,255,0.8)' : '0 0 2px rgba(0,0,0,0.8)',
    },
    darkSquareNotationStyle: {
      color: coloredSquareTextColor,
      fontWeight: 'bold',
      textShadow: coloredSquareTextColor === '#000000' ? '0 0 2px rgba(255,255,255,0.8)' : '0 0 2px rgba(0,0,0,0.8)',
    },
    alphaNotationStyle: {
      fontSize: '13px',
      position: 'absolute' as const,
      bottom: 1,
      left: 4, // Bottom-left positioning for file letters (a-h)
      userSelect: 'none' as const,
    },
    numericNotationStyle: {
      fontSize: '13px',
      position: 'absolute' as const,
      top: 2,
      right: 2, // Top-right positioning for rank numbers (1-8)
      userSelect: 'none' as const,
    },
  };
};

const RainbowChessboard: React.FC<RainbowChessboardProps> = ({
  position,
  onPieceDrop,
  boardWidth = 400,
  showNotation = true,
  colorScheme = 'default',
  boardOrientation = 'white',
}) => {
  const rainbowSquareStyles = generateRainbowSquareStyles(colorScheme);
  
  // Generate notation styles based on the color scheme
  const notationStyles = useMemo(() => generateNotationStyles(colorScheme), [colorScheme]);

  // Create chessboard options object for v5.0.0
  const chessboardOptions = useMemo(() => ({
    position,
    onPieceDrop,
    boardStyle: { width: `${boardWidth}px`, height: `${boardWidth}px` },
    squareStyles: rainbowSquareStyles,
    showNotation,
    lightSquareNotationStyle: notationStyles.lightSquareNotationStyle,
    darkSquareNotationStyle: notationStyles.darkSquareNotationStyle,
    alphaNotationStyle: notationStyles.alphaNotationStyle,
    numericNotationStyle: notationStyles.numericNotationStyle,
    animationDurationInMs: 200,
    boardOrientation,
  }), [position, onPieceDrop, boardWidth, rainbowSquareStyles, showNotation, notationStyles, boardOrientation]);

  return (
    <div className="flex justify-center items-center">
      <div id="chessboard-container">
        <Chessboard
          options={chessboardOptions}
        />
      </div>
    </div>
  );
};

export default RainbowChessboard; 