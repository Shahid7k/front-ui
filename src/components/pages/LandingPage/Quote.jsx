import React,{useState,useEffect} from 'react';
import axios from 'axios';


const initialQuote = {
    text:"Something",
    author:"someone"
}
const i =  Math.round(1000* Math.random() )
const Quote =()=>{ 
    const [quote, saveQuote] = useState({...initialQuote});
    useEffect(()=>{
        async function getData(){
            const result=await axios.get("https://type.fit/api/quotes")
            saveQuote({author:result.data[i].author, text:result.data[i].text})
        }
        getData()
    },[])
   return(
        <>
            <span className="bg-half-dark font08">
                {"“"}  {quote.text}{"”"} <br /> <span  className="font07">{" - "}{quote.author==null?"Anonymous":quote.author} </span>
            </span>
        </>
        );
  }


export default Quote;