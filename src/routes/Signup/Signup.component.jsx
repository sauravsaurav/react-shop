import "./Signup.styles.scss";
import Button from "../../components/Button/Button.component";
import Form from "../../components/Form/Form.component";
import React, { useRef , useState } from "react";
import { emailValidator , passwordValidator, confirmPasswordValidator } from "../../utils/validator";
import { motion } from "framer-motion";



const Signup = ()=>{
    console.log("RUNNING signin form")
    const email = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const [emailError , setEmailError] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [confirmPasswordError , setConfirmPasswordError] = useState(false);


    const signInSubmitHandler = (e) => {
        console.log("Running signInSubmitHandler");
        e.preventDefault();
        if(!emailValidator(email.current.value)) setEmailError(true);
        else setEmailError(false);
        if(!passwordValidator(password.current.value)) setPasswordError(true);
        else setPasswordError(false);
        if(!confirmPasswordValidator(password.current.value, confirmPassword.current.value)) setConfirmPasswordError(true);
        else setConfirmPasswordError(false);

        if(!emailValidator(email.current.value) || !passwordValidator(password.current.value) || !confirmPasswordValidator(password.current.value, confirmPassword.current.value)) return;
        console.log("All Good!");
    };

    return (
        <motion.div initial={{position:'relative',zIndex:99, opacity:0, scale:0.5}} className="signup-container" animate={{ opacity: 1 , scale:1 }}
        transition={{ duration: 0.5 }}>
            <Form onSubmit={signInSubmitHandler}>
                <h3 className="press-start"><center>Signup</center></h3>
                <div className={`form-group ${emailError ? 'field-error' : ''}`}>
                    <label>Email * </label>
                    <input type="text" placeholder="example@john.com" ref={email}/>
                    {emailError &&  <span className="error">* Please provide a valid email address</span>}
                </div>
                <div className={`form-group ${passwordError ? 'field-error' : ''}`}>
                    <label>Password * </label>
                    <input type="password" placeholder="your password" ref={password}/>
                    {passwordError && <span className="error">* Please provide a strong password</span>}
                </div>
                <div className={`form-group ${passwordError ? 'field-error' : ''}`}>
                    <label>Confirm Password *</label>
                    <input type="password" placeholder="type same password again" ref={confirmPassword}/>
                    {confirmPasswordError && <span className="error">* Must match with the above password</span>}
                </div>
                <Button buttonType="inverse" type="submit">Signup</Button>
            </Form>
        </motion.div>  
    );
}

export default React.memo(Signup);