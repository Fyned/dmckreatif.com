import { useState, useCallback } from "react";
import { Check } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS: string[] = [
  "#FF0000",
  "#0066FF",
  "#00CC44",
  "#FFD700",
  "#FF6B00",
  "#8B00FF",
  "#000000",
  "#FFFFFF",
  "#FF1493",
  "#00CED1",
];

function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizeHex(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("#")) return trimmed.toUpperCase();
  return `#${trimmed}`.toUpperCase();
}

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSwatchClick = useCallback(
    (color: string) => {
      setInputValue(color);
      onChange(color);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      const normalized = normalizeHex(raw);
      if (isValidHex(normalized)) {
        onChange(normalized);
      }
    },
    [onChange]
  );

  const handleInputBlur = useCallback(() => {
    const normalized = normalizeHex(inputValue);
    if (isValidHex(normalized)) {
      setInputValue(normalized);
      onChange(normalized);
    } else {
      /* Revert to current value */
      setInputValue(value);
    }
  }, [inputValue, value, onChange]);

  const currentNormalized = normalizeHex(value);

  return (
    <div>
      {/* Label */}
      {label && (
        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2">
          {label}
        </label>
      )}

      {/* Preset swatches */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESET_COLORS.map((color) => {
          const isSelected = currentNormalized === color.toUpperCase();
          const isWhite = color === "#FFFFFF";

          return (
            <button
              key={color}
              type="button"
              onClick={() => handleSwatchClick(color)}
              className={`w-8 h-8 border-2 border-neo-black cursor-pointer transition-all duration-150 flex items-center justify-center ${
                isSelected
                  ? "ring-2 ring-neo-lime ring-offset-2"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            >
              {isSelected && (
                <Check
                  size={14}
                  className={isWhite ? "text-neo-black" : "text-neo-white"}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom hex input */}
      <div className="flex items-center gap-2">
        {/* Color preview square */}
        <div
          className="w-10 h-10 border-2 border-neo-black shrink-0"
          style={{
            backgroundColor: isValidHex(currentNormalized)
              ? currentNormalized
              : "#FFFFFF",
          }}
        />

        {/* Hex input */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="#000000"
          maxLength={7}
          className="border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm w-full focus:outline-none focus:border-neo-lime transition-colors"
        />
      </div>
    </div>
  );
}
