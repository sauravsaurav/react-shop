import {useState} from "react";

const useHttp = (value , url = 'https://api.codex.jaagrav.in')=>{
    const [isLoading , setIsLoading] = useState(false);
    const [hasError , setHasError]   = useState(false);
    const [response , setResponse]   = useState('');

    const sendRequest = async(code, language ,input, callback= null)=>{
        setIsLoading(true);
        setHasError(false);
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code,
                    language,
                    input
                })
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                if(result.output && result.error === ''){
                    setHasError(false);
                    setIsLoading(false);
                    setResponse(result.output);
                }else{
                    setHasError(true);
                    setIsLoading(false);
                    setResponse(result.error);
                }
                
                if(callback)
                callback();
            } catch (error) {
                console.error(error);
                setHasError(true);
                setIsLoading(false);
                setResponse(error);
                if(callback)
                callback();
        }
    }
    

    return {
        isLoading,
        hasError,
        response,
        sendRequest
    }
}



export default useHttp;