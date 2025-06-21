import React, { useState } from 'react';
import { Chess } from 'chess.js';
import RainbowChessboard from '../components/RainbowChessboard';
import ImportDialog from '../components/ImportDialog';
import { parseFromPGN, parseFromFEN } from '../utils/chessUtils';
import { exportChessboardAsImage } from '../utils/imageExport';

const HomePage: React.FC = () => {
  const [chess, setChess] = useState(new Chess());
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [boardWidth, setBoardWidth] = useState(500);
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleImport = (data: string, type: 'pgn' | 'fen') => {
    try {
      let newChess: Chess;
      if (type === 'fen') {
        newChess = parseFromFEN(data);
      } else {
        newChess = parseFromPGN(data);
      }
      setChess(newChess);
      showNotification(`Successfully imported ${type.toUpperCase()}`);
    } catch (error) {
      showNotification(`Error: Invalid ${type.toUpperCase()} format`);
    }
  };

  const handleExportImage = async () => {
    try {
      await exportChessboardAsImage('chessboard-container', 'rainbow-chess-puzzle.png');
      showNotification('Image exported successfully!');
    } catch (error) {
      showNotification('Error exporting image');
    }
  };

  const resetBoard = () => {
    setChess(new Chess());
    showNotification('Board reset to starting position');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Rainbow Chess Puzzle Creator
        </h1>
        
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
            {notification}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Controls Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Controls</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setIsImportDialogOpen(true)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Import Position
              </button>
              
              <button
                onClick={handleExportImage}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              >
                Export as Image
              </button>
              
              <button
                onClick={resetBoard}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Reset Board
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board Size: {boardWidth}px
              </label>
              <input
                type="range"
                min="300"
                max="800"
                value={boardWidth}
                onChange={(e) => setBoardWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Current Position</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600 break-all">
                  FEN: {chess.fen()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Game Status</h3>
              <div className="space-y-1 text-sm">
                <p>Turn: <span className="font-mono">{chess.turn() === 'w' ? 'White' : 'Black'}</span></p>
                <p>In Check: <span className="font-mono">{chess.in_check() ? 'Yes' : 'No'}</span></p>
                <p>Game Over: <span className="font-mono">{chess.game_over() ? 'Yes' : 'No'}</span></p>
                {chess.game_over() && (
                  <p>Result: <span className="font-mono">
                    {chess.in_checkmate() ? 'Checkmate' : 
                     chess.in_stalemate() ? 'Stalemate' : 
                     chess.in_draw() ? 'Draw' : 'Game Over'}
                  </span></p>
                )}
              </div>
            </div>
          </div>

          {/* Chessboard */}
          <div className="flex-1 flex justify-center">
            <RainbowChessboard
              position={chess.fen()}
              boardWidth={boardWidth}
              showNotation={true}
            />
          </div>
        </div>

        {/* Import Dialog */}
        <ImportDialog
          isOpen={isImportDialogOpen}
          onClose={() => setIsImportDialogOpen(false)}
          onImport={handleImport}
        />

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-blue-600">1. Import Position</h3>
              <p className="text-gray-600">
                Use the "Import Position" button to load a chess position from FEN notation or PGN data.
                FEN is great for specific positions, while PGN includes full game history.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-green-600">2. Customize View</h3>
              <p className="text-gray-600">
                Adjust the board size using the slider. The rainbow color scheme uses different 
                pastel colors for each black square while keeping white squares consistent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-600">3. Export Image</h3>
              <p className="text-gray-600">
                Once you have your desired position, click "Export as Image" to download a 
                high-quality PNG file perfect for sharing on Instagram or other social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 