import "./Form.styles.scss";
import React from "react";

const Form = ({onSubmit , children}) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export default React.memo(Form);