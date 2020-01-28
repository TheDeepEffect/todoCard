import React from 'react';
import TaskCard from './component/TaskCard';

const task = {
  id: Date.now (),
  task: '',
  isCompleted: true,
  time: '',
};

const card = {
  cardId: Date.now (),
  cardTitle: '',
  cardTime: '',
  tasks: [task],
};

class ToDo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      cards: [card],
    };
  }

  componentDidMount () {
    this.setState (state =>
      state.cards.map (
        card => (card.id = Date.now ()),
        card.tasks.map (task => (task.id = Date.now ()))
      )
    );
  }

  /**
   *
   * Function to change the value of Card title
   *
   * @param value : Value for text input to show.
   * @param id  :   id of a card that is being accessed.
   */
  handleInputChangeCard = (value, id) => {
    this.setState (state =>
      state.cards.map (
        card =>
          card.cardId === id &&
          (card.cardTitle = value) &&
          (card.cardTime = `${new Date ().toDateString ()}  ${new Date ().toLocaleTimeString ()}`)
      )
    );
  };

  /**
   * Funciton to handle change in inputs of Task component.
   * Checkboxes 
   *
   * @param {string} value
   * @param {number} id
   * @param {string} name
   */
  handleInputChangeTask = (value, id, name) => {
    console.log (name, 'namee');

    name === 'checkbox'
      ? this.setState (state =>
          state.cards.map (card =>
            card.tasks.map (
              task => task.id === id && (task.isCompleted = !task.isCompleted)
            )
          )
        )
      : this.setState (state =>
          state.cards.map (card =>
            card.tasks.map (
              task =>
                task.id === id &&
                (task.task = value) &&
                (task.time = `${new Date ().toDateString ()}  ${new Date ().toLocaleTimeString ()}`)
            )
          )
        );
  };

  /**
   * Function to handle change of any input.
   *
   * @param {} e
   * @param {number} id id of 
   */
  handleInputChange = (e, id) => {
    const text = e.target.value;
    const name = e.target.name;
    // console.log ('abc', name);
    name === 'cardTitle'
      ? this.handleInputChangeCard (text, id)
      : this.handleInputChangeTask (text, id, name);
  };

  /**
   * Funciton to handle onFocus in inputs of Task component.
   * Task will be added if there are no new tasks and current is in focus.
   *
   * @param {} value
   * @param {} id
   * @param {} name
   */
  handleInputFocusTask = (tid, cid) => {
    console.log (cid, 'cid');

    const tasks = this.state.cards.map (card => card.id === cid);
    console.log (tasks, 'tasksk');
    if (true) {
      this.setState (state =>
        state.cards.map (
          card =>
            card.id === cid &&
            card.tasks.splice (card.tasks.length, 0, {
              id: Date.now (),
              task: '',
              isCompleted: false,
              time: '',
            })
        )
      );
    }

    console.log ('Task Added');
  };

  /**
   *
   * Funciton to handle onFocus of Card title
   * Card will be added id there are no more cards and current card is in use.
   *
   * @param value : Value for text input to show.
   * @param id  :   id of a card that is being accessed.
   */
  handleInputFocusCard = cid => {
    console.log (
      this.state.cards.findIndex (card => card.cardId === cid),
      'abcde',
      cid
    );

    if (
      this.state.cards.findIndex (card => card.cardId === cid) ===
      this.state.cards.length - 1
    ) {
      console.log ('cardss');

      this.setState (state =>
        state.cards.splice (state.cards.length, 0, {
          cardId: Date.now (),
          cardTitle: '',
          cardTime: '',
          tasks: [task],
        })
      );
    }
  };

  /**
   * Funciton to handle onFocus of any input.
   *
   *
   * @param {Synthetic event} e
   * @param {id of a component that is being focused} id
   */
  handleInputFocus = (e, cid, tid = 1) => {
    const name = e.target.name;
    console.log ('focus', cid);
    name === 'cardTitle'
      ? this.handleInputFocusCard (cid)
      : this.handleInputFocusTask (tid, cid);
  };

  render () {
    const renderCard = this.state.cards.map (card => (
      <li key={card.cardId}>
        <TaskCard
          onInputChange={this.handleInputChange}
          onInputFocus={this.handleInputFocus}
          cardProps={card}
        />
      </li>
    ));
    return <ul>{renderCard}</ul>;
  }
}
export default ToDo;