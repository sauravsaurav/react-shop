import "./TextEditor.styles.scss";
import { motion } from "framer-motion";
import { useCallback, useContext , useEffect, useRef, useState } from "react";
import {DirectoryContext} from "../../store/directory.context";
import { ChromePicker } from 'react-color';
import CodeEditor from "../CodeEditor/CodeEditor.component";
import { NotificationContext } from "../../store/notification.context";
import { updateCodeDetails } from "../../utils/firebase";
import { CodeContext } from "../../store/code.context";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const TextEditor = (props)=>{
    const {directoryOptions , setDirectoryOption} = useContext(DirectoryContext);
    const {codedFile } = useContext(CodeContext);
    const {setNotification} = useContext(NotificationContext);  
    const [isSaving , setIsSaving] = useState(false);
    const [showStyleMenu , setShowStyleMenu] = useState(false);
    const [codeEditorStyle , setCodeEditorStyle] = useState({
        size: 19,
        family : 'Trebuchet MS',
        weight : 'bolder',
        color : '#D8E3E3'
    });
    const {
        transcript,
        listening,
        interimTranscript,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
        console.log(transcript);
    
        if (!browserSupportsSpeechRecognition) {
            console.log("BROWSER DOESNT SUPPORT SPEECH RECOGNITION");
          }
    const [menuVisibilty , setMenuVisibility] = useState({
        size : false,
        family : false,
        weight : false,
        color : false
    })

    const familyArrays = ['Arial','Regular', 'Helvetica', 'Verdana', 'Geneva','Tahoma', 'Trebuchet MS'];
    const sizeArrays   = Array.from(Array(100).keys()).map(i => i + 1);
    const weightArrays = ['lighter','normal','medium','bold','bolder'];

    const code = useRef('');
    const laguages = [
        {name : '🐍 Python' , value: 'py'},
        {name : '🍵 Java' , value : 'java'},
        {name : '🤯 C++' , value : 'cpp'},
        {name : '💀 C' , value : 'c'},
        {name : '🐿️ GoLang' , value : 'go'},
        {name : '🤖 C#' , value : 'cs'},
        {name : '🍀 Node Js' , value : 'js'},
    ];
    const langaugeRef = useRef('');

    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };
      const variants2 = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      };

    

    const toggleStyleMenu = useCallback((e)=>{
        setShowStyleMenu(prevState => !prevState);
        setMenuVisibility({
            size : false,
            family : false,
            weight : false,
            color : false
        })
    },[]);

    const openMenu = useCallback((e, value)=>{
        toggleStyleMenu(e);
        setMenuVisibility(prevState => {
            return {
                ...prevState,
                [value] : !prevState[value]
            }
        });
    },[toggleStyleMenu]);
    
    const updateStyleValue = useCallback((e , type , value)=>{
        setCodeEditorStyle(prevState => {
            return {
                ...prevState,
            [type] : value
            }
        });
    },[]);

    useEffect(()=>{
        if(codeEditorStyle.size && codeEditorStyle.family && codeEditorStyle.family && codeEditorStyle.weight && codeEditorStyle.color && code.current){
            code.current.style.fontSize=codeEditorStyle.size+"px";
            code.current.style.fontFamily=codeEditorStyle.family;
            code.current.style.fontWeight=codeEditorStyle.weight;
            code.current.style.color=codeEditorStyle.color;
        }
    },[codeEditorStyle , code]);

    const runCode = useCallback(()=>{
        if(!langaugeRef.current.value){
            setNotification({status : "error" , message : "Must select a language"});
            return;
        }
        setDirectoryOption(prevState =>{
            return {
                ...prevState,
                selectedLanguage : langaugeRef.current.value,
                run : true
            }
        });
    },[setNotification, setDirectoryOption]);

    const saveToServer = useCallback(()=>{
        setIsSaving(true);
        updateCodeDetails(directoryOptions.uid, JSON.stringify(directoryOptions.directories), codedFile)
        .then(res=> {
            setIsSaving(false);
            setNotification({status : "success" , message: "Code is saved!"});
        })
        .catch(err => setIsSaving(false));
    },[codedFile,directoryOptions,setNotification]);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            saveToServer();
            // Add your desired functionality here
          }
          if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            runCode();
            // Add your desired functionality here
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [saveToServer , runCode]);

     

    
      useEffect(() => {
        if (!interimTranscript) {
          resetTranscript(); // Reset the transcript when there is no speech input
        }
      }, [interimTranscript, resetTranscript]);
      

    const toggleSpeech = ()=>{
        if(listening){
            SpeechRecognition.stopListening();
            resetTranscript();
        }
        else{
            SpeechRecognition.startListening({continuous:true});
        }
    }
   


    const familyElement = menuVisibilty.family && 
                                <motion.ul className="styleContainer" variants={variants2} animate="animate" initial="initial">
                                            {
                                                familyArrays.map(fam => 
                                                    <li key={fam} value={fam}
                                                        className={`${codeEditorStyle.family === fam ? 'activeMenu': ''}`}
                                                        onClick={(e)=>updateStyleValue(e,'family',fam)}
                                                    >
                                                        <p style={{fontFamily:fam}}>{fam}</p>
                                                    </li>    
                                                )
                                            }
                                </motion.ul>;

    const sizeElement = menuVisibilty.size && 
                            <motion.ul className="styleContainer" variants={variants2} animate="animate" initial="initial">
                                        {
                                            sizeArrays.map(s => 
                                                <li key={s} value={s} 
                                                    className={`${codeEditorStyle.size === s ? 'activeMenu': ''}`}
                                                    onClick={(e)=>updateStyleValue(e,'size',s)}
                                                >
                                                    {s}px
                                                </li>    
                                            )
                                        }
                            </motion.ul>;

    const weightElement = menuVisibilty.weight && 
                            <motion.ul className="styleContainer" variants={variants2} animate="animate" initial="initial">
                                        {
                                            weightArrays.map(weight => 
                                                <li key={weight} value={weight} 
                                                className={`${codeEditorStyle.weight === weight ? 'activeMenu': ''}`}
                                                onClick={(e)=>updateStyleValue(e,'weight',weight)}
                                                >
                                                    <p style={{fontWeight:weight}}>{weight}</p>
                                                </li>    
                                            )
                                        }
                            </motion.ul>

