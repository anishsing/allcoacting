import React from 'react'

export default function RecentDocuments(props) {
    return (
        <>
           <div className="mt-4 p-3 rounded shadow-lg px-4">

                <div className="d-flex justify-content-between">
                    <h4>{props.item.data.name}</h4>
                    <h4>
                        <i class="lni lni-empty-file text-primary"></i>
                    </h4>
                </div>

            </div>  
        </>
    )
}
