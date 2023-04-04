export interface InputProps {
  onChange: (text: string) => void;
  value: string;
  name?: string;
  labelTitle?: string;
  onReset?: () => void;
  addClassName?: string;
}
