import "./Authentication.styles.scss";
import Signup from "../Signup/Signup.component";
import Signin from "../Signin/Signin";

const Authentication = () => {
    return (
        <div className="authentication-container">
            <Signin/>
            <Signup/>
        </div>
    )
}

export default Authentication;
