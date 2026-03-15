import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useCallback, useMemo, useRef, DragEvent } from "react";
import { FlexBox } from "src/renderer/app/shared/components/flex-box";
import { useAppDispatch, useAppSelector } from "src/renderer/app/store/hooks";
import {
  emojiPlaced,
  cellCleared,
  gridResized,
  gridCleared
} from "src/renderer/app/store/slices/emoji-art.slice";

// ─── Emoji Catalogue ────────────────────────────────────────────────
const EMOJI_CATEGORIES: { label: string; emojis: string[] }[] = [
  {
    label: "Faces",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "😮‍💨",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🥵",
      "🥶",
      "🥴",
      "😵",
      "🤯",
      "🥳",
      "🥸",
      "😎",
      "🤓",
      "🧐",
      "😕",
      "😟",
      "🙁",
      "😮",
      "😯",
      "😲",
      "😳",
      "🥺",
      "😦",
      "😧",
      "😨",
      "😰",
      "😥",
      "😢",
      "😭",
      "😱",
      "😖",
      "😣",
      "😞",
      "😓",
      "😩",
      "😫",
      "🥱",
      "😤",
      "😡",
      "😠",
      "🤬",
      "😈",
      "👿",
      "💀",
      "☠️",
      "💩",
      "🤡",
      "👹",
      "👺",
      "👻",
      "👽",
      "👾",
      "🤖"
    ]
  },
  {
    label: "Hands",
    emojis: [
      "👋",
      "🤚",
      "🖐️",
      "✋",
      "🖖",
      "👌",
      "🤌",
      "🤏",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝️",
      "👍",
      "👎",
      "✊",
      "👊",
      "🤛",
      "🤜",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤝",
      "🙏",
      "💪",
      "🫶"
    ]
  },
  {
    label: "Hearts",
    emojis: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "♥️",
      "🫀",
      "❤️‍🔥",
      "❤️‍🩹"
    ]
  },
  {
    label: "Animals",
    emojis: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐻‍❄️",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🐗",
      "🐴",
      "🦄",
      "🐝",
      "🪱",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐜",
      "🪰",
      "🦟",
      "🦂",
      "🐢",
      "🐍",
      "🦎",
      "🦖",
      "🦕",
      "🐙",
      "🦑",
      "🦐",
      "🦞",
      "🦀",
      "🐡",
      "🐠",
      "🐟",
      "🐬",
      "🐳",
      "🐋",
      "🦈",
      "🐊",
      "🐅",
      "🐆",
      "🦓",
      "🦍",
      "🦧",
      "🐘",
      "🦛",
      "🦏",
      "🐪",
      "🐫",
      "🦒",
      "🦘",
      "🦬",
      "🐃",
      "🐂",
      "🐄",
      "🐎",
      "🐖",
      "🐏",
      "🐑",
      "🦙",
      "🐐",
      "🦌",
      "🐕",
      "🐩",
      "🦮",
      "🐈",
      "🐈‍⬛",
      "🪶",
      "🐓",
      "🦃",
      "🦤",
      "🦚",
      "🦜",
      "🦢",
      "🦩",
      "🕊️",
      "🐇",
      "🦝",
      "🦨",
      "🦡",
      "🦫",
      "🦦",
      "🦥",
      "🐁",
      "🐀",
      "🐿️",
      "🦔"
    ]
  },
  {
    label: "Food",
    emojis: [
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🫐",
      "🍈",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🍆",
      "🥑",
      "🥦",
      "🥬",
      "🥒",
      "🌶️",
      "🫑",
      "🌽",
      "🥕",
      "🫒",
      "🧄",
      "🧅",
      "🥔",
      "🍠",
      "🥐",
      "🥯",
      "🍞",
      "🥖",
      "🥨",
      "🧀",
      "🥚",
      "🍳",
      "🧈",
      "🥞",
      "🧇",
      "🥓",
      "🥩",
      "🍗",
      "🍖",
      "🌭",
      "🍔",
      "🍟",
      "🍕",
      "🫓",
      "🥪",
      "🥙",
      "🧆",
      "🌮",
      "🌯",
      "🫔",
      "🥗",
      "🥘",
      "🫕",
      "🍝",
      "🍜",
      "🍲",
      "🍛",
      "🍣",
      "🍱",
      "🥟",
      "🦪",
      "🍤",
      "🍙",
      "🍚",
      "🍘",
      "🍥",
      "🥠",
      "🥮",
      "🍢",
      "🍡",
      "🍧",
      "🍨",
      "🍦",
      "🥧",
      "🧁",
      "🍰",
      "🎂",
      "🍮",
      "🍭",
      "🍬",
      "🍫",
      "🍿",
      "🍩",
      "🍪",
      "🌰",
      "🥜",
      "🍯"
    ]
  },
  {
    label: "Nature",
    emojis: [
      "🌲",
      "🌳",
      "🌴",
      "🌵",
      "🌾",
      "🌿",
      "☘️",
      "🍀",
      "🍁",
      "🍂",
      "🍃",
      "🍄",
      "🌸",
      "💐",
      "🌷",
      "🌹",
      "🥀",
      "🌺",
      "🌻",
      "🌼",
      "🪷",
      "🪹",
      "🪺",
      "🌍",
      "🌎",
      "🌏",
      "🌑",
      "🌒",
      "🌓",
      "🌔",
      "🌕",
      "🌖",
      "🌗",
      "🌘",
      "🌙",
      "🌚",
      "🌛",
      "🌜",
      "☀️",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "☁️",
      "⛅",
      "⛈️",
      "🌤️",
      "🌥️",
      "🌦️",
      "🌧️",
      "🌨️",
      "🌩️",
      "🌪️",
      "🌫️",
      "🌈",
      "❄️",
      "☃️",
      "⛄",
      "🔥",
      "💧",
      "🌊",
      "🫧"
    ]
  },
  {
    label: "Objects",
    emojis: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🥎",
      "🎾",
      "🏐",
      "🏉",
      "🥏",
      "🎱",
      "🏓",
      "🏸",
      "🏒",
      "🥅",
      "⛳",
      "🏹",
      "🎣",
      "🤿",
      "🥊",
      "🥋",
      "🎽",
      "🛹",
      "🛼",
      "🎿",
      "⛷️",
      "🏂",
      "🎮",
      "🕹️",
      "🎲",
      "🧩",
      "🎭",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎹",
      "🥁",
      "🪘",
      "🎷",
      "🎺",
      "🪗",
      "🎸",
      "🪕",
      "🎻",
      "🎪",
      "🚗",
      "🚕",
      "🏎️",
      "🚓",
      "🚑",
      "🚒",
      "🚐",
      "🛻",
      "🚚",
      "🚛",
      "🚜",
      "🏍️",
      "🛵",
      "🚲",
      "🛴",
      "🛺",
      "✈️",
      "🚀",
      "🛸",
      "🚁",
      "⛵",
      "🚤",
      "🛥️",
      "🛳️",
      "⚓",
      "🗿",
      "🗽",
      "🗼",
      "🏰",
      "🏯",
      "🏟️",
      "🎡",
      "🎢",
      "🎠",
      "💎",
      "🔮",
      "🧲",
      "🪄",
      "🎁",
      "🎀",
      "🎈",
      "🎊",
      "🎉",
      "🏆",
      "🏅",
      "🥇",
      "🥈",
      "🥉"
    ]
  },
  {
    label: "Symbols",
    emojis: [
      "⬛",
      "⬜",
      "🟥",
      "🟧",
      "🟨",
      "🟩",
      "🟦",
      "🟪",
      "🟫",
      "⭕",
      "❌",
      "❓",
      "❗",
      "‼️",
      "⁉️",
      "💯",
      "🔴",
      "🟠",
      "🟡",
      "🟢",
      "🔵",
      "🟣",
      "🟤",
      "⚫",
      "⚪",
      "🔶",
      "🔷",
      "🔸",
      "🔹",
      "🔺",
      "🔻",
      "💠",
      "🔘",
      "🔲",
      "🔳",
      "▪️",
      "▫️",
      "◾",
      "◽",
      "◼️",
      "◻️",
      "🏴",
      "🏳️",
      "🚩",
      "✨",
      "⚡",
      "💥",
      "🌀",
      "🎯",
      "♻️",
      "🆒",
      "🆕",
      "🆓",
      "🔝",
      "🔜",
      "🆗",
      "🅰️",
      "🅱️",
      "🆎",
      "🅾️",
      "🆘",
      "📛",
      "⛔",
      "🚫",
      "🔞"
    ]
  }
];

