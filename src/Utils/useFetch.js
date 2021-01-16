import { useState } from "react";

export default function useFetch(baseUrl){

    //creating the get request
    function get(url){
        return new Promise((resolve,reject) =>{
            
            (async () =>{
                try{
                    const response = await fetch(baseUrl + url);
                    const data = await response.json();
                    if(!data){
                        return reject(data);
                    }
                    resolve(data);
                }
                catch(error){
                    console.log(error);
                    reject(error);
                }
            })();
        });
    }

    function update(url,httpBody){
        const httpHeaders = {
            "Content-Type": "application/json"
        }
        return new Promise((resolve,reject)=>{
            (async () =>{
                try{
                    const response = await fetch(baseUrl + url,{
                        method:'PUT',
                        headers: httpHeaders,
                        body:JSON.stringify(httpBody)
                    });

                    const data = await response.json();
                    if((!data) || (data.message)){
                        return reject(data);
                    }
                    resolve(data);
                }
                catch(error){
                    console.log(error);
                    reject(error);
                }
            })();
        })
    }


    return {get, update}
}