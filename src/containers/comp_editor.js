import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {deselect, rotate,toggleNodeLabelVisibility,updateCompValue} from '../actions/index'
import {getSelectedCompId,getSelectedComp} from '../selectors/index';

class CompEditor extends Component {
  constructor(props) {
    super(props);

    this.handleRotClick=this.handleRotClick.bind(this);
    this.handleNodeToggleClick=this.handleNodeToggleClick.bind(this);
    this.handleCompValueEntered=this.handleCompValueEntered.bind(this);

    this.state = {
                  value: '',
                  multiplier: 1, gain: null,
                  voltage: null, current: null, power: null,
                };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedCompId.length != 0) {
      let values=nextProps.selectedComp.values;
      this.setState({...values});
    }
  }


  handleRotClick () {
    //console.log(this.props.rotate,'LOOK FOR THIS',this.props.selectedCompId);
    //if(this.props.selectedComp.compType != 'W') {
    if(this.props.selectedCompId.length != 0) {
      this.props.rotate(this.props.selectedCompId);
    }
    //}
  }
  handleNodeToggleClick () {
    this.props.toggleNodeLabelVisibility();
  }

  onValueInputChange(newVal) {
    this.setState({value: newVal,});
  }

  renderCompOptions() {

  }

  handleCompValueEntered () {
    this.props.updateCompValue(this.props.selectedCompId,this.state);
  }


  render () {
      console.log('editor render');
      return(
        <div className='editor'>
          <div className='btn-toolbar'>
            <div className="btn-group mb-1">
              <button className='btn btn-default' onClick={this.handleNodeToggleClick}> N </button>
              <button className='btn btn-default' onClick={this.handleRotClick}> Rot </button>
            </div>
          </div>

          <div> </div>

          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2">value</span>
            <input type="text" className="form-control" placeholder="enter component value"
            value={this.state.value}
            onChange={e => this.onValueInputChange(e.target.value)}
            />

            {this.renderCompOptions}

            <button className='btn btn-primary' onClick={this.handleCompValueEntered} > Save </button>
          </div>


        </div>

      );
  }
}

const mapStateToProps = (state) => {
  return {
    compsById: state.compsById,
    //allIds: state.allIds,
    //movingcomp: state.movingComp,
    selectedCompId: getSelectedCompId(state),
    selectedComp: getSelectedComp(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    rotate: rotate,
    toggleNodeLabelVisibility: toggleNodeLabelVisibility,
    updateCompValue: updateCompValue,
  },

    dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CompEditor);
