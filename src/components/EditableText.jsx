import * as PropTypes from "prop-types";
import Done from "@mui/icons-material/Done";
import { useKeyDown } from "../hooks/useKeyDown.js";

export default function EditableText({ text, onUpdate, onCancel, disabled }) {
  useKeyDown(onCancel, ["Escape"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;
    onUpdate(event.target.text.value);
  };

  return (
      <form className="todo-edit-form" onSubmit={handleSubmit}>
        <input
            className="todo-edit-input"
            autoFocus
            type="text"
            name="text"
            defaultValue={text}
            size={5}
            disabled={disabled}
        />
        <label>
          <button type="submit" disabled={disabled}>
            <Done />
          </button>
        </label>
      </form>
  );
}

EditableText.propTypes = {
  text: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

EditableText.defaultProps = {
  text: "",
  disabled: false,
};
