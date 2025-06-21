import html2canvas from 'html2canvas';

export const exportChessboardAsImage = async (elementId: string, filename: string = 'chess-puzzle.png'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Chessboard element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher resolution for better quality
      useCORS: true,
      allowTaint: true,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting image:', error);
    throw new Error('Failed to export image');
  }
}; 