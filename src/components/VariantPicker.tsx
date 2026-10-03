import type { CSSProperties } from "react";
import type { Colour, ColourId, Size, StockMatrix } from "@/types/product";
import { isInStock } from "@/lib/stock";

interface VariantPickerProps {
  colours: Colour[];
  sizes: Size[];
  stock: StockMatrix;
  colour: ColourId;
  size: Size;
  onColourChange: (colour: ColourId) => void;
  onSizeChange: (size: Size) => void;
}

export default function VariantPicker({
  colours,
  sizes,
  stock,
  colour,
  size,
  onColourChange,
  onSizeChange,
}: VariantPickerProps) {
  return (
    <div className="variant-picker">
      <fieldset className="variant-picker__group">
        <legend className="visually-hidden">Select colour</legend>
        <p className="variant-picker__label" aria-hidden="true">
          Select Color
        </p>
        <div className="variant-picker__swatches">
          {colours.map(({ id, name, hex }) => (
            <span key={id} className="variant-picker__swatch-wrap">
              <input
                id={`colour-${id}`}
                className="variant-picker__swatch"
                type="radio"
                name="colour"
                value={id}
                checked={id === colour}
                onChange={() => onColourChange(id)}
                // The swatch colour is product data, so it is passed in as a custom property.
                style={{ "--swatch-colour": hex } as CSSProperties}
              />
              <label htmlFor={`colour-${id}`} className="visually-hidden">
                {name}
              </label>
            </span>
          ))}
        </div>
      </fieldset>

      <hr className="variant-picker__divider" />

      <fieldset className="variant-picker__group">
        <legend className="visually-hidden">Select size</legend>
        <p className="variant-picker__label" aria-hidden="true">
          Select Size
        </p>
        <div className="variant-picker__sizes">
          {sizes.map((option) => {
            const id = `size-${option.toLowerCase()}`;
            const available = isInStock(stock, colour, option);
            return (
              <span key={option} className="variant-picker__size-wrap">
                <input
                  id={id}
                  className="variant-picker__size-input visually-hidden"
                  type="radio"
                  name="size"
                  value={option}
                  checked={option === size}
                  disabled={!available}
                  onChange={() => onSizeChange(option)}
                />
                <label htmlFor={id} className="variant-picker__size">
                  {option}
                  {!available && <span className="visually-hidden"> (out of stock)</span>}
                </label>
              </span>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
