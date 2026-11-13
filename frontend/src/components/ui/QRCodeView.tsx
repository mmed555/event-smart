import React from 'react';

export interface QRCodeViewProps {
  token: string;
  size?: number;
  className?: string;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  token,
  size = 200,
  className,
}) => {
  // Generate a deterministic pseudo-random 2D grid matrix from token string
  const gridSize = 21; // standard QR version 1 is 21x21
  const matrix: boolean[][] = [];

  // Simple string hash
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = (hash << 5) - hash + token.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < gridSize; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < gridSize; c++) {
      // Finder patterns in top-left, top-right, bottom-left
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= gridSize - 7;
      const isBottomLeft = r >= gridSize - 7 && c < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // outer square or inner square
        const rOff = r >= gridSize - 7 ? r - (gridSize - 7) : r;
        const cOff = c >= gridSize - 7 ? c - (gridSize - 7) : c;
        const isBorder = rOff === 0 || rOff === 6 || cOff === 0 || cOff === 6;
        const isCenter = rOff >= 2 && rOff <= 4 && cOff >= 2 && cOff <= 4;
        row.push(isBorder || isCenter);
      } else {
        // pseudo-random fill based on hash and cell
        const cellHash = Math.sin(hash + r * gridSize + c) * 10000;
        row.push(cellHash - Math.floor(cellHash) > 0.5);
      }
    }
    matrix.push(row);
  }

  const cellSize = size / gridSize;

  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="rounded-xl bg-white p-2 shadow-inner"
      >
        {matrix.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.4}
                height={cellSize - 0.4}
                rx={cellSize * 0.2}
                fill="#0F172A"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};
