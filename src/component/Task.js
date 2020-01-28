import React from 'react';

/**
 *
 * Functional component Task to render individual task.
 *
 * @param {properties of Task from parent component TaskCard} props
 */
const Task = props => {
  return (
    <div className="content">
      <div className="ui transparent input">
        <input
          type="checkbox"
          name="checkbox"
          checked={props.taskProp.isCompleted}
          onChange={e => props.onInputChange (e, props.taskProp.id)}
        />
        <input
          type="text"
          placeholder="Task here..."
          name="task"
          value={props.task}
          onChange={e => props.onInputChange (e, props.taskProp.id)}
          onFocus={e => props.onInputFocus (e, props.cardId, props.taskProp.id)}
        />
      </div>
      <div className="meta"> {props.taskProp.time} </div>
    </div>
  );
};
export default Task;
