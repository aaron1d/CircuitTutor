import React from 'react';
import {drawDim} from '../constants';

export default function DragContainer({cx, cy, rot, id, isDragging, isSelected, compType, handleCompMouseDown, handleCompMouseMove, handleCompMouseUp, handleDeselectPrevious}) {

  const handleMouseDown = (id,e) => {
    e.preventDefault();
    //console.log('box',id,compType,e.clientX,e.clientY);
    if (!isSelected) { handleDeselectPrevious();}
    handleCompMouseDown(id,e.clientX,e.clientY);
  };

  const handleMouseMove = (id,e) => {
    e.preventDefault();
    if (isDragging) {
      //console.log('move',id,compType,e.clientX,e.clientY);
      handleCompMouseMove(id,e.clientX,e.clientY);
    }
  };

  const handleMouseUp = (id,e) => {
    e.preventDefault();
    if (isDragging) {
      //console.log('move',id,compType,e.clientX,e.clientY);
      handleCompMouseUp(id,e.clientX,e.clientY);
    }
  };

  let strokeColor='none';
  let fill ='white';
  let fillOpacity=0;
  let strokeWidth=2;
  const strokeLinecap='round';
  const strokeLinejoin='round';


  if (isDragging) {

    return (
      <circle
      cx={cx}
      cy={cy}
      r={drawDim*10}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill={fill}
      fillOpacity={fillOpacity}
      onMouseDown = {(e) => handleMouseDown(id,e)}
      onMouseMove = {(e) => handleMouseMove(id,e)}
      onMouseUp = {(e) => handleMouseUp(id,e)}
       />
    );

  } else {

    let width, length, offset;
    switch(compType) {
      case 'R':
        width=drawDim/1.5;
        length=drawDim;
        offset=0;
        break;
      case 'L':
        //width=drawDim/6;
        width=drawDim/3;
        length=drawDim;
        offset=0;
        //offset=width/2;
        break;
      case 'C':
        width=drawDim/2.5;
        length=drawDim;
        offset=0;
        break;
      case 'W':
        width=drawDim/1.5;
        length=drawDim*1.5;
        offset=0;
        break;


      default:
        width=drawDim/1.5;
        length=drawDim;
        offset=0;;
        break;
    }

    const rotr = rot*Math.PI/180;
    const cos = Math.cos(rotr);
    const sin = Math.sin(rotr);

    let start={
      x: cx-0.5*length*cos,
      y: cy-0.5*length*sin
    }

    let d=`M${cx},${cy}
        m${-offset*sin},${offset*cos}
        m${0.5*width*sin},${-0.5*width*cos}
        m${0.5*length*cos},${0.5*length*sin}
        l${-width*sin},${width*cos}
        l${-length*cos},${-length*sin}
        l${width*sin},${-width*cos}
        z`

    return (
      <path
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      fill={fill}
      fillOpacity={fillOpacity}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      d={d}
      id={id}
      onMouseDown = {(e) => handleMouseDown(id,e)}
      onMouseMove = {(e) => handleMouseMove(id,e)}
      onMouseUp = {(e) => handleMouseUp(id,e)}
      />
    );
  }



}
