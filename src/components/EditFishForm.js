import React from 'react';

class EditFishForm extends React.Component {
constructor(props) {
super(props);
this.state = {};
}

render() {
    const {fish, onEditFormChange, fishId} = this.props;
return (
<div className="fish-edit">
    <input type="text" name="name" value={fish.name}  onChange={e => onEditFormChange(fishId, e)}/>
    <input type="number" name="price" value={fish.price}  onChange={e => onEditFormChange(fishId, e)}/>
    <select type="text" name="isAvailable" value={fish.isAvailable} onChange={e => onEditFormChange(fishId, e)}>
            <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
          </ select>
    <textarea type="text" name="desc" value={fish.desc}  onChange={e => onEditFormChange(fishId, e)}/>
    <input type="text" name="image" value={fish.image}  onChange={e => onEditFormChange(fishId, e)}/>
</div>
)
}
}

export default EditFishForm;