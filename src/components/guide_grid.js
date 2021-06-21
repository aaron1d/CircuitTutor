import React from 'react';

export default function GuideGrid({ w, h, snapres, rad}) {
  let ggrid = [];
  const show=1;
  let fillcolor = 'gray ';
  let size=snapres*6;

  for (let i=1 ; i < (w / size) ; i++) {
    for (let j=1 ; j <(h/size) ; j++) {
        ggrid.push(
          <circle
            cx={ i*size }
            cy={ j*size }
            r={rad}
            fill={fillcolor}
            key={`g${i},${j}`}/>
        )
    }
  }

  return (
        <g className={
            "ad-Grid" +
            ( ! show ? "  is-hidden" : "")
        }>
            { ggrid }
        </g>
 )
}
