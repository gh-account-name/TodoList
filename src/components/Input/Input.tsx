import React, { ChangeEventHandler } from 'react';
import { InputProps } from './Input.types';

export function Input({ onChange, value, name, labelTitle, onReset, addClassName }: InputProps) {
  const InputOnChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onInputReset = (evt: MouseEvent) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <>
      {labelTitle ? (
        <label htmlFor={name} className="form-label">
          {labelTitle}
        </label>
      ) : (
        ''
      )}
      <input
        className={`form-control ${addClassName}`}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={InputOnChange}
      />
    </>
  );
}
