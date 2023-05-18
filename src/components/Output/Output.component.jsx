import StretchButton from "../StretchButton/StretchButton";
import "./Output.styles.scss";
import {motion} from "framer-motion";
import { useState , useEffect , useContext , useRef} from "react";
import useHttp from "../../hooks/useHttps";
import {DirectoryContext} from "../../store/directory.context";
import {CodeContext} from "../../store/code.context";
import Loader from "../Loader/Loader.component";
const Output = () => {
    const {sendRequest,isLoading, hasError , response} = useHttp();
    const inputRef = useRef('');
    const {codedFile} = useContext(CodeContext);
    const {directoryOptions, setDirectoryOption} = useContext(DirectoryContext);
    const [isShrinked , setIsShrinked] = useState({
        arrow : '⬅️',
        shrinked : true
    });

    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
    };

    useEffect(() => {
      if(directoryOptions.run){
        let id = directoryOptions.fileToCode.id;
        let code = codedFile.find(c => c.id === id);
        if(code && code.value){
            sendRequest(code.value , directoryOptions.selectedLanguage,inputRef.current.value,()=>{
                setDirectoryOption(prevState=>{
                    return {
                        ...prevState,
                        run : false
                    }
                })
            })
        }
        else{
                setDirectoryOption(prevState=>{
                    return {
                        ...prevState,
                        run : false
                    }
                })
        }
      }
      
    }, [directoryOptions, codedFile, setDirectoryOption, sendRequest]);
    

    
    const shrinkHandler = (e)=>{
        e.preventDefault();
        setIsShrinked(prevState => {
            return {
                ...prevState, 
                arrow : prevState.shrinked ? '➡️' : '⬅️',
                shrinked : !prevState.shrinked
            }
        });
    }
    


    return (
        <motion.div className={`output-container ${isShrinked.shrinked ? 'shrink' : 'expand'}`} initial="initial" animate="animate" variants={variants} 
        >
            <center>
                <h5 className="press-start text-output-header">
                    <StretchButton title="Shrink / Expand" onClick={shrinkHandler}>
                        {isShrinked.arrow}
                    </StretchButton>
                </h5>
            </center>
                {
                    isLoading && <div className="full-dimension"><center><Loader/></center></div>
                }
                <div className="row">
                    
                    <div className="column1">
                        <textarea ref={inputRef} placeholder="Input if there is any, or else leave it blank"></textarea>
                    </div>
                    <div className="column2">
                        <h4 className="press-start">
                            Output
                        </h4>
                        {
                            !isLoading && response !== '' && hasError === false && 
                                <p className="response">{response}</p>
                        }
                        {
                            !isLoading && response !== '' && hasError !== false && 
                                <p className="response error" >Error : {response}</p>
                        }
                        {
                            !isLoading && response === '' && 
                            <p className="response">Output goes here...</p>
                        }
                    </div>
                </div>
                
        </motion.div>
    )
}

export default Output;