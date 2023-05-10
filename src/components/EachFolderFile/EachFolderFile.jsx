import "./EachFolderFile.styles.scss";
import Collapsible from 'react-collapsible';
import { useContext,   useCallback, Fragment   }  from "react";
import Menu from "../Menu/Menu.component";
import { DirectoryContext } from "../../store/directory.context";
import { NotificationContext } from "../../store/notification.context";

const EachFolderFile = (props)=>{
    const {directoryOptions , setDirectoryOption } = useContext(DirectoryContext);
    const { name = "" , content="The folder is empty!", isRoot=false, path = "" } = props;
    const {setNotification} = useContext(NotificationContext);



    const inputBoxSubmitHandler = useCallback((value , currentAction, isRoot , path)=>{
        if(isRoot){
            if(currentAction === 'NEW_FOLDER'){
                let foundDuplicate = false;
                if(directoryOptions.directories){
                    console.log(directoryOptions.directories);
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
                                files : [...prevState.directories.files, {name : value}]
                            }
                    }
                });
            }
            else if (currentAction === 'DELETE'){
                let temp = {...directoryOptions};
                let path = temp.selectedFile.split(">>");
                if(path.length === 2){
                    let allFiles = temp.directories.files;
                    allFiles = allFiles.filter(eachFile => eachFile.name !== path[1]);
                    temp.directories.files = allFiles;
                    setNotification({status : "success" , message : "Deletion successfull"});
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
                    mutated.files.push({name: value});
                    setDirectoryOption(temp);
                }
                else if (currentAction === 'DELETE'){
                    
                    if(directoryOptions.selectedFile !== ''){
                        let temp = {...directoryOptions};
                        let mutated = temp;
                        path = directoryOptions.selectedFile.split(">>");
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
                        setNotification({status : "success" , message : "Deletion successfull"});
                    }
                    else{
                        let temp = {...directoryOptions};
                        let mutated = temp;
                        path = path.split(">>");
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
                        setNotification({status : "success" , message : "Deletion successfull"});
                    }
                }
        }
    },[setDirectoryOption , directoryOptions , setNotification]);

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



     const  recursive = useCallback((currentObj , gaps , objectPath)=>{
          return   currentObj.map((dir, index)=>{
                let path = objectPath+">>"+index+">>"+dir.name;
                let tempPath = path.split(">>");
                return (
                    <Fragment key={`${dir.name}`}>
                    <ul key={`${dir.name+ Math.random()}`} style={{position:"relative",minHeight:`${dir.showMenu ? '240px': ''}`, overflowY:`${dir.showMenu ? 'scroll': 'none'}`}}>
                    <li data-path={path} className="each-folder" onContextMenu={(e)=>openMenuHandler(e,path)} key={`${dir.name+ Math.random()}`}>
                        <Collapsible trigger={`${gaps} 📂 ${dir.name}`} open={tempPath.includes(dir.name)}>
                            <ul>
                                {
                                    dir.directories.length > 0 ? recursive(dir.directories,gaps+"_", path) : 
                                    <></>
                                }
                                {
                                        dir.files.length > 0 ?  dir.files.map((file)=>{
                                            return (
                                                <li onContextMenu={(e)=>openMenuHandler(e,path)} data-file={`${path}>>${file.name}`} className="each-folder" key={`${dir.name + file.name+Math.random()}`}>{`${gaps}_ 🗃️`+file.name}</li>
                                            )
                                            }) : 
                                            ((!dir.directories.length &&  !dir.files.length) && `${gaps}_ Folder is empty`)
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
    },[ openMenuHandler ]);

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
                            <li onContextMenu={(e)=> openMenuHandler(e, name+">>")} data-file={`${name}>>${eachFile.name}`} className="each-folder" key={eachFile.name+Math.random()}>
                                🗃️ {eachFile.name}
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