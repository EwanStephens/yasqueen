# Rainbow Chess Puzzle Creator

A beautiful chess puzzle app with a custom rainbow chessboard built using Next.js, TypeScript, React, and Tailwind CSS.

## Features

🌈 **Rainbow Chessboard**: Custom pastel rainbow color scheme where white squares are consistent and black squares use different rainbow colors

📥 **Import Positions**: Support for importing chess positions from both PGN and FEN formats

📸 **Export Images**: Generate high-quality PNG images of chess positions perfect for Instagram and social media

🎨 **Customizable**: Adjustable board size and responsive design

⚡ **Real-time**: Live game status updates showing turn, check status, and game state

## Tech Stack

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **chess.js** - Chess logic and validation
- **react-chessboard** - React chessboard component
- **html2canvas** - Screenshot generation for image export

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### 1. Import Chess Position

Click the "Import Position" button to load a chess position:

- **FEN**: Direct position notation (e.g., `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`)
- **PGN**: Full game notation with moves and metadata

### 2. Customize the Board

- Use the size slider to adjust board dimensions (300-800px)
- The rainbow color scheme automatically applies to all positions
- View real-time game status including turn, check status, and game outcome

### 3. Export as Image

Click "Export as Image" to download a high-quality PNG file perfect for:
- Instagram posts
- Chess puzzle sharing
- Educational materials
- Social media content

## Color Scheme

The rainbow chessboard uses a carefully selected pastel color palette:

- **White squares**: Consistent light cream color (`#F7F3E9`)
- **Black squares**: Rotating pastel rainbow colors:
  - Pastel Pink (`#FFB3BA`)
  - Pastel Orange (`#FFDFBA`) 
  - Pastel Yellow (`#FFFFBA`)
  - Pastel Green (`#BAFFC9`)
  - Pastel Blue (`#BAE1FF`)
  - Pastel Purple (`#C9BAFF`)
  - Pastel Magenta (`#FFBAFF`)
  - Pastel Cyan (`#BAFFFF`)

## Development

### Project Structure

```
├── components/           # React components
│   ├── RainbowChessboard.tsx
│   └── ImportDialog.tsx
├── pages/               # Next.js pages
│   ├── _app.tsx
│   └── index.tsx
├── styles/              # Global styles
│   └── globals.css
├── utils/               # Utility functions
│   ├── chessUtils.ts
│   ├── rainbowColors.ts
│   └── imageExport.ts
└── public/              # Static assets
```

### Key Components

- **RainbowChessboard**: Main chessboard component with rainbow styling
- **ImportDialog**: Modal for importing PGN/FEN positions
- **HomePage**: Main application page with all functionality

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own chess applications!

## Acknowledgments

- [react-chessboard](https://github.com/Clariity/react-chessboard) for the excellent chessboard component
- [chess.js](https://github.com/jhlywa/chess.js) for chess logic and validation
- The chess community for inspiration on puzzle presentation
