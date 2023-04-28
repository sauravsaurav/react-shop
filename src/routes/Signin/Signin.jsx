import "./Signin.styles.scss";
import { signInWithGooglePopup , createUserDocumentFromAuth , signInAuthUserWithEmailAndPassword} from "../../utils/firebase";
import Button from "../../components/Button/Button.component";
import Form from "../../components/Form/Form.component";
import React, { useRef , useState} from "react";
import { emailValidator , passwordValidator } from "../../utils/validator";
import { motion } from "framer-motion";
import { toast , ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader.component";


const Signin = ()=>{
    console.log("RUNNING signin form")
    const email = useRef('');
    const password = useRef('');
    const [emailError , setEmailError] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDoc = await createUserDocumentFromAuth(user);
        console.log(userDoc);
    }


    const signInSubmitHandler =  (e) => {
        console.log("Running signInSubmitHandler");
        e.preventDefault();
        if(!emailValidator(email.current.value)) setEmailError(true);
        else setEmailError(false);
        if(!passwordValidator(password.current.value)) setPasswordError(true);
        else setPasswordError(false);

        if(!emailValidator(email.current.value) || !passwordValidator(password.current.value)) return;
        setIsLoading(true);
        signInAuthUserWithEmailAndPassword(email.current.value , password.current.value)
        .then(res => console.log("Inside success", res))
        .catch(err => {
            toast.error(err.message, {
                className: "snackbar",
                position: "bottom-center",
                autoClose: 10000,
            });
            setIsLoading(false);
        });
        
    };

    return (
        <motion.div initial={{position:'relative',zIndex:99, opacity:0, scale:0.5}} className="signin-container" animate={{ opacity: 1 , scale:1 }}
        transition={{ duration: 0.5 }}>
            <ToastContainer/>
            <Form onSubmit={signInSubmitHandler}>
                <h3 className="press-start"><center>Signin</center></h3>
                <div className={`form-group ${emailError ? 'field-error' : ''}`}>
                    <label>Email * </label>
                    <input type="text" placeholder="example@john.com" ref={email}/>
                    {emailError &&  <span className="error">* Please provide a valid email address</span>}
                </div>
                <div className={`form-group ${passwordError ? 'field-error' : ''}`}>
                    <label>Password *</label>
                    <input type="password" placeholder="your password" ref={password}/>
                    {passwordError && <span className="error">* Please provide a strong password</span>}
                </div>
                <Button buttonType="inverse" type="submit">
                    {
                        isLoading ? 
                        <ButtonLoader/> : 
                        'Signin'
                    }
                </Button>
                <Button onClick={logGoogleUser} type="button" style={{margin: '0px 20px'}}>Signin With Google</Button>
            </Form>
        </motion.div>  
    );
}

export default React.memo(Signin);