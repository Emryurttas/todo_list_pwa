import PropTypes from "prop-types";

export default function FormAddTodo({ addTodo, disabled }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        if (event.target.text.value !== "") {
            addTodo(event.target.text.value);
        }
        event.target.text.value = "";
    };

    return (
        <form className="todo-add-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-add-input"
                placeholder={disabled ? "Connexion requise" : "Todo's text"}
                name="text"
                disabled={disabled}
            />
            <input type="submit" className="todo-add-submit" value="Add" />
        </form>
    );
}

FormAddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

FormAddTodo.defaultProps = {
    disabled: false,
};
