import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    addFish: PropTypes.func,
  }

// TODO remove refs and use controlled components
  nameRef = React.createRef();
  priceRef = React.createRef();
  isAvailableRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (e) => {
    e.preventDefault();

    const fish = {
      
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      isAvailable: this.isAvailableRef.current.value === "available" ? true : false,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    this.props.addFish(fish);

    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" type="text" placeholder="Name" ref={this.nameRef} required/>
        <input name="price" type="number" placeholder="Price" ref={this.priceRef} required/>
        <select name="isAvailable" ref={this.isAvailableRef} required>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="Description" ref={this.descRef} required/>
        <input name="image" type="text" placeholder="Image" ref={this.imageRef} required/>
        <button type="submit">+ Add Fish </button>
      </form>
    );
  }
}

export default AddFishForm;
