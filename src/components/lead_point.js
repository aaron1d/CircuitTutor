import React, {Component} from 'react';
import {drawDim, trimDim, exDim} from '../constants';

export default function LeadPoint({cx,cy,nodeNumber,id,isConnected,schemNodeNumber}) {

  const leadPointRadius = 2;
  //const compLength = drawDim*2;
  // const rotr = rot*Math.PI/180;
  // const cos=Math.cos(rotr);
  // const sin=Math.sin(rotr);
  const strokeColor='black';
  const strokeWidth = '2';
  const fill ='black'

  // const s = Math.sqrt(2);

  // let owncx, owncy;
  // switch (lpNumber) {
  //   case 1:
  //     // owncx=cx-drawDim*cos+(rot%90 != 0)*trimDim*Math.sign(cos);
  //     // owncy=cy-drawDim*sin+(rot%90 != 0)*trimDim*Math.sign(sin);
  //     // owncx=cx-drawDim*cos;
  //     // owncy=cy-drawDim*sin;
  //     owncx=cx-drawDim*cos-(rot%90 != 0)*exDim*Math.sign(cos)/s;
  //     owncy=cy-drawDim*sin-(rot%90 != 0)*exDim*Math.sign(sin)/s;
  //     break;
  //   case 2:
  //     // owncx=cx+drawDim*cos-(rot%90 != 0)*trimDim*Math.sign(cos);
  //     // owncy=cy+drawDim*sin-(rot%90 != 0)*trimDim*Math.sign(sin);
  //     // owncx=cx+drawDim*cos;
  //     // owncy=cy+drawDim*sin;
  //     owncx=cx+drawDim*cos+(rot%90 != 0)*exDim*Math.sign(cos)/s;
  //     owncy=cy+drawDim*sin+(rot%90 != 0)*exDim*Math.sign(sin)/s;
  //     break;
  // }

  return (
    <circle
    cx={cx}
    cy={cy}
    r={leadPointRadius}
    strokeWidth={strokeWidth}
    stroke={strokeColor}
    fill={fill} />
  );
}
