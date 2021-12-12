import React from "react";

class AddFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

// TODO remove refs and use controlled components
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (e) => {
    e.preventDefault();

    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      available: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value === "available" ? true : false,
    };

    this.props.addFish(fish);

    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.props.addFish}>
        <input name="name" type="text" placeholder="Name" />
        <input name="price" type="number" placeholder="Price" />
        <select name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="Description" />
        <input name="image" type="text" placeholder="Image" />
        <button type="submit">+ Add Fish </button>
      </form>
    );
  }
}

export default AddFishForm;
