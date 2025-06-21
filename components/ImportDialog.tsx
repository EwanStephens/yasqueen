import React, { useState } from 'react';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: string, type: 'pgn' | 'fen') => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ isOpen, onClose, onImport }) => {
  const [activeTab, setActiveTab] = useState<'pgn' | 'fen'>('fen');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    if (!inputValue.trim()) {
      setError('Please enter a valid ' + activeTab.toUpperCase());
      return;
    }
    
    try {
      onImport(inputValue.trim(), activeTab);
      setInputValue('');
      setError('');
      onClose();
    } catch (err) {
      setError('Invalid ' + activeTab.toUpperCase() + ' format');
    }
  };

  const handleClose = () => {
    setInputValue('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import Chess Position</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('fen')}
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === 'fen'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            FEN
          </button>
          <button
            onClick={() => setActiveTab('pgn')}
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === 'pgn'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            PGN
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {activeTab === 'fen' ? 'FEN String:' : 'PGN Data:'}
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              activeTab === 'fen'
                ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
                : '[Event "Example"]\n[Site "?"]\n[Date "2024.01.01"]\n[White "Player1"]\n[Black "Player2"]\n[Result "*"]\n\n1. e4 e5 2. Nf3 Nc6 *'
            }
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={activeTab === 'fen' ? 3 : 6}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleImport}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Import
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog; 