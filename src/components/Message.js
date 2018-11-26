import React from 'react';

export default function Message({ message }) {
  //new default. {message} used to be props
  // convert props.message.read to message.read
  return (
    <div className={`row message ${message.read ? 'read' : 'unread'}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={message.selected} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="label label-warning">dev</span>
        <span className="label label-warning">gschool</span>
        <a href="#">whee</a>
      </div>
    </div>
  );
}