const colorElement = menuVisibilty.color && 
                            <motion.ul className="styleContainer" variants={variants2} animate="animate" initial="initial">
                                <ChromePicker color={codeEditorStyle.color} onChange={(updatedColor) => setCodeEditorStyle(prevState => {
                                                    return {
                                                        ...prevState, 
                                                        color : updatedColor.hex
                                                    }
                                                })} />
                            </motion.ul>
    
    return (
        <motion.div className="text-editor" variants={variants} initial="initial" animate="animate">
            <center className="flexBasis">
                <h5 className="text-editor-header">
                    <motion.button className="commonCodeButton" initial={{scale:1}} whileTap={{scale:0.8}} title="Speech to code" onClick={toggleSpeech}>🎙️ Say to code</motion.button>
                    <motion.select className="commonCodeButton" initial={{scale:1}} title="Select a language" ref={langaugeRef}>
                        <option value=''>Select a language</option>
                        {
                            laguages.map(lang => {
                                return <option key={lang.value} value={lang.value}>&nbsp; {lang.name}</option>
                            })
                        }
                    </motion.select>
                    <motion.button className="commonCodeButton"  initial={{scale:1}} whileTap={{scale:0.8}} title="save" onClick={saveToServer}>
                       {!isSaving && <span>✔️ Save</span>} 
                       {isSaving && <span>Saving....</span>}
                    </motion.button>
                    <motion.button onClick={runCode} className="commonCodeButton runButton" title="Run your code" whileTap={{scale:0.8}}>▶</motion.button>
                    <motion.button className="commonCodeButton" initial={{scale:1}} whileTap={{scale:0.8}} onClick={toggleStyleMenu} title="style">🫧 Style</motion.button>
                    {
                        showStyleMenu && 
                        <motion.ul className="styleContainer" variants={variants2} animate="animate" initial="initial">
                            <li onClick={(e)=> openMenu(e , 'family')}>🅰️ Font Family</li>
                            <li onClick={(e)=> openMenu(e , 'size')}>🔍 Font Size</li>
                            <li onClick={(e)=> openMenu(e , 'weight')}>🗿 Font Style</li>
                            <li onClick={(e)=> openMenu(e , 'color')}>🎨 Color</li>
                        </motion.ul>
                    }
                    {familyElement}
                    {sizeElement}
                    {weightElement}
                    {colorElement}
                </h5>
            </center>
            {
                directoryOptions.fileToCode && directoryOptions.fileToCode !== '' && 
                <CodeEditor fileToCode={directoryOptions.fileToCode} style={codeEditorStyle}/>
            }
            {
                (!directoryOptions.fileToCode || directoryOptions.fileToCode === '') && 
                <div className="emptyContainer">
                    Select a file first
                </div>
            }
        </motion.div>
    )
}


export default TextEditor;