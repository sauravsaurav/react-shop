import {useEffect, useRef, useCallback , useContext} from "react";
import { CodeContext } from "../../store/code.context";




const CodeEditor = ({fileToCode, style})=>{
    
    const {codedFile , setCodedFile} = useContext(CodeContext);
    const saveLocal = useCallback(()=>{
        localStorage.setItem("codedFiles", JSON.stringify(codedFile));
        localStorage.setItem('isSaved','false');
    },[codedFile]);
    const initialValue = useCallback((fileToCode)=>{
        let temp = codedFile.find(c=> c.id === fileToCode.id);
        let timer;
        clearTimeout(timer);
        setTimeout(()=>{
            if(temp){
                code.current.value = temp.value;
            }else{
                code.current.value = ''
            }
        });
    },[codedFile]);

    useEffect(()=>{
        if(style.size && style.family && style.family && style.weight && style.color && code.current){
            code.current.style.fontSize=style.size+"px";
            code.current.style.fontFamily=style.family;
            code.current.style.fontWeight=style.weight;
            code.current.style.color=style.color;
        }
    },[style]);
    
    const initiate = useCallback(()=>{
        initialValue(fileToCode);
    },[initialValue, fileToCode]);

    useEffect(()=>{
        initiate();
    },[initiate, fileToCode]);

    const code = useRef('');

    const inputChangeHandler = useCallback((e)=>{
        e.preventDefault();
        if(e.keyCode === 219 || e.key === "{"){
            const start = e.target.selectionStart; 
            const end = e.target.selectionEnd; 
            const value = e.target.value; 
            e.target.selectionStart = e.target.selectionEnd = start; 
            code.current.value= value.substring(0, start) + '}' + value.substring(end);
            
            let tempCoded = [...codedFile];
            tempCoded = tempCoded.find(c => c.id === fileToCode.id);
            if(!tempCoded){
                const updatedData = [...codedFile , {id : fileToCode.id , value :value.substring(0, start) + '}' + value.substring(end) }];
                setCodedFile(updatedData);
            }else{
                setCodedFile(prevState => {
                    return prevState.map(item => {
                        if (item.id === fileToCode.id) {
                          return { ...item, value:value.substring(0, start) + '}' + value.substring(end)};
                        }
                        return item;
                      });
                })
            }
            code.current.selectionStart = code.current.selectionEnd = start;
            saveLocal();
        }
        else if(e.keyCode === 57 || e.key === "("){
            const start = e.target.selectionStart; 
            const end = e.target.selectionEnd; 
            const value = e.target.value; 
            e.target.selectionStart = e.target.selectionEnd = start; 
            code.current.value=value.substring(0, start) + ')' + value.substring(end);
           
            let tempCoded = [...codedFile];
            tempCoded = tempCoded.find(c => c.id === fileToCode.id);
            if(!tempCoded){
                const updatedData = [...codedFile , {id : fileToCode.id , value :value.substring(0, start) + ')' + value.substring(end) }];
                setCodedFile(updatedData);
            }else{
                setCodedFile(prevState => {
                    return prevState.map(item => {
                        if (item.id === fileToCode.id) {
                          return { ...item, value:value.substring(0, start) + ')' + value.substring(end)};
                        }
                        return item;
                      });
                })
            }
            code.current.selectionStart = code.current.selectionEnd = start; 
            saveLocal();
        }
        else{
            let tempCoded = [...codedFile];
            tempCoded = tempCoded.find(c => c.id === fileToCode.id);
            if(!tempCoded){
                const updatedData = [...codedFile , {id : fileToCode.id , value :e.target.value }];
                setCodedFile(updatedData);
            }else{
                setCodedFile(prevState => {
                    return prevState.map(item => {
                        if (item.id === fileToCode.id) {
                          return { ...item, value:e.target.value};
                        }
                        return item;
                      });
                })
            }
            saveLocal();
        }
    },[setCodedFile, fileToCode, codedFile,saveLocal]);

    const inputKeyDownHandler = useCallback((e)=>{
        if ((e.keyCode === 9 || e.key === 'Tab') && !e.shiftKey) {
            e.preventDefault();
            e.persist(); // Persist the event
        
            // Use setTimeout to run the code asynchronously
            setTimeout(() => {
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const value = e.target.value;
        
              // Update the textarea value by inserting spaces at the current selection
              const newValue = value.substring(0, start) + '     ' + value.substring(end);
              code.current.value = newValue;
        
              // Update the state with the new value
                let tempCoded = [...codedFile];
                tempCoded = tempCoded.find(c => c.id === fileToCode.id);
                if(!tempCoded){
                    const updatedData = [...codedFile , {id : fileToCode.id , value :newValue }];
                    setCodedFile(updatedData);
                }else{
                    setCodedFile(prevState => {
                        return prevState.map(item => {
                            if (item.id === fileToCode.id) {
                            return { ...item, value:newValue};
                            }
                            return item;
                        });
                    })
                }
        
              // Set the new selection range
              e.target.setSelectionRange(start + 5, start + 5);
            }, 0);
          } 
        else if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart;
            const currentValue = e.target.value;
            const newValue =
            currentValue.substring(0, cursorPosition - 1) +
              currentValue.substring(cursorPosition);
            e.target.selectionStart = cursorPosition - 1;
            e.target.selectionEnd = cursorPosition - 1;
            code.current.value=newValue;
            let tempCoded = [...codedFile];
                tempCoded = tempCoded.find(c => c.id === fileToCode.id);
                if(!tempCoded){
                    const updatedData = [...codedFile , {id : fileToCode.id , value :newValue }];
                    setCodedFile(updatedData);
                }else{
                    setCodedFile(prevState => {
                        return prevState.map(item => {
                            if (item.id === fileToCode.id) {
                            return { ...item, value:newValue};
                            }
                            return item;
                        });
                    })
                }
          }
        else if (e.key === "'" || e.key === "’" || e.key === "`") {
        e.preventDefault();
        const cursorPosition = e.target.selectionStart;
        const text = e.target.value;
        
        // Determine the appropriate quotation mark to insert based on the pressed key
        const quotationMark = e.key === "`" ? "``" : "''";
        
        // Insert the quotation mark at the cursor position
        const newValue = text.slice(0, cursorPosition) + quotationMark + text.slice(cursorPosition);
        
        // Update the textarea value and state
        code.current.value = newValue;
        let tempCoded = [...codedFile];
                tempCoded = tempCoded.find(c => c.id === fileToCode.id);
                if(!tempCoded){
                    const updatedData = [...codedFile , {id : fileToCode.id , value :newValue }];
                    setCodedFile(updatedData);
                }else{
                    setCodedFile(prevState => {
                        return prevState.map(item => {
                            if (item.id === fileToCode.id) {
                            return { ...item, value:newValue};
                            }
                            return item;
                        });
                    })
                }
        
        // Set the new selection range
        e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        }
          
        else if (e.key === '"' || e.key === '“' || e.key === '”') {
        e.preventDefault();
        
        const textarea = e.target;
        const key = e.key;
        
        // Determine the appropriate quotation mark to insert based on the pressed key
        const quotationMark = key === '“' || key === '”' ? '“”' : '"';
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        
        const newValue = value.substring(0, start) + quotationMark + value.substring(start, end) + quotationMark + value.substring(end);
        
        // Update the textarea value and state
        code.current.value = newValue;
        let tempCoded = [...codedFile];
                tempCoded = tempCoded.find(c => c.id === fileToCode.id);
                if(!tempCoded){
                    const updatedData = [...codedFile , {id : fileToCode.id , value :newValue }];
                    setCodedFile(updatedData);
                }else{
                    setCodedFile(prevState => {
                        return prevState.map(item => {
                            if (item.id === fileToCode.id) {
                            return { ...item, value:newValue};
                            }
                            return item;
                        });
                    })
                }
        
        // Move the cursor between the pair of quotes
        textarea.setSelectionRange(start + 1, start + 1);
        }
        else if(e.ctrlKey && e.key === '/'){
            e.preventDefault();
            const input = e.target;
            const value = input.value;
            const selectionStart = input.selectionStart;
            const lineStartIndex = value.lastIndexOf('\n', selectionStart - 1) + 1;
            const lineEndIndex = value.indexOf('\n', selectionStart);
            const line = value.substring(lineStartIndex, lineEndIndex !== -1 ? lineEndIndex : value.length);
            const comment = '// ';
            const newValue = value.substring(0, lineStartIndex) + comment + line + value.substring(lineEndIndex !== -1 ? lineEndIndex : value.length);
            const newSelectionStart = lineStartIndex + comment.length;
            input.selectionStart = newSelectionStart;
            input.selectionEnd = newSelectionStart;

            code.current.value=newValue;

            let tempCoded = [...codedFile];
                tempCoded = tempCoded.find(c => c.id === fileToCode.id);
                if(!tempCoded){
                    const updatedData = [...codedFile , {id : fileToCode.id , value :newValue }];
                    setCodedFile(updatedData);
                }else{
                    setCodedFile(prevState => {
                        return prevState.map(item => {
                            if (item.id === fileToCode.id) {
                            return { ...item, value:newValue};
                            }
                            return item;
                        });
                    })
                }
        }
        saveLocal();
    },[setCodedFile,codedFile,fileToCode,saveLocal]);

   

    return (
        <textarea ref={code} spellCheck={false}  onKeyDown={inputKeyDownHandler} onKeyUp={inputChangeHandler} placeholder="Start writing here..." 
                >
        </textarea>
    )
};

export default CodeEditor;