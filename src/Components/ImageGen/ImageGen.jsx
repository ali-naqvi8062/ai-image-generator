import React, { useRef, useState } from 'react'
import './ImageGen.css'
import default_image from '../Assets/default_image.svg'
//require('dotenv').config();

//console.log(process.env.REACT_APP_API_KEY);

const ImageGen = () => {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const ImageGenerator = async() =>{
        if(inputRef.current.value===""){ //if nothing is in the text field
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    `Bearer ${process.env.REACT_APP_API_KEY}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,size:"512x512",

                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    } 

  return (
    <div className='ai-image-generator'>
        <div className="header">AI Image <span>generator</span></div>
        <div className="image-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" width="512" height="512"/></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see!'/>
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGen