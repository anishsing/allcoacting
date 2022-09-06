import React, { useState } from 'react';

import { CSVReader } from 'react-papaparse'

const CsvParser = props => { 
    const {callbackLoader,callbackQuestion,testSeriesId,errorsCallback} = props;
    const allowedHeaders=["Question","Option A","Option B","Option C","Option D","Correct Option","Explanation"];
    const handleOnDrop = (data) => {
        callbackLoader(true)
      
        let questionArr = [];
        let errors =[]
        let headers = data.splice(0,1)[0].data
      
        // headers.map((item,index) => {    
        //     if(!allowedHeaders.includes(item))
        //     {
        //          errors.push({message:"File formatting error: Column name '"+item+"' should be '"+allowedHeaders[index]+"', PLease Check Your File"})
        //          return;
        //     }
        // })
        // if(errors.length)
        // {
        //     // errorsCallback(errors)
        //     console.log(errors)
        //     return ;
        // }
        data.map(item =>{
            item = item['data']
            if(item[0])
            {
                let question = {
                 
                    question:item[0],
                    optionA:item[1],
                    optionB:item[2],
                    optionC:item[3],
                    optionD:item[4],
                    correctOpt:item[5], 
                    explanation:item[6],
                    questionType:1,
                    optionType:1,
                    testSeriesId: testSeriesId
                }
                questionArr.push(question);
            }
            
            
        })
        callbackQuestion(questionArr);
        callbackLoader(false)
       
      }
    
     const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
        errorsCallback(err)
      }
    
    const  handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
      }
   return(
    <div className="d-flex" style={{flexDirection:'column'}}>
        <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton 
            removeButtonColor='#659cef'
            onRemoveFile={handleOnRemoveFile}
        >
            <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        <a  download href="/assets/TEST_SERIES_BULK_UPLOAD_FORMAT.csv"   className="btn btn-primary m-2" style={{alignSelf: 'flex-end'}}>Download Upload Format</a>
    </div>       
   )
};
 
export default CsvParser 