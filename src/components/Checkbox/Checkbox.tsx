import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export function Checkbox({ label, containerClassName = '', ...props }: CheckboxProps) {
  return (
    <div className={`form-check mb-3 ${containerClassName}`}>
      <input className="form-check-input" type="checkbox" value="" id={label} {...props} />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
