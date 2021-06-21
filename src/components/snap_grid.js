import React from 'react';

export default function SnapGrid({ w, h,snapres}) {
  let sgrid = [];
  const show=1;
  let strokeColor='lightgray ';
  let strokeWidth=1;

  for (let i = 1 ; i < (w / snapres) ; i++) {
        sgrid.push(
            <line
                x1={ i * snapres }
                y1={ 0 }
                x2={ i * snapres }
                y2={ h }
                strokeWidth={strokeWidth}
                stroke = {strokeColor}
                key= {`sy${i}`}/>
        )
  }
  for (let i = 1 ; i < (h/snapres) ; i++) {
        sgrid.push(
            <line
                x1={ 0 }
                y1={ i * snapres }
                x2={ w }
                y2={ i * snapres }
                strokeWidth={strokeWidth}
                stroke = {strokeColor}
                key= {`sx${i}`} />
        )
    }

  return (
        <g className={
            "ad-Grid" +
            ( ! show ? "  is-hidden" : "")
        }>
            { sgrid }
        </g>
 )
}
