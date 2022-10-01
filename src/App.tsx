// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Components
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import sampleFishes from "./sample-fishes";
import Fish from "./components/Fish";

// Types
import { AppProps } from "./App.interface";
import { FishData, FishMenu, FishOrder } from "./types";
import { FishFormChangeEvent } from "./types";

// Functions & other
import { appDB } from "./base";
import { getUpdatedFishDetails } from "./utils";

export const App = ({ match: { params } }: AppProps) => {
  const [fishMenu, setFishMenu] = useState<FishMenu>(); // should start as "undefined"
  const [order, setOrder] = useState<FishOrder>({});

  const databaseRef = appDB.ref(`${params.storeId}/fishMenu`);

  // Notes:
  // https://www.bezkoder.com/react-firebase-hooks-crud/
  // https://firebase.google.com/docs/database/web/read-and-write?hl=en#web-version-9_1

  // Add listener to Firebase database to listen for updates realtime
  useEffect(() => {
    databaseRef.once("value", (snapshot) => {
      if (snapshot.val()) setFishMenu(snapshot.val());
      else setFishMenu({}); // For when DB is new/all data is removed (snapshot.val() is null then)
    });
    // .once() only listens for one event and then removes it automatically
    // so no cleanup function for the listener required
  }, []);

  // Load user's order from localStorage
  useEffect(() => {
    const localStorageRef = localStorage.getItem(`${params.storeId}-order`);
    if (localStorageRef) setOrder(JSON.parse(localStorageRef));
  }, []);

  // Update database
  useEffect(() => {
    // don't run with initial, undefined value to avoid wiping the Firebase DB clean
    // (The DB listener is async, so will actually run after this)
    if (fishMenu !== undefined) databaseRef.set(fishMenu);
  }, [fishMenu]);

  // Update localStorage
  useEffect(() => {
    // update localStorage after changing the order
    localStorage.setItem(`${params.storeId}-order`, JSON.stringify(order));
  }, [order]);

  const loadSampleFishes = (): void => {
    setFishMenu(sampleFishes);
  };

  const addFish = (fish: FishData) => {
    const newFishMenu = { ...fishMenu };

    newFishMenu[`fish${Date.now()}`] = fish;

    setFishMenu(newFishMenu);
  };

  const addToOrder = (key: string) => {
    const newOrder = { ...order };
    if (newOrder[key] === undefined) newOrder[key] = 1;
    else newOrder[key] += 1;

    setOrder(newOrder);
  };

  const onEditFormChange = (fishId: string, e: FishFormChangeEvent) => {
    e.preventDefault();

    // update fish details for fish with fishId
    const newFishMenu = {
      ...fishMenu,
      [fishId]: getUpdatedFishDetails(
        e.currentTarget,
        (fishMenu as FishMenu)[fishId] as FishData
      ),
    };

    setFishMenu(newFishMenu);
  };

  const deleteFish = (key: number) => {
    const newFishMenu = { ...fishMenu };
    delete newFishMenu[key];
    setFishMenu(newFishMenu);
  };

  const deleteOrderFish = (key: number) => {
    const newOrder = { ...order };
    delete newOrder[key];
    setOrder(newOrder);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {fishMenu &&
            Object.keys(fishMenu).map((key) => (
              <Fish
                key={key}
                details={fishMenu[key]}
                index={key}
                addToOrder={addToOrder}
              />
            ))}
        </ul>
      </div>
      <Order
        fishMenu={fishMenu || {}} // to account for "undefined" value
        order={order}
        deleteOrderFish={deleteOrderFish}
      />
      <Inventory
        addFish={addFish}
        loadSampleFishes={loadSampleFishes}
        fishMenu={fishMenu || {}} // to account for "undefined" value
        onEditFormChange={onEditFormChange}
        deleteFish={deleteFish}
        storeId={params.storeId}
      />
    </div>
  );
};

App.propTypes = {
  match: PropTypes.object,
};
