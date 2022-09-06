import React from 'react'

export default function RecentVideos(props) {
    return (
        <>
           <div className="rounded shadow-lg p-3 mt-4">
              
            <div className="row align-items-center justify-content-center">

                <div className="col-lg-4 mt-3">
                    {/* <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src={serverApiUrl+RecentVideos.data.videoLocation}></iframe>
            </div>     */}
                    <div>
                        <img src={props.item.data.videoThumb} className="img-fluid" alt="" />
                    </div>
                </div>

                <div className="col-lg-8 mt-3">
                    <h4>
                        {props.item.data.name}
                    </h4>
                    <p>
                        {props.item.data.description}
                    </p>
                </div>

            </div>



            </div> 
        </>
    )
}
