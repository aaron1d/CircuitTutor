import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import CompButton from '../components/comp_button';
import {getAvailableCenterLocations,getSelectedCompId} from '../selectors/index';
import {addComp,deselect} from '../actions/index';

const symbolList = ['V','I','R','L','C','E','F','G','H','S','U','W'];
//const compTypes = ['VSOURCE','ISOURCE','RESISTOR','INDUCTOR','CAPACITOR'];
const compTypes = symbolList;

class CompButtonBar extends Component {
  constructor(props) {
    super(props);

  }

  // handleBarClick() {
  //   this.props.buttonBarClick(this.props.selectedId);
  // }


  render () {
      let nextLoc = this.props.availableLocations[0];
      let {currentIndexes} = this.props;
      return (
        <div className="btn-toolbar">
          <div className="btn-group mb-2">
            {symbolList.map( (symbolItem, i) => {
              return <CompButton
                symbol={symbolItem}
                key={symbolItem}
                mode={this.props.mode}
                nextLocation={nextLoc}
                compType={compTypes[i]}
                deselectFirst={this.props.buttonBarClick}
                addButtonClick={this.props.addButtonClick}
                selectedId = {this.props.selectedId}
                nextIndex = {currentIndexes[compTypes[i]]+1}
                />;
            })}

          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    availableLocations: getAvailableCenterLocations(state),
    selectedId: getSelectedCompId(state),
    currentIndexes: state.currentIndexes,
    //mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addButtonClick: addComp,
    buttonBarClick: deselect,
    },
    dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(CompButtonBar)
