import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch, bindActionCreators} from 'redux';

import {drawDim,exDim} from '../constants';

import PathComp from '../components/path_comp';
import LeadPoint from '../components/lead_point';
import CompLabel from '../components/comp_label';
//import Compartment from './compartment';
//import BoundingBox from '../components/bounding_box';
//import MovingCircle from '../components/moving_circle';
import DragContainer from '../components/drag_container';

import {dragStart, dragMove, dragEnd, deselect} from '../actions/index';

import {getSelectedCompId,getNodePairsMatchedToComps,getEdgeList} from '../selectors/index';



class Comp extends Component {
constructor (props) {
  super(props);

  this.handleCompMouseDown = this.handleCompMouseDown.bind(this);
  this.handleCompMouseMove = this.handleCompMouseMove.bind(this);
  this.handleCompMouseUp = this.handleCompMouseUp.bind(this);
  this.handleDeselectPrevious = this.handleDeselectPrevious.bind(this);

}
//const Comp = ({ cx, cy, rot, startx, starty, isDragging, id, compType, compMouseDown, compMouseMove, compMouseUp, isSelected, deselectPrevious}) => {

handleCompMouseDown(id,x,y) {
    //console.log(id,x,y,'from Comp');
    this.props.compMouseDown(id,x,y);
  };

  handleCompMouseMove(id,x,y) {
    //console.log(id,x,y,'from Comp');
    let {startx, starty} = this.props.comp.movement;
    //let {isConflicting} = this.props;
    this.props.compMouseMove(id,startx,starty,x,y);
  };

  handleCompMouseUp(id,x,y) {
    //console.log(id,x,y,'from Comp');
    let {startx, starty} = this.props.comp.movement;
    //let {isConflicting} = this.props;
    this.props.compMouseUp(id,startx,starty,x,y);
  };

handleDeselectPrevious() {
    this.props.deselectPrevious(this.props.selectedId);
  }

// getPathType(compType) {
//   switch(compType) {
//     case 'RESISTOR':
//       return PathResistor;
//     case 'INDUCTOR':
//       return PathInductor;
//     case 'CAPACITOR':
//       return PathCapacitor;
//
//     default:
//       return PathResistor;
//   }
// }


  render() {
    const s = Math.sqrt(2);
    const {id} = this.props;
    let {compType, isSelected, layout, movement, label} = this.props.comp;
    let {cx, cy, rot} = layout;
    let {isDragging, startx, starty} = movement;
    //let CompPath = this.getPathType(compType);

    let rotr = rot*Math.PI/180;
    let cos=Math.cos(rotr);
    let sin=Math.sin(rotr);

    let lp1x = cx-drawDim*cos-(rot%90 != 0)*exDim*Math.sign(cos)/s;
    let lp1y = cy-drawDim*sin-(rot%90 != 0)*exDim*Math.sign(sin)/s;
    let lp2x = cx+drawDim*cos+(rot%90 != 0)*exDim*Math.sign(cos)/s;
    let lp2y = cy+drawDim*sin+(rot%90 != 0)*exDim*Math.sign(sin)/s;

    return (
      <g>

        <PathComp cx={cx} cy={cy} rot={rot} id={id} isSelected={isSelected} compType={compType}/>
        <CompLabel cx={cx} cy = {cy} rot={rot} isSelected={isSelected} label={label} />
        <DragContainer cx={cx} cy={cy} rot={rot} id={id} compType={compType}
          isDragging={isDragging}
          isSelected={isSelected}
          handleCompMouseDown={this.handleCompMouseDown}
          handleCompMouseMove={this.handleCompMouseMove}
          handleCompMouseUp = {this.handleCompMouseUp}
          handleDeselectPrevious={this.handleDeselectPrevious}/>

          <LeadPoint cx={lp1x} cy={lp1y} lpNumber={1} nodeNumber={this.props.nodePair[0]}/>
          <LeadPoint cx={lp2x} cy={lp2y} lpNumber={2} nodeNumber={this.props.nodePair[1]}/>

      </g>
    );

  }
};

// <LeadPoint cx={lp1x} cy={lp1y} rot={rot} lpNumber={1} />
// <LeadPoint cx={lp2x} cy={lp2y} rot={rot} lpNumber={2} />


const mapStateToProps = (state,ownProps) => {
  return {
    comp: state.compsById[ownProps.id],
    selectedId: getSelectedCompId(state),
    // nodepairs: getNodePairsMatchedToComps(state),
    nodePair: getEdgeList(state)[state.allIdsStaticOrder.indexOf(ownProps.id)],
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    compMouseDown: dragStart,
    compMouseMove: dragMove,
    compMouseUp: dragEnd,
    deselectPrevious: deselect},
    //handleMoveTooFast: dragMove
    dispatch);
  // return bindActionCreators({compMouseDown: dragStart}, dispatch);
  // return {};
}

export default connect(mapStateToProps,mapDispatchToProps)(Comp);
//<Compartment cx={cx} cy={cy} rot={rot} id={id} isDragging={isDragging} isSelected={isSelected} isInConflict={false} />
