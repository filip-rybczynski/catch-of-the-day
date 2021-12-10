import React from "react";

class AddFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <input name="name" type="text" placeholder="Name"></input>
        <input name="price" type="text" placeholder="Price"></input>
        <input name="status" type="text" placeholder="Status"></input>
        <input name="desc" type="text" placeholder="Desc"></input>
        <input name="image" type="text" placeholder="Image"></input>
      </form>
    );
  }
}

export default AddFishForm;
