import React, { useRef } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      owner: null,
    };
  }

  static propTypes = {
    fishMenu: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    onEditFormChange: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
  };

  // Automatically log in if logged in before
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) this.authHandler({ user })
    })
  }

  authHandler = async (authData) => {
    // 1. Look up the current store if the database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim it if there's no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logOut = async () => {
    console.log('logOut')
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    })
  }

  render() {
    const {
      fishMenu,
      addFish,
      loadSampleFishes,
      onEditFormChange,
      deleteFish,
    } = this.props;

    const logOut = <button onClick={this.logOut}>Log out!</button>;
    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logOut}
        </div>
      );
    }

    // 3. Then they must be the owner - just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logOut}
        {Object.keys(fishMenu).map((key) => (
          <EditFishForm
            key={key}
            fishId={key}
            fish={fishMenu[key]}
            onEditFormChange={onEditFormChange}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
