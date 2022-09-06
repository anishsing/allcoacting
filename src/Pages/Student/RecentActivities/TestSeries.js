import React from 'react'

export default function TestSeries(props) {
    return (
        <>
           <div className="mt-4 shadow-lg rounded p-3 px-4">
                {console.log('data on TestSeries Page', props.item.data)}
                <div className="d-flex justify-content-between">
                    <p>
                        {props.item.data.questionCount} Questions
                    </p>
                    <p>
                        {props.item.data.timeDuration} Minutes
                    </p>
                </div>

                <div className="d-flex justify-content-between">
                    <h4>
                        {props.item.data.title}
                    </h4>
                    <div className="">
                        <button className="btn btn-success">Start&nbsp;Test</button>
                    </div>
                </div>

            </div>
        </>
    )
}
