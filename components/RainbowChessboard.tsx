import React, { useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { generateRainbowSquareStyles } from '../utils/rainbowColors';

interface RainbowChessboardProps {
  position: string;
  onPieceDrop?: (sourceSquare: string, targetSquare: string) => boolean;
  boardWidth?: number;
  showNotation?: boolean;
  colorScheme?: string;
}

const RainbowChessboard: React.FC<RainbowChessboardProps> = ({
  position,
  onPieceDrop,
  boardWidth = 400,
  showNotation = true,
  colorScheme = 'default',
}) => {
  const chessboardRef = useRef<any>(null);
  const rainbowSquareStyles = generateRainbowSquareStyles(colorScheme);

  return (
    <div className="flex justify-center items-center">
      <div id="chessboard-container">
        <Chessboard
          ref={chessboardRef}
          id="rainbow-chessboard"
          position={position}
          onPieceDrop={onPieceDrop}
          boardWidth={boardWidth}
          showBoardNotation={showNotation}
          customSquareStyles={rainbowSquareStyles}
          animationDuration={200}
        />
      </div>
    </div>
  );
};

export default RainbowChessboard; 