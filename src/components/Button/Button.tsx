import "./Button.css";

interface ButtonProps {
  label: "Submit" | "Update";
}

const Button = ({ label } : ButtonProps) => {
  return <button type="submit" className="submit-button">{label}</button>;
};

export default Button;
