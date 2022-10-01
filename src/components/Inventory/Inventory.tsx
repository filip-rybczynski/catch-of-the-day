// React
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// Firebase
import firebase from "firebase";
import base, { firebaseApp } from "../../base";

// Components
import {AddFishForm, EditFishForm} from "./components";
import Login from "../Login";

// Types
import { InventoryProps } from "./Inventory.interface";
import { LoginData } from "./types";

export const Inventory = ({
  fishMenu,
  addFish,
  loadSampleFishes,
  onEditFormChange,
  deleteFish,
  storeId
}: InventoryProps) => {

  const [loginData, setLoginData] = useState<LoginData>({
    uid: null,
    owner: null,
  })

  // Automatically log in if logged in before
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if(user !== null) authHandler({ user })
    })
  }, [])

  const authHandler = async (authData: {user: firebase.User}): Promise<void> => {
    // 1. Look up the current store if the database
    // const store = await base.fetch(storeId, { context: this });
    // // 2. Claim it if there's no owner
    // if (!store.owner) {
    //   await base.post(`${storeId}/owner`, {
    //     data: authData.user.uid,
    //   });
    // }
    // // 3. Set the state of the inventory component to reflect the current user
    // setLoginData({
    //   uid: authData.user.uid,
    //   owner: store.owner || authData.user.uid,
    // });
  };

  const authenticate = (provider: string) => {
  //   const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  //   firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  // };

  // const logOut = async (): Promise<void> => {
  //   // console.log('logOut')
  //   await firebase.auth().signOut();
  //   setLoginData({
  //     ...loginData,
  //     uid: null,
  //   })
  }

// Render started here

    const logOutButton = <button onClick={/**logOut**/()=>{}}>Log out!</button>;
    // 1. Check if they are logged in
    if (!loginData.uid) {
      return <Login authenticate={authenticate} />;
    }

    // 2. Check if they are the owner of the store
    if (loginData.uid !== loginData.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logOutButton}
        </div>
      );
    }

    // 3. Then they must be the owner - just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {/* {logOut} */}
        {/* {Object.keys(fishMenu).map((key) => (
          <EditFishForm
            key={key}
            fishId={key}
            fish={fishMenu[key]}
            onEditFormChange={onEditFormChange}
            deleteFish={deleteFish}
          />
        ))} */}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }


Inventory.propTypes = {
  fishMenu: PropTypes.object.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  onEditFormChange: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};
