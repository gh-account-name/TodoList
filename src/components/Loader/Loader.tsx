import React from 'react';
import { LoaderProps } from './Loader.types';

export function Loader({ isLoading, children, variant = 'circle' }: LoaderProps) {
  const loaderClass = variant === 'dot' ? 'spinner-grow spinner-grow-sm' : 'spinner-border text-primary';

  return isLoading ? (
    //↓ span вместо div чтобы ошибки в консоли не выбрасывало
    <span className={loaderClass} role="status">
      <span className="visually-hidden">Loading...</span>
    </span>
  ) : (
    <>{children}</>
  );
}
