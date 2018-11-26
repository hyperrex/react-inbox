import React, { Component } from 'react';

class ToolBar extends Component {
  render() {
    let unRead = this.props.messages.filter(message => !message.read).length;

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unRead}</span>
            unread messages
          </p>

{/* TOGGLE SELECT ALL */}
          <button className="btn btn-default">
            <i
              onClick={() => this.props.toggleSelectAll()}
              className={`fa fa${this.props.selectBoxState()}-square-o`}
            />
          </button>

{/* MARK AS READ */}
          <button
            onClick={() => this.props.markAsRead()}
            className="btn btn-default"
            disabled={`${this.props.disabledReadButton()}`}
          >
            Mark As Read
          </button>

{/* MARK AS UNREAD */}
          <button
            onClick={() => this.props.markAsUnRead()}
            className="btn btn-default"
            disabled={`${this.props.disabledUnReadButton()}`}
          >
            Mark As Unread
          </button>

{/* APPLY LABEL */}
          <select
            className="form-control label-select"
            disabled={`${this.props.disabledApplyLabelMenu()}`}
            onChange={() =>
              this.props.applyLabel(
                document.querySelectorAll('select')[0].value
              )
            }
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

{/* REMOVE LABEL */}
          <select
            className="form-control label-select"
            disabled={`${this.props.disabledRemoveLabelMenu()}`}
            onChange={() =>
              this.props.removeLabel(
                document.querySelectorAll('select')[1].value
              )
            }
          >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

{/* DELETE MESSAGE */}
          <button
            className="btn btn-default"
            disabled={`${this.props.disabledDeleteButton()}`}
          >
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    );
  }
}

export default ToolBar;
