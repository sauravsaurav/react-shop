import {useState} from "react";

const useHttp = (value , url = 'https://api.codex.jaagrav.in')=>{
    const [isLoading , setIsLoading] = useState(false);
    const [hasError , setHasError]   = useState(false);
    const [response , setResponse]   = useState('');

    const sendRequest = async()=>{
        setIsLoading(true);
        setHasError(false);
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code: 'public class Main {public static void main(String[] args){System.out.println("Hello World");}}',
                    language: 'java'
                })
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setHasError(false);
                setIsLoading(false);
                setResponse(result.output);
            } catch (error) {
                console.error(error);
                setHasError(true);
                setIsLoading(false);
                setResponse(error);
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