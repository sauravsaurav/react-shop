import "./TextEditor.styles.scss";
import { motion } from "framer-motion";
import { useCallback, useContext , useEffect, useRef, useState } from "react";
import {DirectoryContext} from "../../store/directory.context";
import { ChromePicker } from 'react-color';

const TextEditor = ()=>{
    const {directoryOptions} = useContext(DirectoryContext);
    const [showStyleMenu , setShowStyleMenu] = useState(false);
    const [codeEditorStyle , setCodeEditorStyle] = useState({
        size: 13,
        family : 'Arial',
        weight : 'bolder',
        color : '#ffffff'

    });

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

    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };
      const variants2 = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      };

    const inputChangeHandler = useCallback((e)=>{
        e.preventDefault();
        if(e.keyCode === 219 || e.key === "{"){
            const start = code.current.selectionStart; 
            const end = code.current.selectionEnd; 
            const value = code.current.value; 
            code.current.value = value.substring(0, start) + '}' + value.substring(end); 
            code.current.selectionStart = code.current.selectionEnd = start; 
        }
        else if(e.keyCode === 57 || e.key === "("){
            const start = code.current.selectionStart; 
            const end = code.current.selectionEnd; 
            const value = code.current.value; 
            code.current.value = value.substring(0, start) + ')' + value.substring(end); 
            code.current.selectionStart = code.current.selectionEnd = start; 
        }
    },[]);

    const inputKeyDownHandler = useCallback((e)=>{
        if((e.keyCode === 9 || e.key === 'Tab') && !e.shiftKey){
            e.preventDefault();
            const start = code.current.selectionStart; 
            const end = code.current.selectionEnd; 
            const value = code.current.value; 
            code.current.value = value.substring(0, start) + '     ' + value.substring(end); 
            code.current.selectionStart = code.current.selectionEnd = start + 1; 
        }
        else if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            const cursorPosition = code.current.selectionStart;
            const currentValue = code.current.value;
            const newValue =
            currentValue.substring(0, cursorPosition - 1) +
              currentValue.substring(cursorPosition);
            code.current.value = newValue;
            code.current.selectionStart = cursorPosition - 1;
            code.current.selectionEnd = cursorPosition - 1;
          }
        else if(e.key === "'"){
            const cursorPosition = code.current.selectionStart;
            const text = code.current.value;
            const key = e.key;
            
            if (key === "'") {
                e.preventDefault();
                code.current.value = text.slice(0, cursorPosition) + "''" + text.slice(cursorPosition);
                code.current.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            }
        } 
        else if(e.key === '"'){
            const textarea = code.current;
            const key = e.key;

            if (key === "'" || key === '"') {
                e.preventDefault();

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;

                // Insert the key pressed
                textarea.value = value.substring(0, start) + key + value.substring(end);
                
                // Move cursor between the pair of quotes
                textarea.setSelectionRange(start+1, start+1);
            }
        } 
        else if(e.ctrlKey && e.key === '/'){
            e.preventDefault();
            const input = code.current;
            const value = input.value;
            const selectionStart = input.selectionStart;
            const lineStartIndex = value.lastIndexOf('\n', selectionStart - 1) + 1;
            const lineEndIndex = value.indexOf('\n', selectionStart);
            const line = value.substring(lineStartIndex, lineEndIndex !== -1 ? lineEndIndex : value.length);
            const comment = '// ';
            const newValue = value.substring(0, lineStartIndex) + comment + line + value.substring(lineEndIndex !== -1 ? lineEndIndex : value.length);
            input.value = newValue;
            const newSelectionStart = lineStartIndex + comment.length;
            input.selectionStart = newSelectionStart;
            input.selectionEnd = newSelectionStart;
        }
    },[]);

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
        
    },[codeEditorStyle])

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
            <center>
                <h5 className="press-start text-editor-header">
                    Write Your Code Here
                    <motion.button className="commonCodeButton right"  initial={{scale:1}} whileTap={{scale:0.8}}>✔️ Save</motion.button>
                    <motion.button className="commonCodeButton left" initial={{scale:1}} whileTap={{scale:0.8}} onClick={toggleStyleMenu}>🫧 Style</motion.button>
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
                <textarea ref={code} onKeyDown={inputKeyDownHandler} onKeyUp={inputChangeHandler} placeholder="Start writing here..." 
                >
                </textarea>
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