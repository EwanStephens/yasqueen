import html2canvas from 'html2canvas';

// Enhanced image export with multiple options
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

    // Create download link (fallback method)
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

// Save to photo gallery (mobile-optimized)
export const saveToPhotos = async (elementId: string, filename: string = 'yas-queen-chess-puzzle.png'): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Chessboard element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        // Try modern File System Access API first (supported on some browsers)
        if ('showSaveFilePicker' in window) {
          try {
            const fileHandle = await (window as any).showSaveFilePicker({
              suggestedName: filename,
              types: [{
                description: 'PNG Images',
                accept: { 'image/png': ['.png'] },
              }],
            });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            resolve(true);
            return;
          } catch (err) {
            // User cancelled or API not supported, fall through to other methods
          }
        }

        // For mobile devices, create a special download that might save to photos
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        // Add attributes that help mobile browsers save to photo gallery
        link.setAttribute('target', '_blank');
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
        resolve(true);
      }, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Error saving to photos:', error);
    return false;
  }
};

// Share functionality using Web Share API
export const shareChessboard = async (elementId: string, filename: string = 'yas-queen-chess-puzzle.png'): Promise<boolean> => {
  // Check if Web Share API is supported
  if (!navigator.share) {
    return false;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Chessboard element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        try {
          const file = new File([blob], filename, { type: 'image/png' });
          
          await navigator.share({
            title: 'Yas Queen! Chess Puzzle',
            text: 'Check out this beautiful chess puzzle I created!',
            files: [file],
          });
          
          resolve(true);
        } catch (error) {
          // User cancelled sharing or sharing failed
          console.log('Sharing cancelled or failed:', error);
          resolve(false);
        }
      }, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Error sharing:', error);
    return false;
  }
};

// Check if sharing is supported
export const isSharingSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator;
};

// Check if advanced file saving is supported
export const isAdvancedSaveSupported = (): boolean => {
  return typeof window !== 'undefined' && 'showSaveFilePicker' in window;
}; 