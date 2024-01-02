import "./Form.css";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-wrapper">
        <div className="form-title">
          <h2>ShelfLife</h2>
        </div>
        <div className="form-inputs">{children}</div>
      </div>
    </form>
  );
};

export default Form;
