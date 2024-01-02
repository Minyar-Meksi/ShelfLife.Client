import "./Input.css";

interface InputProps {
  label: string;
  type?: string;
  min?: number;
  max?: number;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ label, type = "text", min, max, value, onChange }: InputProps) => {
  return (
    <div className="input-wrapper">
      <input className="input" type={type} min={min ? min : undefined} max={max ? max : undefined} required placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} />
      <label>{label}</label>
    </div>
  );
};

export default Input;
