import React, { Component } from 'react';

class ToolBar extends Component {
  render() {
    let unRead = this.props.messages.filter(message => !message.read).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ unRead }</span>
            unread messages
          </p>

          <button className="btn btn-default">
            <i
              onClick={() => this.props.toggleSelectAll()}
              className={`fa fa${this.props.selectBoxState()}-square-o`}
            />
          </button>

          <button
            onClick={() => this.props.markAsRead()}
            className="btn btn-default"
            disabled={`${this.props.disabledReadButton()}`}
          >
            Mark As Read
          </button>

          <button
            onClick={() => this.props.markAsUnRead()}
            className="btn btn-default"
            disabled={`${this.props.disabledUnReadButton()}`}
          >
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    );
  }
}

export default ToolBar;
