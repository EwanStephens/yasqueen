import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import RainbowChessboard from '../components/RainbowChessboard';
import ImportDialog from '../components/ImportDialog';
import { parseFromPGN, parseFromFEN } from '../utils/chessUtils';
import { exportChessboardAsImage, saveToPhotos, shareChessboard, isSharingSupported } from '../utils/imageExport';
import { COLOR_SCHEMES } from '../utils/rainbowColors';

const HomePage: React.FC = () => {
  const [chess, setChess] = useState(new Chess());
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [boardWidth, setBoardWidth] = useState(500);
  const [notification, setNotification] = useState('');
  const [selectedColorScheme, setSelectedColorScheme] = useState('default');
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [isMobile, setIsMobile] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);

  // Check if we're on mobile and adjust board size accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowShareButton(isSharingSupported());
      if (mobile && boardWidth > 350) {
        setBoardWidth(Math.min(350, window.innerWidth - 40));
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [boardWidth]);

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

  const handleSaveToPhotos = async () => {
    try {
      const success = await saveToPhotos('chessboard-container', 'yas-queen-chess-puzzle.png');
      if (success) {
        showNotification('Image saved! Check your Downloads or Photos app.');
      } else {
        showNotification('Download started - save manually to Photos if needed.');
      }
    } catch (error) {
      showNotification('Error saving image');
    }
  };

  const handleShare = async () => {
    try {
      const success = await shareChessboard('chessboard-container', 'yas-queen-chess-puzzle.png');
      if (success) {
        showNotification('Shared successfully!');
      } else {
        showNotification('Sharing cancelled or not supported');
      }
    } catch (error) {
      showNotification('Error sharing image');
    }
  };

  const handleExportImage = async () => {
    try {
      await exportChessboardAsImage('chessboard-container', 'yas-queen-chess-puzzle.png');
      showNotification('Image downloaded successfully!');
    } catch (error) {
      showNotification('Error downloading image');
    }
  };

  const flipBoard = () => {
    setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white');
    showNotification('Board flipped');
  };

  const maxBoardWidth = isMobile ? Math.min(350, window.innerWidth - 40) : 800;
  const minBoardWidth = isMobile ? 250 : 300;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-4 md:py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-gray-800">
          Yas Queen! Puzzle Creator
        </h1>
        
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 text-sm">
            {notification}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* Controls Panel - Left side on desktop, top on mobile */}
          <div className="order-1 bg-white rounded-lg shadow-lg p-4 md:p-6 w-full lg:w-80 lg:flex-shrink-0">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center lg:text-left">Controls</h2>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 mb-4">
              <button
                onClick={() => setIsImportDialogOpen(true)}
                className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Import Position
              </button>
              
              <button
                onClick={handleSaveToPhotos}
                className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
              >
                💾 Save to Photos
              </button>
              
              {showShareButton && (
                <button
                  onClick={handleShare}
                  className="bg-orange-500 text-white py-2 px-3 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  📤 Share
                </button>
              )}
              
              <button
                onClick={handleExportImage}
                className="bg-gray-500 text-white py-2 px-3 rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                ⬇️ Download
              </button>
              
              <button
                onClick={flipBoard}
                className="bg-purple-500 text-white py-2 px-3 rounded-md hover:bg-purple-600 transition-colors text-sm font-medium"
              >
                🔄 Flip Board
              </button>
            </div>

            {/* Board Size Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board Size: {boardWidth}px
              </label>
              <input
                type="range"
                min={minBoardWidth}
                max={maxBoardWidth}
                value={boardWidth}
                onChange={(e) => setBoardWidth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Color Scheme Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Scheme
              </label>
              <select
                value={selectedColorScheme}
                onChange={(e) => setSelectedColorScheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {Object.entries(COLOR_SCHEMES).map(([key, scheme]) => (
                  <option key={key} value={key}>
                    {scheme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Game Status - Collapsible on mobile, always visible on desktop */}
            <div className="space-y-3">
              <details className="lg:hidden">
                <summary className="text-sm font-medium text-gray-800 cursor-pointer">
                  Game Status & Position
                </summary>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-gray-600 break-all">
                      FEN: {chess.fen()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>Turn: <span className="font-mono">{chess.turn() === 'w' ? 'White' : 'Black'}</span></p>
                    <p>In Check: <span className="font-mono">{chess.inCheck() ? 'Yes' : 'No'}</span></p>
                    <p>Game Over: <span className="font-mono">{chess.isGameOver() ? 'Yes' : 'No'}</span></p>
                    {chess.isGameOver() && (
                      <p>Result: <span className="font-mono">
                        {chess.isCheckmate() ? 'Checkmate' : 
                         chess.isStalemate() ? 'Stalemate' : 
                         chess.isDraw() ? 'Draw' : 'Game Over'}
                      </span></p>
                    )}
                  </div>
                </div>
              </details>

              {/* Desktop version - always visible */}
              <div className="hidden lg:block space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Current Position</h3>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-600 break-all">
                      FEN: {chess.fen()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Game Status</h3>
                  <div className="space-y-1 text-sm">
                    <p>Turn: <span className="font-mono">{chess.turn() === 'w' ? 'White' : 'Black'}</span></p>
                    <p>In Check: <span className="font-mono">{chess.inCheck() ? 'Yes' : 'No'}</span></p>
                    <p>Game Over: <span className="font-mono">{chess.isGameOver() ? 'Yes' : 'No'}</span></p>
                    {chess.isGameOver() && (
                      <p>Result: <span className="font-mono">
                        {chess.isCheckmate() ? 'Checkmate' : 
                         chess.isStalemate() ? 'Stalemate' : 
                         chess.isDraw() ? 'Draw' : 'Game Over'}
                      </span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chessboard - Right side on desktop, bottom on mobile */}
          <div className="order-2 flex justify-center w-full lg:flex-1">
            <RainbowChessboard
              position={chess.fen()}
              boardWidth={boardWidth}
              showNotation={!isMobile} // Hide notation on very small screens
              colorScheme={selectedColorScheme}
              boardOrientation={boardOrientation}
            />
          </div>
        </div>

        {/* Import Dialog */}
        <ImportDialog
          isOpen={isImportDialogOpen}
          onClose={() => setIsImportDialogOpen(false)}
          onImport={handleImport}
        />

        {/* Instructions - Simplified for mobile */}
        <div className="mt-8 md:mt-12 bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-blue-600">1. Import Position</h3>
              <p className="text-gray-600">
                Use the "Import Position" button to load a chess position from FEN notation or PGN data.
                FEN is great for specific positions, while PGN includes full game history.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-green-600">2. Customize View</h3>
              <p className="text-gray-600">
                Adjust the board size using the slider and choose from various pride flag 
                color schemes using the dropdown menu. Each color scheme represents a different 
                pride flag with authentic colors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-purple-600">3. Save & Share</h3>
              <p className="text-gray-600">
                Use "Save to Photos" to save directly to your device's photo gallery, "Share" to share 
                via social media or messaging apps, or "Download" for a traditional file download. 
                Perfect for Instagram, Twitter, or any social media platform!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 