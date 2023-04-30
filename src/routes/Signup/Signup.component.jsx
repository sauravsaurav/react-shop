import "./Signup.styles.scss";
import Button from "../../components/Button/Button.component";
import Form from "../../components/Form/Form.component";
import React, { useRef , useState, useContext } from "react";
import { emailValidator , passwordValidator, confirmPasswordValidator } from "../../utils/validator";
import { motion } from "framer-motion";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader.component";
import { NotificationContext } from "../../store/notification.context";

// nDdIeisudGeCEGMMCkIW7NmgXzd2
const Signup = ()=>{
    console.log("RUNNING signup form")
    const email = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const displayName = useRef('');
    const [emailError , setEmailError] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [confirmPasswordError , setConfirmPasswordError] = useState(false);
    const [displayNameError , setDisplayNameError] = useState(false);
    const {setNotification} = useContext(NotificationContext);

    const [isLoading , setIsLoading] = useState(false);

    const signUpSubmitHandler = async (e) => {
        console.log("Running signUpSubmitHandler");
        e.preventDefault();
        if(!emailValidator(email.current.value)) setEmailError(true);
        else setEmailError(false);
        if(!passwordValidator(password.current.value)) setPasswordError(true);
        else setPasswordError(false);
        if(!confirmPasswordValidator(password.current.value, confirmPassword.current.value)) setConfirmPasswordError(true);
        else setConfirmPasswordError(false);
        if(!displayName.current.value) setDisplayNameError(true);
        else setDisplayNameError(false);

        if(!emailValidator(email.current.value) || !passwordValidator(password.current.value) || !confirmPasswordValidator(password.current.value, confirmPassword.current.value) || !displayName.current.value) return;
        
        try{
            setIsLoading(true);
            // In below , we are signing up the user but not actually saving it.
            const {user} = await createAuthUserWithEmailAndPassword(email.current.value, password.current.value);

            // Below is where we are actually saving the user, once the user is 
            await createUserDocumentFromAuth(user , {displayName : displayName.current.value});
            setIsLoading(false);
            setNotification({status : 'success' , message : "User is created!"})
        }
        catch(err){
            console.log("Something went wrong in routes/Signup/Signup.component.jsx");
            setNotification({status : "error" , message : err.message});
            setIsLoading(false);
        }
        
    };

    return (
        <motion.div initial={{position:'relative',zIndex:99, opacity:0, scale:0.5}} className="signup-container" animate={{ opacity: 1 , scale:1 }}
        transition={{ duration: 0.5 }}>
            <Form onSubmit={signUpSubmitHandler}>
                <h3 className="press-start"><center>Signup</center></h3>
                <div className={`form-group ${displayNameError ? 'field-error' : ''}`}>
                    <label>Display Name * </label>
                    <input type="text" placeholder="example" ref={displayName}/>
                    {displayNameError &&  <span className="error">* Please provide a name</span>}
                </div>
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
                <Button buttonType="inverse" type="submit" disabled={isLoading}>
                    {isLoading ? <ButtonLoader/> : 'Signup'}
                </Button>
            </Form>
        </motion.div>  
    );
}

export default React.memo(Signup);