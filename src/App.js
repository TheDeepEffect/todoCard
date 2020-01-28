import React from "react";
import Todo from "./Todo";
import "./App.css";

/**
 * Contains the whole app.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}
export default App;
