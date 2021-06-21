import React, {Component} from 'react';
import {drawDim, exDim} from '../constants';
import {selectedColor} from '../constants'
import {getp1, getp2} from '../utils';

export default function PathComp({cx, cy, rot, id, compType, isSelected})  {

  const rotr = rot*Math.PI/180;
  const cos = Math.cos(rotr);
  const sin = Math.sin(rotr);

  const rind=drawDim/6;
  let lind=drawDim/2;
  if (rot%90 !=0) {lind+= exDim;}

  const ares = drawDim/12;
  let lres = drawDim/2;
  if (rot%90 !=0) {lres+= exDim;}

  const gcap=drawDim/5;
  const wcap=2*gcap;
  let lcap=0.9*drawDim;
  if (rot%90 !=0) {lcap+= exDim;}

  const lw = (rot%90 != 0) ? Math.sqrt(2)*drawDim : drawDim;

  let lv = drawDim*0.75;
  const rv = drawDim - lv;
  const pv = rv/2;
  const sv = rv*0.6;

  if (rot%90 !=0) {lv += exDim;}

  let li = drawDim*0.75;
  const ri = drawDim - li;
  const pi = rv/2;
  const si = rv*0.6;
  if (rot%90 !=0) {li += exDim;}

  const ldep = rv;



  let strokeColor= isSelected ? selectedColor : 'black';
  let fill ='none'
  let strokeWidth=2;
  const strokeLinecap='round';
  const strokeLinejoin='round';

  let length;
  let d;
  let start;

  switch(compType) {

    case 'V':
      length = 2*(lv+rv);
      start = {
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin,
      };
      d=`M${start.x},${start.y}
      l${lv*cos},${lv*sin}
      a${rv} ${rv} ${0} ${1} ${1} ${2*rv*cos} ${2*rv*sin}
      a${rv} ${rv} ${0} ${1} ${1} ${-2*rv*cos} ${-2*rv*sin}
      m${(rv-0.5*sv-0.5*pv)*cos},${(rv-0.5*sv-0.5*pv)*sin}
      l${pv*cos},${pv*sin}
      m${-0.5*pv*(cos+sin)},${0.5*pv*(cos-sin)}
      l${pv*sin},${-pv*cos}
      m${sv*cos-pv*sin},${sv*sin+pv*cos}
      l${pv*sin},${-pv*cos}
      m${(rv-0.5*sv)*cos-0.5*pv*sin},${(rv-0.5*sv)*sin+0.5*pv*cos}
      l${lv*cos},${lv*sin}`
      break;

    case 'I':
      length = 2*(li+ri);
      start = {
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin,
      };
      d=`M${start.x},${start.y}
      l${li*cos},${li*sin}
      a${ri} ${ri} ${0} ${1} ${1} ${2*ri*cos} ${2*ri*sin}
      a${ri} ${ri} ${0} ${1} ${1} ${-2*ri*cos} ${-2*ri*sin}


      m${(ri-0.5*si-0.25*pi)*cos},${(ri-0.5*si-0.25*pi)*sin}
      l${(si+0.5*pi)*cos},${(si+0.5*pi)*sin}
      m${-si*cos+0.5*pi*sin},${-si*sin+(-0.5*pi)*cos}
      l${-0.5*pi*(cos+sin)},${0.5*pi*(cos-sin)}
      l${0.5*pi*(cos-sin)},${0.5*pi*(cos+sin)}
      m${(ri+0.5*si-0.25*pi)*cos+0.5*pi*sin},${(ri+0.5*si-0.25*pi)*sin-0.5*pi*cos}

      l${li*cos},${li*sin}`
      break;

    case 'F':
    case 'G':
      length = 2*(li+ri);
      start = {
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin,
      };
      d=`M${start.x},${start.y}
      l${li*cos},${li*sin}

      l${ldep*(cos-sin)},${ldep*(cos+sin)}
      l${ldep*(cos+sin)},${ldep*(sin-cos)}
      l${-ldep*(cos-sin)},${-ldep*(cos+sin)}
      l${-ldep*(cos+sin)},${-ldep*(sin-cos)}

      m${(ri-0.5*si-0.25*pi)*cos},${(ri-0.5*si-0.25*pi)*sin}
      l${(si+0.5*pi)*cos},${(si+0.5*pi)*sin}
      m${-si*cos+0.5*pi*sin},${-si*sin+(-0.5*pi)*cos}
      l${-0.5*pi*(cos+sin)},${0.5*pi*(cos-sin)}
      l${0.5*pi*(cos-sin)},${0.5*pi*(cos+sin)}
      m${(ri+0.5*si-0.25*pi)*cos+0.5*pi*sin},${(ri+0.5*si-0.25*pi)*sin-0.5*pi*cos}

      l${li*cos},${li*sin}`
      break;

    case 'E':
    case 'H':
      length = 2*(lv+rv);
      start = {
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin,
      };
      d=`M${start.x},${start.y}
      l${lv*cos},${lv*sin}

      l${ldep*(cos-sin)},${ldep*(cos+sin)}
      l${ldep*(cos+sin)},${ldep*(sin-cos)}
      l${-ldep*(cos-sin)},${-ldep*(cos+sin)}
      l${-ldep*(cos+sin)},${-ldep*(sin-cos)}

      m${(rv-0.5*sv-0.5*pv)*cos},${(rv-0.5*sv-0.5*pv)*sin}
      l${pv*cos},${pv*sin}
      m${-0.5*pv*(cos+sin)},${0.5*pv*(cos-sin)}
      l${pv*sin},${-pv*cos}
      m${sv*cos-pv*sin},${sv*sin+pv*cos}
      l${pv*sin},${-pv*cos}
      m${(rv-0.5*sv)*cos-0.5*pv*sin},${(rv-0.5*sv)*sin+0.5*pv*cos}
      l${lv*cos},${lv*sin}`
      break;



    case 'W':
      // start = getp1(cx,cy,rot);
      start ={
        x: cx-lw*cos,
        y: cy-lw*sin,
      };
      d=`M${start.x},${start.y}
      l${2*lw*cos},${2*lw*sin}`
      break;

    case 'L':
      length=2*lind+6*rind;
      start={
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin
      };
      d=`M${start.x},${start.y}
        l${lind*cos},${lind*sin}
        a ${rind} ${rind} ${0} ${1} ${1} ${2*rind*cos} ${2*rind*sin}
        a ${rind} ${rind} ${0} ${1} ${1} ${2*rind*cos} ${2*rind*sin}
        a ${rind} ${rind} ${0} ${1} ${1} ${2*rind*cos} ${2*rind*sin}
        l${lind*cos},${lind*sin}`;
      break;

    case 'C':
      length=gcap+2*lcap;
      start={
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin
      };
      d=`M${start.x},${start.y}
        l${lcap*cos},${lcap*sin}
        m${-0.5*wcap*sin},${0.5*wcap*cos}
        l${wcap*sin},${-wcap*cos}
        m${gcap*cos-wcap*sin},${gcap*sin+wcap*cos}
        l${wcap*sin},${-wcap*cos}
        m${-0.5*wcap*sin},${0.5*wcap*cos}
        l${lcap*cos},${lcap*sin}`;
      break;

    // case 'W':
    //
    //   break;

    default:
    case 'R':
      length=12*ares+2*lres;
      start={
        x: cx-0.5*length*cos,
        y: cy-0.5*length*sin
      };
      d=`M${start.x},${start.y}
        l${lres*cos},${lres*sin}
        l${ares*cos-2*ares*sin},${ares*sin+2*ares*cos}
        l${2*ares*cos+4*ares*sin},${2*ares*sin-4*ares*cos}
        l${2*ares*cos-4*ares*sin},${2*ares*sin+4*ares*cos}
        l${2*ares*cos+4*ares*sin},${2*ares*sin-4*ares*cos}
        l${2*ares*cos-4*ares*sin},${2*ares*sin+4*ares*cos}
        l${2*ares*cos+4*ares*sin},${2*ares*sin-4*ares*cos}
        l${ares*cos-2*ares*sin},${ares*sin+2*ares*cos}
        l${lres*cos},${lres*sin}`;
      break;

  }




  return (
    <path
    strokeWidth={strokeWidth}
    stroke={strokeColor}
    fill={fill}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    d={d} />
  );
}