// ─── Styles ─────────────────────────────────────────────────────────

const SIDEBAR_WIDTH = 260;
const CELL_SIZE = 44;

const sidebarStyles = {
  width: SIDEBAR_WIDTH,
  minWidth: SIDEBAR_WIDTH,
  height: "calc(100vh - 10rem)",
  overflowY: "auto" as const,
  backgroundColor: "#131316",
  border: "1px solid #2a2a2f",
  borderRadius: "6px",
  padding: "0.5rem",

  /* Custom scrollbar */
  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "#35353b",
    borderRadius: 3,
    "&:hover": { background: "#55555c" }
  }
};

const canvasWrapperStyles = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.75rem"
};

const gridCellBase: React.CSSProperties = {
  width: CELL_SIZE,
  height: CELL_SIZE,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  border: "1px solid #1f1f24",
  cursor: "default",
  transition: "background-color 80ms ease, border-color 80ms ease",
  userSelect: "none",
  borderRadius: "2px",
  backgroundColor: "transparent",
  boxSizing: "border-box"
};

const outputPanelStyles = {
  backgroundColor: "#111113",
  border: "1px solid #2a2a2f",
  borderRadius: "6px",
  padding: "0.75rem 1rem",
  fontFamily: "'Geist Mono', 'Source Code Pro', monospace",
  fontSize: "1.1rem",
  lineHeight: 1.6,
  minHeight: "4rem",
  maxHeight: "12rem",
  overflowY: "auto" as const,
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-all" as const,
  color: "#eaeaec",
  letterSpacing: "0.02em",
  position: "relative" as const,

  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "#35353b",
    borderRadius: 3
  }
};

