import React from 'react'

const SupportComponent = (props) => {
  return (
    <div>
<div className="support flex gap-3 items-center">
    <img src={props.icon} alt="" className='h-5'/>
    {props.isshow?  <h4 className='text-sm'>{props.data}</h4>:<></>}
  
</div>
    </div>
  )
}

export default SupportComponent