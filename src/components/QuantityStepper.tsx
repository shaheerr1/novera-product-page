"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { MinusIcon, PlusIcon } from "./icons";

interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  id?: string;
}

const MIN = 1;
const pad = (value: number) => String(value).padStart(2, "0");

export default function QuantityStepper({
  value,
  max,
  onChange,
  id = "quantity",
}: QuantityStepperProps) {
  // Raw text while the user is typing; null shows the zero padded value.
  const [draft, setDraft] = useState<string | null>(null);
  const upper = Math.max(max, MIN);
  const disabled = max < MIN;

  function commit() {
    if (draft === null) return;
    const parsed = Number.parseInt(draft, 10);
    const next = Number.isNaN(parsed) ? value : Math.min(Math.max(parsed, MIN), upper);
    setDraft(null);
    onChange(next);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value.replace(/\D/g, "").slice(0, 3));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commit();
  }

  return (
    <div className="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label="Decrease quantity"
        aria-controls={id}
        disabled={disabled || value <= MIN}
        onClick={() => onChange(value - 1)}
      >
        <MinusIcon className="quantity-stepper__icon" />
      </button>
      <label htmlFor={id} className="visually-hidden">
        Quantity
      </label>
      <input
        id={id}
        className="quantity-stepper__input"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={draft ?? pad(value)}
        disabled={disabled}
        onChange={handleChange}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label="Increase quantity"
        aria-controls={id}
        disabled={disabled || value >= upper}
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon className="quantity-stepper__icon" />
      </button>
    </div>
  );
}