// ─── Component ──────────────────────────────────────────────────────

export default function EmojiArt() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.emojiArtReducer.grid);
  const gridSize = useAppSelector((state) => state.emojiArtReducer.gridSize);

  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Track the currently highlighted cell via ref + direct DOM manipulation
  // to avoid re-rendering the entire grid on every dragover/mouseenter.
  const activeCellRef = useRef<HTMLDivElement | null>(null);

  // ─── Derived output ─────────────────────────────────────────────
  const outputText = useMemo(() => {
    return grid.map((row) => row.map((cell) => cell ?? "⬜").join("")).join("\n");
  }, [grid]);

  const hasContent = useMemo(() => {
    return grid.some((row) => row.some((cell) => cell !== null));
  }, [grid]);

  // ─── Filtered emojis ───────────────────────────────────────────
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return EMOJI_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return EMOJI_CATEGORIES.map((cat) => ({
      ...cat,
      emojis: cat.emojis.filter(() => cat.label.toLowerCase().includes(q))
    })).filter((cat) => cat.emojis.length > 0);
  }, [searchQuery]);

  // ─── DOM-level highlight helpers ────────────────────────────────
  const clearHighlight = useCallback(() => {
    if (activeCellRef.current) {
      activeCellRef.current.style.backgroundColor = "transparent";
      activeCellRef.current.style.borderColor = "#1f1f24";
      activeCellRef.current = null;
    }
  }, []);

  const applyHighlight = useCallback(
    (el: HTMLDivElement, isDrag: boolean) => {
      clearHighlight();
      activeCellRef.current = el;
      if (isDrag) {
        el.style.backgroundColor = "rgba(240, 192, 64, 0.12)";
        el.style.borderColor = "rgba(240, 192, 64, 0.35)";
      } else {
        el.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
        el.style.borderColor = "#35353b";
      }
    },
    [clearHighlight]
  );

  // ─── Drag handlers ─────────────────────────────────────────────
  const onDragStartEmoji = useCallback((e: DragEvent<HTMLSpanElement>, emoji: string) => {
    e.dataTransfer.setData("text/plain", emoji);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  // ─── Clipboard ────────────────────────────────────────────────
  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [outputText]);

  const onClear = useCallback(() => {
    dispatch(gridCleared());
  }, [dispatch]);

  // ─── Grid size handler ────────────────────────────────────────
  const onGridSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        dispatch(gridResized(val));
      }
    },
    [dispatch]
  );

  return (
    <FlexBox
      direction="row"
      align="stretch"
      gap={1}
      wrap={false}
      sx={{ width: "100%", maxWidth: 1100, padding: "0.5rem 0" }}
    >
      {/* ── Emoji Sidebar ──────────────────────────────────────── */}
      <Box sx={sidebarStyles}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            px: "0.25rem",
            mb: "0.4rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f0c040",
            fontWeight: 600,
            fontSize: "0.65rem"
          }}
        >
          Emoji Inventory
        </Typography>

        <TextField
          size="small"
          placeholder="Search category…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: "0.5rem",
            width: "100%",
            "& .MuiInputBase-root": {
              minWidth: "unset",
              fontSize: "0.75rem",
              backgroundColor: "#1a1a1e"
            }
          }}
        />

        {filteredCategories.map((category) => (
          <Box key={category.label} sx={{ mb: "0.5rem" }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                px: "0.25rem",
                mb: "0.25rem",
                color: "#8e8e95",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500
              }}
            >
              {category.label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
              {category.emojis.map((emoji, i) => (
                <Box
                  key={`${category.label}-${i}`}
                  component="span"
                  draggable
                  onDragStart={(e: DragEvent<HTMLSpanElement>) => onDragStartEmoji(e, emoji)}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    fontSize: "1.25rem",
                    borderRadius: "4px",
                    cursor: "grab",
                    transition: "background-color 100ms ease, transform 100ms ease",
                    "&:hover": {
                      backgroundColor: "rgba(240, 192, 64, 0.08)",
                      transform: "scale(1.15)"
                    },
                    "&:active": {
                      cursor: "grabbing",
                      transform: "scale(0.95)"
                    }
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* ── Main Canvas Area ───────────────────────────────────── */}
      <Box sx={canvasWrapperStyles}>
        {/* Toolbar */}
        <FlexBox direction="row" justify="space-between" align="center" gap={0.5} wrap={false}>
          <FlexBox direction="row" align="center" gap={0.5} wrap={false} sx={{ width: "auto" }}>
            <Typography variant="caption" sx={{ color: "#8e8e95", whiteSpace: "nowrap" }}>
              Grid
            </Typography>
            <TextField
              type="number"
              size="small"
              value={gridSize}
              onChange={onGridSizeChange}
              slotProps={{ htmlInput: { min: 2, max: 32 } }}
              sx={{
                width: 70,
                "& .MuiInputBase-root": {
                  minWidth: "unset",
                  fontSize: "0.75rem",
                  backgroundColor: "#1a1a1e"
                }
              }}
            />
            <Typography variant="caption" sx={{ color: "#55555c" }}>
              ×
            </Typography>
            <Typography variant="caption" sx={{ color: "#8e8e95" }}>
              {gridSize}
            </Typography>
          </FlexBox>

          <Tooltip title="Clear canvas">
            <IconButton
              size="small"
              onClick={onClear}
              disabled={!hasContent}
              sx={{
                color: "#8e8e95",
                "&:hover": { color: "#ef4444", backgroundColor: "rgba(239,68,68,0.08)" }
              }}
            >
              <DeleteSweepIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </FlexBox>

        {/* Grid Canvas — uses native divs + event delegation for performance */}
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            backgroundColor: "#0d0d0f",
            border: "1px solid #2a2a2f",
            borderRadius: "6px",
            padding: "0.75rem",
            overflowX: "auto",
            alignSelf: "flex-start",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "12px 12px"
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            const cell = (e.target as HTMLElement).closest("[data-cell]") as HTMLDivElement | null;
            if (cell && cell !== activeCellRef.current) {
              applyHighlight(cell, true);
            }
          }}
          onDragLeave={(e) => {
            const related = e.relatedTarget as HTMLElement | null;
            if (!related || !(e.currentTarget as HTMLElement).contains(related)) {
              clearHighlight();
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            const cell = (e.target as HTMLElement).closest("[data-cell]") as HTMLDivElement | null;
            if (cell) {
              const row = Number(cell.dataset.row);
              const col = Number(cell.dataset.col);
              const emoji = e.dataTransfer.getData("text/plain");
              if (emoji) {
                dispatch(emojiPlaced({ row, col, emoji }));
              }
            }
            clearHighlight();
          }}
          onMouseOver={(e) => {
            const cell = (e.target as HTMLElement).closest("[data-cell]") as HTMLDivElement | null;
            if (cell && cell !== activeCellRef.current) {
              applyHighlight(cell, false);
            }
          }}
          onMouseLeave={() => {
            clearHighlight();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            const cell = (e.target as HTMLElement).closest("[data-cell]") as HTMLDivElement | null;
            if (cell) {
              const row = Number(cell.dataset.row);
              const col = Number(cell.dataset.col);
              dispatch(cellCleared({ row, col }));
            }
          }}
        >
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  data-cell=""
                  data-row={rowIndex}
                  data-col={colIndex}
                  style={gridCellBase}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Typography variant="caption" sx={{ color: "#55555c", mt: "-0.25rem" }}>
          Drag emojis onto the grid · Right-click a cell to clear it
        </Typography>

        {/* ── Output Panel ───────────────────────────────────── */}
        <Box>
          <FlexBox
            direction="row"
            justify="space-between"
            align="center"
            gap={0.25}
            wrap={false}
            sx={{ mb: "0.25rem" }}
          >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f0c040",
                fontWeight: 600,
                fontSize: "0.65rem"
              }}
            >
              Output
            </Typography>

            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton
                size="small"
                onClick={onCopy}
                sx={{
                  color: copied ? "#22c55e" : "#8e8e95",
                  transition: "color 200ms ease",
                  "&:hover": {
                    color: copied ? "#22c55e" : "#f0c040",
                    backgroundColor: "rgba(240, 192, 64, 0.08)"
                  }
                }}
              >
                {copied ? (
                  <CheckIcon sx={{ fontSize: "0.95rem" }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: "0.95rem" }} />
                )}
              </IconButton>
            </Tooltip>
          </FlexBox>

          <Box sx={outputPanelStyles}>{outputText}</Box>
        </Box>
      </Box>
    </FlexBox>
  );
}
