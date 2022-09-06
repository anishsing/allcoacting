import React from 'react'

function Loader({height,width}) {
  return (
    <div style={{flex:1,display:'flex',alignItems: 'center',justifyContent: 'center'}}>
        <img src="/assets/loader.gif" height={height} width={width}/>
    </div>
  )
}

export default Loader