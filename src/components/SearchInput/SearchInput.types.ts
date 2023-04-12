import { ChangeEventHandler } from 'react';

export interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onReset?: () => void;
  disabled?: boolean;
}
