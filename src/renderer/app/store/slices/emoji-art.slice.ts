import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const DEFAULT_GRID_SIZE = 10;

export type EmojiArtState = {
  grid: (string | null)[][];
  gridSize: number;
};

function createEmptyGrid(size: number): (string | null)[][] {
  return Array.from({ length: size }, (): (string | null)[] =>
    Array.from({ length: size }, (): string | null => null)
  );
}

const initialState: EmojiArtState = {
  grid: createEmptyGrid(DEFAULT_GRID_SIZE),
  gridSize: DEFAULT_GRID_SIZE
};

const emojiArtSlice = createSlice({
  name: "emojiArt",
  initialState,
  reducers: {
    emojiPlaced(
      state,
      action: PayloadAction<{ row: number; col: number; emoji: string }, "emojiPlaced">
    ) {
      const { row, col, emoji } = action.payload;
      if (row >= 0 && row < state.gridSize && col >= 0 && col < state.gridSize) {
        state.grid[row][col] = emoji;
      }
    },
    cellCleared(state, action: PayloadAction<{ row: number; col: number }, "cellCleared">) {
      const { row, col } = action.payload;
      if (row >= 0 && row < state.gridSize && col >= 0 && col < state.gridSize) {
        state.grid[row][col] = null;
      }
    },
    gridResized(state, action: PayloadAction<number, "gridResized">) {
      const newSize = Math.max(2, Math.min(32, action.payload));
      const oldGrid = state.grid;
      const newGrid = createEmptyGrid(newSize);
      const copyRows = Math.min(newSize, oldGrid.length);
      const copyCols = Math.min(newSize, oldGrid[0]?.length ?? 0);
      for (let r = 0; r < copyRows; r++) {
        for (let c = 0; c < copyCols; c++) {
          newGrid[r][c] = oldGrid[r][c];
        }
      }
      state.grid = newGrid;
      state.gridSize = newSize;
    },
    gridCleared(state) {
      state.grid = createEmptyGrid(state.gridSize);
    }
  }
});

export const { emojiPlaced, cellCleared, gridResized, gridCleared } = emojiArtSlice.actions;

export default emojiArtSlice.reducer;
