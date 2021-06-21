import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import GuideGrid from '../components/guide_grid';
import SnapGrid from '../components/snap_grid';
import SchematicNodeLabel from '../components/schematic_node_label';
//import AddWireCrosshairs from '../components/add_wire_crosshairs';
import Comp from './comp';
import LeadPoint from '../components/lead_point';
import {getSelectedCompId, getLeadPointList, getConflictingCenters, getSelectedComp, getConflictingIds} from '../selectors/index';
import {getAllCenters, getAvailableCenterLocations, getUnavailableCenterLocations, getLeadPointsById} from '../selectors/index';
import {getCurrentLayoutArray,getSchematicNodeArray,getNodePairsMatchedToComps,getGraphMatrix} from '../selectors/index';
import {getDirectedNodeAdjacencyListWithIds,getWireGroupArray} from '../selectors/index';

import {deselect} from '../actions/index';

import {includes} from 'lodash';



class Schematic extends Component {
  constructor(props) {
    super(props);

    this.handleSchematicClick=this.handleSchematicClick.bind(this);
    this.crosshairsMove=this.crosshairsMove.bind(this);
    this.handleMouseOver=this.handleMouseOver.bind(this);
    this.handleMouseOut=this.handleMouseOut.bind(this);
    //
    this.state = {chx: null, chy: null, wireMouseOver: false, left: null, right: null}

  }

  componentDidMount() {
    let rect = ReactDOM.findDOMNode(this.refs.schem).getBoundingClientRect();
    let left = Math.ceil(rect.left);
    let top = Math.floor(rect.top);
    this.setState({left, top});
    console.log(left,top);
  }

  handleSchematicClick () {
    console.log('schematicClick');

      this.props.schematicClickAction(this.props.selectedCompId);
  }




  renderComps (allIds, conflicts) {
    return allIds.map( (id) => {
      // console.log(this.props.nodesMatchedToComps);
      return (
        < Comp
          key={id}
          id={id}
          />
      );
    });
  }

  renderNodeLabels (schematicNodeArray,showNodeLabels) {
    if ((schematicNodeArray.length > 0)&&(showNodeLabels)) {
      return schematicNodeArray.map ( (loc,i) => {
        return (
          <SchematicNodeLabel key={i} x={loc.x} y={loc.y} number={i} />
        );
      });
    }
  }

  // renderLeadPoints(allIds) {
  //   let group, lp1, lp2;
  //   return allIds.map( (id) => {
  //     group = this.props.leadPointGroups[id];
  //     lp1 = group[1];
  //     lp2 = group[2];
  //     return (
  //       <g key={''+id+'_lpg'}>
  //         <LeadPoint
  //           id={''+id+'.1'} key={''+id+'.1'}
  //           cx = {lp1.x} cy={lp1.y} isConnected={lp1.isConnected}
  //           />
  //         <LeadPoint
  //           id={''+id+'.2'} key={''+id+'.2'}
  //           cx = {lp2.x} cy={lp2.y} isConnected={lp2.isConnected}
  //           />
  //       </g>
  //     );
  //   });
  // }

  // var dim = e.getBoundingClientRect();
  //     var x = evt.clientX - dim.left;
  //     var y = evt.clientY - dim.top;


  handleMouseOver(e) {

    this.setState({wireMouseOver: true,});
    // //this.crosshairsMove(e);
    // console.log(this.state.chx,this.state.chy);
  };

  handleMouseOut(e) {
    this.setState({chx: null, chy: null, wireMouseOver: false,});
  };

  crosshairsMove(e) {
    if((this.props.mode=='MODE_ADDING_WIRE')&&(this.state.wireMouseOver==1)) {
      //var dim = e.getBoundingClientRect();
      this.setState({chx: e.clientX-this.state.left, chy: e.clientY-this.state.top});
      //console.log(this.state.chx,this.state.chy);
    }
  };

  renderCrosshairs() {
    if((this.props.mode=='MODE_ADDING_WIRE')&&(this.state.wireMouseOver==1)) {
      return(
        <AddWireCrosshairs
          x={this.state.chx} y={this.state.chy}
          cursorIsOverSchematic={this.state.wireMouseOver}
          lastPoint={this.props.lastPoint}
          handleAddWirePointClick={null}
          leadPointArray={null}
        />
      );
    }
  }

  // renderWireLayer() {
  //   if(this.props.mode=='MODE_ADDING_WIRE') {
  //     return (
  //       <rect x='0' y='0'
  //         stroke='none' fillOpacity='0'
  //         height={this.props.height}
  //         width={this.props.width}
  //         onMouseOver = {this.handleMouseOver}
  //          />
  //     );
  //   }
  // }

  render () {
    const { height, width, allIds, compsById, schematicNodeArray, showNodeLabels, conflicts, ...other} = this.props;


    return (
      <svg
        ref = 'schem'

        height={height}
        width = {width}
        onClick={this.handleSchematicClick}
        onMouseMove = {this.crosshairsMove}
        onMouseOut = {this.handleMouseOut} >

        <SnapGrid h={height} w={width} snapres={10} onClick={this.handleSchematicClick} />
        <GuideGrid h={height} w={width} snapres={10} rad={2} onClick={this.handleSchematicClick}  />

        { this.renderComps(allIds, conflicts) }
        { this.renderNodeLabels(schematicNodeArray,showNodeLabels) }
        

      </svg>

    )
  }
}
// { console.log('cycles: ', this.state.allCycles, '--------------')}

// { this.renderCrosshairs()}
// { this.renderWireLayer()}
// { this.renderLeadPoints(allIds) }
//AddWireCrosshairs({x, y, cursorIsOverSchematic, lastPoint, handleAddWirePointClick, leadPointArray })

const mapStateToProps = (state) => {
  return {
    compsById: state.compsById,
    allIds: state.allIds,
    leadPointGroups: state.leadPointGroupsById,
    showNodeLabels: state.settings.showNodeLabels,
    //mode: state.mode,
    //lastPoint: state.wiresById.lastPoint,
    selectedCompId: getSelectedCompId(state),
    //leadPointList: getLeadPointList(state),
    selectedComp: getSelectedComp(state),
    //conflicts: getConflictingIds(state),
    avaialbleCenterLocations: getAvailableCenterLocations(state),
    //allCenters: getAllCenters(state),
    //unavailableCenterLocations: getUnavailableCenterLocations(state),
    //leadPointsById: getLeadPointsById(state),
    //currentLayoutArray: getCurrentLayoutArray(state),
    schematicNodeArray: getSchematicNodeArray(state),
    nodePairsMatchedToComps: getNodePairsMatchedToComps(state),
    //graphMatrix: getGraphMatrix(state),
    //wireGroupArray: getWireGroupArray(state),
    adjacencyList: getDirectedNodeAdjacencyListWithIds(state),
    // allCycles: findAllCycles(state),


  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // compMouseDownAction: dragStart,
    // compMouseMoveAction: dragMove,
    // compMouseUpAction: dragEnd,
    schematicClickAction: deselect},
    //handleMoveTooFast: dragMove
    dispatch);
  // return bindActionCreators({compMouseDown: dragStart}, dispatch);
  // return {};
}

export default connect(mapStateToProps,mapDispatchToProps)(Schematic);


// <PathInductor cx={120} cy={210} rot={90} />
// <PathCapacitor cx={240} cy={150} rot={45} />

// <Resistor cx={210} cy={90} rot={45} />

// onMouseMove={this.handleMouseMove}
