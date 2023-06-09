import "./EachFolderFile.styles.scss";
import Collapsible from 'react-collapsible';
import { useContext,   useCallback, Fragment   }  from "react";
import Menu from "../Menu/Menu.component";
import { DirectoryContext } from "../../store/directory.context";
import { NotificationContext } from "../../store/notification.context";
import { CodeContext } from "../../store/code.context";

const EachFolderFile = (props)=>{
    const {directoryOptions , setDirectoryOption } = useContext(DirectoryContext);
    const {codedFile , setCodedFile } = useContext(CodeContext);
    const { name = "" , content="The folder is empty!", isRoot=false, path = "" } = props;
    const {setNotification} = useContext(NotificationContext);
    const saveLocal = useCallback(()=>{
        localStorage.setItem("directoryOption",JSON.stringify(directoryOptions));
        localStorage.setItem("codedFiles", JSON.stringify(codedFile));
        localStorage.setItem('isSaved','false');
    },[directoryOptions,codedFile]);

    const inputBoxSubmitHandler = useCallback((value , currentAction, isRoot , path)=>{
        if(isRoot){
            if(currentAction === 'NEW_FOLDER'){
                let foundDuplicate = false;
                if(directoryOptions.directories){
                    directoryOptions.directories.directories.forEach((dir)=>{
                        if(dir.name === value){
                            foundDuplicate = true;
                        }
                    });
                }
                if(foundDuplicate === true){
                    setNotification({status : "error" , message : "Duplicate folder under same level is not allowed"});
                    return ;
                }
                setDirectoryOption(prevState => {
                    return {
                        ...prevState,
                        directories: 
                            {
                                ...prevState.directories,
                                directories: [...prevState.directories.directories,{name: value,files: [], directories:[] , showMenu:false}]
                            }
                    }
                });
                saveLocal();
            }
            else if(currentAction === 'NEW_FILE'){
                let foundDuplicate = false;
                if(directoryOptions.directories){
                    directoryOptions.directories.files.forEach((file)=>{
                        if(file.name === value){
                            foundDuplicate = true;
                        }
                    });
                }
                if(foundDuplicate === true){
                    setNotification({status : "error" , message : "Duplicate file under same level is not allowed"});
                    return ;
                }
                setDirectoryOption(prevState => {
                    return {
                        ...prevState,
                        directories: 
                            {
                                ...prevState.directories,
                                directories: [...prevState.directories.directories],
                                files : [...prevState.directories.files, {name : value , id:path+value ,value:'', isSaved:false , path: path+value}]
                            }
                    }
                });
                saveLocal();
            }
            else if (currentAction === 'DELETE'){
                let temp = {...directoryOptions};
                let tempCodedFile = [...codedFile];
                tempCodedFile = tempCodedFile.filter(f => f.id !== temp.selectedFile);
                let path = temp.selectedFile.split(">>");
                temp.selectedFile = '';
                if(path.length === 2){
                    let allFiles = temp.directories.files;
                    allFiles = allFiles.filter(eachFile => eachFile.name !== path[1]);
                    temp.directories.files = allFiles;
                    setCodedFile(tempCodedFile);
                    setDirectoryOption(temp);
                    setNotification({status : "success" , message : "Deletion successfull"});
                    saveLocal();
                }
                else if(path.length === 1){
                    setNotification({status : "error" , message : "Cannot delete root directory!"});
                }
            }
        }
        else{
            if(currentAction === 'NEW_FOLDER'){ 
                let temp = {...directoryOptions};
                let mutated = temp;
                path = path.split(">>").slice(0,-1);
                path.forEach(p => {
                    if(p === 'root' || p === 'undefined'){
                        mutated = mutated.directories;
                    }
                    else if(!isNaN(p)){
                        mutated = mutated.directories[p];
                    }
                });
                let foundDuplicate = false;
                mutated.directories.forEach((dir)=>{
                    if(dir.name === value){
                        foundDuplicate = true;
                    }
                });
                if(foundDuplicate === true){
                    setNotification({status : "error" , message : "Duplicate folder under same level is not allowed"});
                    return ;
                }
                mutated.directories.push({name: value,files: [], directories:[] , showMenu:false});
                setDirectoryOption(prevState => {
                    return {
                        ...prevState,
                        directories: temp.directories
                    }
                });
                saveLocal();
            }
            else if(currentAction === 'NEW_FILE'){
                    let temp = {...directoryOptions};
                    let mutated = temp;
                    path = path.split(">>").slice(0,-1);
                    path.forEach(p => {
                        if(p === 'root' || p === 'undefined'){
                            mutated = mutated.directories;
                        }
                        else if(!isNaN(p)){
                            mutated = mutated.directories[p];
                        }
                    });
                    let foundDuplicate = false;
                    mutated.files.forEach((file)=>{
                        if(file.name === value){
                            foundDuplicate = true;
                        }
                    });
                    if(foundDuplicate === true){
                        setNotification({status : "error" , message : "Duplicate file under same level is not allowed"});
                        return ;
                    }
                    mutated.files.push({name: value, id : path.join(">>")+">>"+value , isSaved: false , value:'' , path:path.join(">>")+">>"+value });
                    setDirectoryOption(temp);
                    saveLocal();
                }
                else if (currentAction === 'DELETE'){
                    
                    if(directoryOptions.selectedFile !== ''){
                        let temp = {...directoryOptions};
                        let mutated = temp;
                        let tempCodedFile = [...codedFile];
                        path = directoryOptions.selectedFile.split(">>");
                        tempCodedFile = tempCodedFile.filter((f) => {
                            let lastFileName = f.id.split(">>");
                            return lastFileName[lastFileName.length - 1] !== path[path.length-1];
                        });
                        temp.selectedFile = '';
                        path.forEach(p => {
                            if(p === 'root' || p === 'undefined'){
                                mutated = mutated.directories;
                            }
                            else if(!isNaN(p)){
                                mutated = mutated.directories[p];
                            }
                        });
                        let allFiles = mutated.files;
                        
                        allFiles = allFiles.filter(eachFile => eachFile.name !== path[path.length-1]);
                        mutated.files = allFiles;
                        setDirectoryOption(temp);
                        setCodedFile(tempCodedFile);
                        saveLocal();
                        setNotification({status : "success" , message : "Deletion successfull"});
                    }
                    else{
                        let temp = {...directoryOptions};
                        let mutated = temp;
                        path = path.split(">>");
                        let tempCodedFile = [...codedFile];
                        tempCodedFile = tempCodedFile.filter((f) => {
                            let lastFileName = f.id.split(">>");
                            return lastFileName[lastFileName.length - 1] !== path[path.length-1];
                        });
                        temp.selectedFile = '';
                        let pathLength = path.length;
                        if(pathLength > 3)
                            path.splice(path.length -2 , path.length - 1);
                        let lastFolderName = path[path.length-1];
                        if(pathLength > 3){
                            path.forEach((p)=>{
                                if(p === 'root' || p === 'undefined'){
                                    mutated = mutated.directories;
                                }
                                else if(!isNaN(p)){
                                    mutated = mutated.directories[p];
                                }
                            });
                        }
                        else{
                            mutated = mutated.directories;
                        }
                        const index = mutated.directories.findIndex(p => p.name === lastFolderName);
                        mutated.directories.splice(index,1);
                        setDirectoryOption(temp);
                        setCodedFile(tempCodedFile);
                        saveLocal();
                        setNotification({status : "success" , message : "Deletion successfull"});
                    }
                }
        }
    },[setDirectoryOption , directoryOptions , setNotification, codedFile, setCodedFile,saveLocal]);

    const openMenuHandler = useCallback((e, path,value= '',currentAction = '',isRoot = false)=>{
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        
        
        let temp =  {...directoryOptions};
        if(e){
            if(e.target.getAttribute("data-file")){
                temp.selectedFile = e.target.getAttribute("data-file");
            }else{
                temp.selectedFile = '';
            }
        }
        
        let mutated = temp;
        let tempPath = path;
        path = path.split(">>").slice(0,-1);
        if(path.length === 1){
            temp.directories.showMenu = !temp.directories.showMenu; 
            setDirectoryOption(temp);
            
        }else{
            path = path.slice(1);
            temp.directories.showMenu = false;
            mutated = mutated.directories.directories;

            for(let x = 0 ; x < path.length ; x++){
                if(!isNaN(path[x]))
                {
                    if(mutated[path[x]])
                        mutated = mutated[path[x]];
                    else
                        mutated = mutated.directories[path[x]];
                }
                    
            }
            mutated.showMenu = !mutated.showMenu;
            setDirectoryOption(temp);
        }

       

        inputBoxSubmitHandler(value, currentAction,isRoot, tempPath);
                
    },[directoryOptions , setDirectoryOption, inputBoxSubmitHandler]);

    const setFileToCode = useCallback((e, file)=>{
        setDirectoryOption(prevState => {
            return {
                ...prevState,
                fileToCode : file
            }
        });
    },[setDirectoryOption]);


     const  recursive = useCallback((currentObj , gaps , objectPath)=>{
          return   currentObj.map((dir, index)=>{
                let path = objectPath+">>"+index+">>"+dir.name;
                let tempPath = path.split(">>");
                return (
                    <Fragment key={`${dir.name}`}>
                    <ul key={`${dir.name+ Math.random()}`} style={{position:"relative",minHeight:`${dir.showMenu ? '240px': ''}`, overflowY:`${dir.showMenu ? 'scroll': 'none'}`}}>
                    <li data-path={path} className="each-folder" onContextMenu={(e)=>openMenuHandler(e,path)} key={`${dir.name+ Math.random()}`}>
                        <Collapsible trigger={`|${gaps} 📂 ${dir.name}`} open={tempPath.includes(dir.name)}>
                            <ul>
                                {
                                    dir.directories.length > 0 ? recursive(dir.directories,gaps+"_", path) : 
                                    <></>
                                }
                                {
                                        dir.files.length > 0 ?  dir.files.map((file)=>{
                                            return (
                                                <li onClick={(e)=> setFileToCode(e,{...file,name: path+">>"+file.name})} onContextMenu={(e)=>openMenuHandler(e,path)} data-file={`${path}>>${file.name}`} className={`${(path+">>"+file.name) === directoryOptions.fileToCode.name ? 'activeFile': ''} each-folder`} key={`${dir.name + file.name+Math.random()}`}>{`|${gaps}_ 🗃️`+file.name}</li>
                                            )
                                            }) : 
                                            ((!dir.directories.length &&  !dir.files.length) && `|${gaps}_ Folder is empty`)
                                }
                            </ul>
                        </Collapsible>
                        {
                            dir.showMenu && 
                            <Menu isRoot={false}  onClose={(e, currentAction,value="",isRoot=false)=>openMenuHandler(e,path,value, currentAction,isRoot)} path={path}/>
                        }
                    </li>
                    </ul>
                    </Fragment>
                )
            })
    },[ openMenuHandler, setFileToCode , directoryOptions.fileToCode]);

    const callToRecursiveFn = useCallback(()=>{
        if(directoryOptions.directories &&
            directoryOptions.directories.directories && directoryOptions.directories.directories.length > 0 ){
                return recursive(directoryOptions.directories.directories,'__', directoryOptions.directories.name);
            }
    },[recursive , directoryOptions.directories]);


   
    

    return (
            <li className="each-folder" onContextMenu={(e)=> openMenuHandler(e, name+">>")}>
                <Collapsible trigger={`📂
                 ${name}`}>
                     {content}
                    {
                        callToRecursiveFn()
                    }
                    {
                        (directoryOptions.directories &&  directoryOptions.directories.files.length > 0) && 
                        directoryOptions.directories.files.map(eachFile =>
                            <li onClick={(e)=> setFileToCode(e,{...eachFile, name:name+">>"+eachFile.name })} onContextMenu={(e)=> openMenuHandler(e, name+">>")} data-file={`${name}>>${eachFile.name}`} className={`${(name+">>"+eachFile.name) === directoryOptions.fileToCode.path ? 'activeFile' : ''} each-folder`} key={eachFile.name+Math.random()}>
                                |__🗃️ {eachFile.name}
                            </li>    
                        )
                    }
                </Collapsible>
                {
                    directoryOptions.directories &&  directoryOptions.directories.showMenu && 
                    <Menu isRoot={isRoot} onClose={(e, currentAction,value="",isRoot=false)=>openMenuHandler(e,name+">>",value, currentAction,isRoot)} path={path}/>
                }
            </li>
    )
}

export default EachFolderFile