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
  // Use the most common contrast color, defaulting to black for better readability
  const coloredSquareTextColor = coloredSquareContrasts.filter(c => c === '#000000').length > scheme.colors.length / 2 ? '#000000' : '#FFFFFF';
  
  return {
    textColor: '#333333', // Dark gray for good readability on white background
    fontSize: '14px',
    fontWeight: 'bold' as const,
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
    showNotation: false, // Disable built-in notation
    animationDurationInMs: 200,
    boardOrientation,
  }), [position, onPieceDrop, boardWidth, rainbowSquareStyles, boardOrientation]);

  // Generate file labels (a-h) and rank labels (1-8) based on orientation
  const files = boardOrientation === 'white' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
  const ranks = boardOrientation === 'white' ? ['8', '7', '6', '5', '4', '3', '2', '1'] : ['1', '2', '3', '4', '5', '6', '7', '8'];

  const squareSize = boardWidth / 8;

  if (!showNotation) {
    return (
      <div className="flex justify-center items-center">
        <div 
          id="chessboard-container" 
          style={{ 
            padding: '35px', // Increased to match notation version
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            display: 'inline-block'
          }}
        >
          <Chessboard
            options={chessboardOptions}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div 
        id="chessboard-container" 
        style={{ 
          padding: '35px', // Increased from 20px to accommodate external notation (25px) + buffer
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          display: 'inline-block'
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* File labels (a-h) at the bottom */}
          <div 
            style={{ 
              position: 'absolute',
              bottom: -25,
              left: 0,
              width: `${boardWidth}px`,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {files.map((file, index) => (
              <div
                key={file}
                style={{
                  width: `${squareSize}px`,
                  textAlign: 'center',
                  color: notationStyles.textColor,
                  fontSize: notationStyles.fontSize,
                  fontWeight: notationStyles.fontWeight,
                }}
              >
                {file}
              </div>
            ))}
          </div>

          {/* Rank labels (1-8) on the left */}
          <div 
            style={{ 
              position: 'absolute',
              left: -25,
              top: 0,
              height: `${boardWidth}px`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {ranks.map((rank, index) => (
              <div
                key={rank}
                style={{
                  height: `${squareSize}px`,
                  display: 'flex',
                  alignItems: 'center',
                  color: notationStyles.textColor,
                  fontSize: notationStyles.fontSize,
                  fontWeight: notationStyles.fontWeight,
                }}
              >
                {rank}
              </div>
            ))}
          </div>

          {/* The chessboard */}
          <Chessboard
            options={chessboardOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default RainbowChessboard; 