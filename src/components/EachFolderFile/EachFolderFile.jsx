import "./EachFolderFile.styles.scss";
import Collapsible from 'react-collapsible';
import { useContext,   useCallback, Fragment , useState }  from "react";
import Menu from "../Menu/Menu.component";
import { DirectoryContext } from "../../store/directory.context";


const EachFolderFile = (props)=>{
    const {directoryOptions , setDirectoryOption } = useContext(DirectoryContext);
    const [previousMenuOpen, setPreviousMenuOpen] = useState(null);

    const { name = "" , content="The folder is empty!", isRoot=false, path = "" } = props;

    const inputBoxSubmitHandler = useCallback((value , currentAction, isRoot)=>{
        console.log(value, currentAction, isRoot);
        if(isRoot){
            if(currentAction === 'NEW_FOLDER'){
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
        }
    },[setDirectoryOption]);

    const openMenuHandler = useCallback((e, path,value= '',currentAction = '',isRoot = false)=>{
        e.preventDefault();
        e.stopPropagation();
        

        let temp =  {...directoryOptions};
        let mutated = temp;
        if(!previousMenuOpen){
            setPreviousMenuOpen({currentPath : path , previousPath : null})
        }else{
            setPreviousMenuOpen((prevState) => {
                return {previousPath : prevState.currentPath , currentPath :  path}
            });
            // if(previousMenuOpen.previousPath)
            // {
            //     let tempPath = previousMenuOpen.previousPath.split(">>").slice(0,-1);
            //     // for(let x = 0 ; x < tempPath.length ; x++){
                    
            //     //     temp = temp[tempPath[x]];
            //     // }
            //     // temp.showMenu = !temp.showMenu;
            // }
        }
        path = path.split(">>").slice(0,-1);
        if(path.length === 1){
            temp.directories.showMenu = !temp.directories.showMenu;
            setDirectoryOption(temp);
        }else{
            path = path.slice(1);
            mutated = mutated.directories.directories;

            for(let x = 0 ; x < path.length ; x++){
                if(!isNaN(path[x]))
                    mutated = mutated[path[x]];
            }
            mutated.showMenu = !mutated.showMenu;
            setDirectoryOption(temp);
        }

        inputBoxSubmitHandler(value, currentAction,isRoot);
                
    },[directoryOptions , setDirectoryOption, inputBoxSubmitHandler, previousMenuOpen]);

    
    // useEffect(()=>{
    //     if(previousMenuOpen && previousMenuOpen.previousPath){
    //         let temp =  {...directoryOptions};
    //         let mutated = temp;
    //         let path = previousMenuOpen.previousPath.split(">>").slice(0,-1);
    //         if(path.length === 1){
    //             temp.directories.showMenu = !temp.directories.showMenu;
    //             setDirectoryOption(temp);
    //         }else{
    //             path = path.slice(1);
    //             mutated = mutated.directories.directories;

    //             for(let x = 0 ; x < path.length ; x++){
    //                 if(!isNaN(path[x]))
    //                     mutated = mutated[path[x]];
    //             }
    //             mutated.showMenu = !mutated.showMenu;
    //             setDirectoryOption(temp);
    //         }
    //     }
    // },[previousMenuOpen, directoryOptions , setDirectoryOption]);
  

    const  recursive = useCallback((currentObj , gaps , objectPath)=>{
          return   currentObj.map((dir, index)=>{
                let path = objectPath+">>"+index+">>"+dir.name+">>";
                return (
                    <Fragment key={`${dir.name}`}>
                    <ul key={`${dir.name+ Math.random()}`} style={{position:"relative",minHeight:`${dir.showMenu ? '240px': ''}`, overflowY:`${dir.showMenu ? 'scroll': 'none'}`}}>
                    <li className="each-folder" onContextMenu={(e)=>openMenuHandler(e,path)} key={`${dir.name+ Math.random()}`}>
                        <Collapsible trigger={`${gaps} 📂 ${dir.name}`}>
                        {
                            dir.directories.length > 0 ? recursive(dir.directories,gaps+gaps) : 
                            (
                                   dir.files.length > 0 ?  dir.files.map((file)=>{
                                    return (
                                        <li>{gaps+gaps+"🗃️"+file}</li>
                                    )
                                    }) : 
                                    gaps+gaps+" Folder is empty"
                            )
                        }
                        </Collapsible>
                        
                    </li>
                        {
                            dir.showMenu && 
                            <Menu isRoot={false} onClose={openMenuHandler} path={path}/>
                        }
                    </ul>
                    </Fragment>
                )
            })
    },[ openMenuHandler]);

    const callToRecursiveFn = useCallback(()=>{
        if(directoryOptions.directories &&
            directoryOptions.directories.directories && directoryOptions.directories.directories.length > 0 ){
                return recursive(directoryOptions.directories.directories,'____', directoryOptions.directories.name);
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
                </Collapsible>
                {
                    directoryOptions.directories &&  directoryOptions.directories.showMenu && 
                    <Menu isRoot={isRoot} onClose={(e, currentAction,value="",isRoot=false)=>openMenuHandler(e,name+">>",value, currentAction,isRoot)} path={path}/>
                }
            </li>
    )
}

export default EachFolderFile