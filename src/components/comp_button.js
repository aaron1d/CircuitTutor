import React, { Component } from 'react';

export default class CompButton extends Component {
  constructor(props) {
    super(props);
  }

  handleButtonClick (e) {
    //e.preventDefault;
    //if (this.props.mode=='MODE_ADDING_WIRE') {this.props.addWireEndClick();}
    this.props.deselectFirst(this.props.selectedId);
    this.props.addButtonClick(this.props.compType,this.props.nextLocation,this.props.nextIndex );
  }

  render () {
      return (
        <button type="button"
          className="btn btn-outline-secondary "
          onClick = { (e) => this.handleButtonClick(e) }
          >

          {this.props.symbol}

          </button>

      );
  }
}
