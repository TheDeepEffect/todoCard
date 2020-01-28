import React from 'react';
import Task from './Task';

/**
 * Functional copmonent Card to render each card on todo app.
 *
 * @param {properties of card component from a parent class todo} props
 */
const TaskCard = props => {
  const renderTask = props.cardProps.tasks.map (task => (
    <li key={task.id}>
      <Task
        onInputChange={props.onInputChange}
        onInputFocus={props.onInputFocus}
        taskProp={task}
        cardId={props.cardProps.cardId}
      />
    </li>
  ));
  return (
    <div className="taskCard">
      <div className="ui card">
        <div className="content">
          <div className="header">
            <h2>
              <div className="ui input transparent">
                <input
                  type="text"
                  placeholder="Title"
                  name="cardTitle"
                  onChange={e =>
                    props.onInputChange (e, props.cardProps.cardId)}
                  value={props.cardProps.cardTitle}
                  onFocus={e => props.onInputFocus (e, props.cardProps.cardId)}
                />
              </div>
            </h2>
            <div className="meta"> {props.cardProps.cardTime} </div>
          </div>
        </div>
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
};
export default TaskCard;
