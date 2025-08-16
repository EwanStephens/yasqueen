import React from 'react';

// Default white square color
const DEFAULT_WHITE_SQUARE_COLOR = '#F5F1E8'; // Cream/beige background color

// Color schemes for each pride flag
export const COLOR_SCHEMES = {
  default: {
    name: 'Default',
    colors: [
      '#FF7F6B', // Coral/Orange
      '#FFD93D', // Golden Yellow  
      '#6BCFCF', // Teal/Turquoise
      '#B19CD9', // Lavender/Purple
      '#7ED957', // Complementary Green
      '#FFB3D9', // Soft Pink
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  rainbow: {
    name: 'Rainbow flag (LGBTQ)',
    colors: [
      '#E40303', // Red
      '#FF8C00', // Orange
      '#FFED00', // Yellow
      '#008018', // Green
      '#0078D4', // Blue
      '#732982', // Purple
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  progress: {
    name: 'Progress (Pride)',
    colors: [
      '#E40303', // Red
      '#FF8C00', // Orange
      '#FFED00', // Yellow
      '#008018', // Green
      '#0078D4', // Blue
      '#732982', // Purple
      '#613915', // Brown
      '#5BCFFA', // Light Blue (Trans)
      '#F5A9B8', // Trans Pink
    ],
    whiteSquareColor: '#FFFFFF',
  },
  transgender: {
    name: 'Transgender (Trans)',
    colors: [
      '#5BCFFA', // Light Blue
      '#F5A9B8', // Pink
    ],
    whiteSquareColor: '#FFFFFF',
  },
  intersex: {
    name: 'Intersex',
    colors: [
      '#FFD800', // Yellow
      '#7902AA', // Purple
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  lesbian: {
    name: 'Lesbian',
    colors: [
      '#D62900', // Dark Red/Orange
      '#FF9B55', // Orange
      '#D461A6', // Pink
      '#A50062', // Dark Pink
    ],
    whiteSquareColor: '#FFFFFF',
  },
  bisexual: {
    name: 'Bisexual (Bi)',
    colors: [
      '#D60270', // Pink
      '#9B59B6', // Purple
      '#0038A8', // Blue
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  pansexual: {
    name: 'Pansexual (Pan)',
    colors: [
      '#FF218C', // Pink
      '#FFD800', // Yellow
      '#21B1FF', // Blue
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  nonbinary: {
    name: 'Non-Binary (Enby)',
    colors: [
      '#FCF434', // Yellow
      '#9C59D1', // Purple
    ],
    whiteSquareColor: '#FFFFFF',
  },
  asexual: {
    name: 'Asexual (Ace)',
    colors: [
      '#A3A3A3', // Gray
      '#800080', // Purple
    ],
    whiteSquareColor: '#FFFFFF',
  },
  agender: {
    name: 'Agender',
    colors: [
      '#B7B7B7', // Gray
      '#B7F684', // Light Green
    ],
    whiteSquareColor: '#FFFFFF',
  },
  genderfluid: {
    name: 'Genderfluid',
    colors: [
      '#FF75A2', // Pink
      '#9B59B6', // Purple
      '#0038A8', // Blue
    ],
    whiteSquareColor: '#FFFFFF',
  },
  genderqueer: {
    name: 'Genderqueer',
    colors: [
      '#B57EDC', // Purple
      '#4A8123', // Green
    ],
    whiteSquareColor: '#FFFFFF',
  },
  aromantic: {
    name: 'Aromantic (Aro)',
    colors: [
      '#3DA542', // Green
      '#A7D379', // Light Green
      '#A3A3A3', // Gray
    ],
    whiteSquareColor: '#FFFFFF',
  },
  gay: {
    name: 'Gay (men/masc aligned)',
    colors: [
      '#078D70', // Dark Green
      '#26CEAA', // Green
      '#98E8C1', // Light Green
      '#7BADE2', // Light Blue
      '#5049CC', // Blue
      '#3D1A78', // Dark Blue
    ],
    whiteSquareColor: '#FFFFFF',
  },
  demisexual: {
    name: 'Demisexual (Demi)',
    colors: [
      '#A3A3A3', // Gray
      '#800080', // Purple
    ],
    whiteSquareColor: '#FFFFFF',
  },
  polysexual: {
    name: 'Polysexual',
    colors: [
      '#F61CB9', // Pink
      '#07D569', // Green
      '#1C92F6', // Blue
    ],
    whiteSquareColor: DEFAULT_WHITE_SQUARE_COLOR,
  },
  disability: {
    name: 'Disability Pride',
    colors: [
      '#595959', // Dark Gray
      '#cf7280', // Rose/Pink
      '#eede77', // Yellow
      //'#e8e8e8', // Light Gray
      '#7bc2e0', // Light Blue
      '#3bb07d', // Green
    ],
    whiteSquareColor: '#e8e8e8',
  },
};

// Distribution strategies for different numbers of colors
const getSquareDistribution = (colors: string[], numColors: number) => {
  const distribution: { [square: string]: string } = {};
  
  if (numColors >= 6) {
    // Use existing cycling strategy for 6+ colors
    const blackSquares: string[] = [];
    
    for (let rank = 8; rank >= 1; rank--) {
      for (let file = 0; file < 8; file++) {
        const square = String.fromCharCode(97 + file) + rank;
        const isBlackSquare = (file + rank) % 2 === 1;
        
        if (isBlackSquare) {
          blackSquares.push(square);
        }
      }
    }
    
    blackSquares.forEach((square, index) => {
      const colorIndex = index % colors.length;
      distribution[square] = colors[colorIndex];
    });
  } else {
    // Custom strategies for 2-5 colors to avoid diagonal repetition
    for (let rank = 8; rank >= 1; rank--) {
      for (let file = 0; file < 8; file++) {
        const square = String.fromCharCode(97 + file) + rank;
        const isBlackSquare = (file + rank) % 2 === 1;
        
        if (isBlackSquare) {
          let colorIndex: number;
          
          switch (numColors) {
            case 2:
              // Alternating pattern that avoids diagonal adjacency
              colorIndex = ((file + rank) >> 1) % 2;
              break;
            case 3:
              // Pattern that cycles through 3 colors avoiding diagonal adjacency
              colorIndex = (file + rank * 2) % 3;
              break;
            case 4:
              // Pattern for 4 colors
              colorIndex = (file * 2 + rank) % 4;
              break;
            case 5:
              // Pattern for 5 colors
              colorIndex = (file * 3 + rank * 2) % 5;
              break;
            default:
              colorIndex = 0;
          }
          
          distribution[square] = colors[colorIndex];
        }
      }
    }
  }
  
  return distribution;
};

export const generateRainbowSquareStyles = (schemeKey: string = 'default') => {
  const scheme = COLOR_SCHEMES[schemeKey as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.default;
  const squareStyles: { [square: string]: { backgroundColor: string } } = {};
  
  // Get color distribution for black squares
  const blackSquareDistribution = getSquareDistribution(scheme.colors, scheme.colors.length);
  
  // Apply black square colors
  Object.keys(blackSquareDistribution).forEach(square => {
    squareStyles[square] = {
      backgroundColor: blackSquareDistribution[square]
    };
  });
  
  // Apply white square color
  for (let rank = 1; rank <= 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const square = String.fromCharCode(97 + file) + rank;
      const isWhiteSquare = (file + rank) % 2 === 0;
      
      if (isWhiteSquare) {
        squareStyles[square] = {
          backgroundColor: scheme.whiteSquareColor
        };
      }
    }
  }
  
  return squareStyles;
}; 