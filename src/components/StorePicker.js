import React from "react";
import { getFunName } from "./../helpers";

class StorePicker extends React.Component {
  constructor() {
    super();
    // using refs instead of state for practice purposes
    this.inputRef = React.createRef();
  }

  goToStore = (e) => {
    e.preventDefault();

    const selectedStoreName = this.inputRef.current.value;

    this.props.history.push(`/store/${selectedStoreName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h1 className="store-selector__header">Select A Store</h1>
        <input
          type="text"
          ref={this.inputRef}
          defaultValue={getFunName()}
          required
        ></input>
        <button type="submit">Let's go ➡</button>
      </form>
    );
  }
}

export default StorePicker;
