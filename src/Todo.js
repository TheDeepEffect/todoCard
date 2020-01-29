import React from 'react';
import TaskCard from './component/TaskCard';
import card from './class/card';
import task from './class/task';

class ToDo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      cards: [new card ()],
    };
  }

  /**
   *
   * Function to change the value of Card title
   *
   * @param {String} value : Value for text input to show.
   * @param  {Number} id  :   id of a card that is being accessed.
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
   * @param {String} value
   * @param {Number} id
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


    const task1 = this.state.cards.map (
      card =>
        card.cardId === cid && card.tasks.filter(task=>task.id===tid));
 
    
    
    
    const card1 = this.state.cards.map (
      card => card.cardId === cid && card.tasks.length
    );
    console.log (task1, 'task111sk', card1);
    if (this.state.cards.findIndex(card=>card.cardId===cid && 
      card.tasks.map(task=>task===task1[0][0]) 
      ) === this.state.cards.findIndex(card=>card.cardId===cid && 
        card.tasks.length)
      ) {
      this.setState (state =>
        state.cards.map (
          card =>
            card.cardId === cid &&
            card.tasks.splice (card.tasks.length, 0, new task ())
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
    // console.log ("true",
    //   this.state.cards.findIndex (card => card.cardId === cid)

    // );

    if (
      this.state.cards.findIndex (card => card.cardId === cid) ===
      this.state.cards.length - 1
    ) {
      // console.log ('cardss');

      this.setState (state =>
        state.cards.splice (state.cards.length, 0, new card ())
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
  /**
   * Delete cards if empty and multiple cards are there.
   * and sort cards
   * 
   * @param {Number} cid : cardId of a card
   * @param {String} text : Text in the input field
   */
  handleInputBlurCard=(cid,text)=>{
    if(text.length<=1 && this.state.cards.length>1){
      this.setState(
        state=>
        state.cards.length >1 &&
        state.cards.splice(state.cards.findIndex(card=>card.cardId===cid),1)
      );
    }
    this.setState(state=>state.cards.sort((a,b)=>
      new Date(b.cardTime) - new Date(a.cardTime)))
  };

   /**
   * Delete tasks in a card if empty and multiple tasks are there.
   * 
   * @param {Number} tid : id of a task
   * @param {Number} cid : cardId of a card
   * @param {String} text : Text in the input field
   */
  handleInputBlurTask=(tid,cid,text)=>{

    const cardArray=this.state.cards.filter(card=>card.cardId===cid);
    console.log(cardArray,"cardArray");
    const tasksArray=cardArray.filter(card=>card.tasks);
    console.log(tasksArray[0],"taskArray");

    if(text.length <=1 && tasksArray[0].tasks.length>1){
      this.setState(state=>
        state.cards.filter(card=>card.cardId===cid &&
          card.tasks.splice(card.tasks.findIndex(task=>task.id===tid),1)
          ));
    }
    this.setState(state=>state.cards.map(card=>card.cardId===cid &&
      card.tasks.sort((a,b)=>new Date(b.time)-new Date(a.time))))
    
    
  };


  /**
   * Function to handle input onBlur to delete an empty element.
   * 
   * @param {Event} e
   * @param {Number} cid
   * @param {Number} tid
   */
  handleInputBlur = (e, cid, tid = 1) => {
    const value=e.target.value;
    const name = e.target.name;
    name === 'cardTitle'
      ? this.handleInputBlurCard (cid,value)
      : this.handleInputBlurTask (tid, cid,value);
  };

  render () {
    const renderCard = this.state.cards.map (card => (
      <li key={card.cardId}>
        <TaskCard
          onInputChange={this.handleInputChange}
          onInputFocus={this.handleInputFocus}
          onInputBlur={this.handleInputBlur}
          cardProps={card}
        />
      </li>
    ));
    return <ul>{renderCard}</ul>;
  }
}
export default ToDo;
