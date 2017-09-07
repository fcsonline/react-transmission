import React, { Component } from 'react';
import autobind from 'autobind-decorator';

class WantedButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.wanted,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.wanted});
  }

  @autobind onChange() {
    this.setState(
      (prevState) => ({checked: !prevState.checked}),
      () => this.props.setWanted({
        fileIds: this.props.fileIds,
        wanted: this.state.checked ? 'wanted' : 'unwanted',
      })
    );
  }

  render() {
    return (
      <input
        type='checkbox'
        onChange={this.onChange}
        checked={this.state.checked}
      />
    );
  }
}

export default WantedButton;
