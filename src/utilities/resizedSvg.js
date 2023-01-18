import React from 'react';

export default function withResize(SvgComponent, resizeBy=1) {
  
    return (props) => (
        <SvgComponent 
        {...props}
        width={props.width*resizeBy} 
        height={props.height*resizeBy} 
        viewBox={`0 0 ${props.width} ${props.height}`}
         />
    )
}
