  // const  recursive = useCallback((currentObj , gaps)=>{
    //     if(currentObj.length !== 0){
    //         currentObj.forEach((dir)=>{
    //             console.log(gaps+'Folder name : '+dir.name);
    //             if(dir.files.length > 0){
    //                 if(dir.directories.length > 0){
    //                     recursive(dir.directories,gaps+gaps);
    //                 }
    //                 dir.files.forEach((file)=>{
    //                     console.log(gaps+gaps+"Files : "+file);
    //                 })
    //             }
    //         })
    //     }
    // },[]);