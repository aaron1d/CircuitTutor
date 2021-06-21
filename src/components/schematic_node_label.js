import React, {Component} from 'react';
import {drawDim, exDim, labelOffset, labelFontSize} from '../constants';
import {nodeLabelWidth,nodeLabelHeight,nodeLabelBackground,nodeLabelFontSize} from '../constants'

export default function SchematicNodeLabel({x,y,number})  {

  const cx = x-0.5*nodeLabelWidth;
  const cy = y-0.5*nodeLabelHeight;

  const strokeColor= 'black';
  const fill =nodeLabelBackground;
  const strokeWidth=1;
  const strokeLinecap='round';
  const strokeLinejoin='round';
  const label=`N${number}`;

  return (
    <g>
      <rect x={cx} y={cy} width={nodeLabelWidth} height = {nodeLabelHeight}
      stroke={strokeColor} fill={fill} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} strokeWidth={strokeWidth} />

      <text x={x} y={y+1} fontSize={nodeLabelFontSize} textAnchor='middle' dominantBaseline='middle'>
        {label}
      </text>
    </g>
  );
}
