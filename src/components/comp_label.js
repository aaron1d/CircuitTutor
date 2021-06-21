import React, {Component} from 'react';
import {drawDim, exDim, labelOffset, labelFontSize} from '../constants';
import {selectedColor} from '../constants'

export default function CompLabel({cx, cy, rot, label, isSelected})  {

  const rotr = rot*Math.PI/180;
  const cos = Math.cos(rotr);
  const sin = Math.sin(rotr);

  const changeAngle = (rot) => {
    if (rot>=270) {return rot-360;}
    else if(rot>90) {return rot-180;}
    else {return rot;}
  };
  const ownAngle = changeAngle(rot);

  const ownx = cx+labelOffset*sin;
  const owny = cy-labelOffset*cos;




  return (
    <text x={ownx} y={owny} fontSize={labelFontSize}
      transform={`rotate(${ownAngle} ${ownx},${owny})`}
      textAnchor='middle' alignmentBaseline='middle'>
      {label}
    </text>
  );
}
