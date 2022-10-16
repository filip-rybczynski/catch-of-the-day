// React
import React, { PropsWithChildren, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Firebase
import firebase from "firebase";
import { appDB, firebaseApp } from "../../base";

// Components
import { AddFishForm, LoadingAnimation } from "./components";
import Login from "../Login";

// Types
import { InventoryProps } from "./Inventory.interface";
import { AvailableProviders } from "./types";

export const Inventory = ({
  addFish,
  loadSampleFishes,
  storeId,
  children
}: PropsWithChildren<InventoryProps>) => {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const databaseOwnerRef = appDB.ref(`${storeId}/owner`);

  // Loading actions:
  // 1. Check if store already has an owner
  // 2. Set owner of store (null or ownerId value)
  // 3. Set up automatic currentUserId update on auth state change IF store already has an owner
  // 4. Set isLoading to false (stop loading animation)
  useEffect(() => {
    // callback function of useEffect can't be async directly - useEffect expects the callback to return either a cleaning function or undefined, not a Promise
    (async () => {
      try {
        // 1.
        const fetchedOwnerId = (await databaseOwnerRef.get()).val(); // Can be null if store doesn't have an owner yet (new store)

        // 2.
        setOwnerId(fetchedOwnerId);

        // 3. Set onAuthStateChanged listener (first time callback will execute is shortly after page load)
        firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
          const uid = user?.uid;
          if (fetchedOwnerId !== null) authHandler(uid as string); // this allows for automatic "log in" if previously signed in user is the owner

          //4.
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Authenticating user
  // * Checking updated owner is not strictly necessary for everything to work, so the function is not essential.
  // * But it's worth keeping at least as a placeholder for any more sophisticated authentication handling in the future
  const authHandler = async (userId: string): Promise<void> => {
    try {
      // 1. Check who the current owner is (make sure nothing has changed)
      const ownerId: string = (await databaseOwnerRef.get()).val();

      // 2. Update state
      setOwnerId(ownerId);
      setCurrentUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to claim store through login when it has no owner yet
  const claimHandler = async (userId: string): Promise<void> => {
    try {
      // 1. Set user as owner of store
      await databaseOwnerRef.set(userId);

      // 2. Update state
      setCurrentUserId(userId);
      setOwnerId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // Authentication function - use authentication of selected providers
  const authenticate = (provider: string, claim = false) => {
    const authProvider = new firebase.auth[
      `${provider}AuthProvider` as AvailableProviders
    ]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then((resp) => {
        const uid = (resp as { user: firebase.User }).user.uid;
        // Check if we want to claim store or attempt to login
        if (claim) claimHandler(uid);
        else authHandler(uid);
      });
  };

  // Log out function
  const logOut = async (): Promise<void> => {
    try {
      await firebase.auth().signOut();
      setCurrentUserId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Node preparation
  const logOutButton = <button onClick={logOut}>Log out!</button>;

  // 0. Loading if still loading
  if (isLoading) return <LoadingAnimation />;

  // 1. If no-one logged in
  if (!currentUserId) {
    return <Login authenticate={authenticate} claim={ownerId === null} />;
  }

  // 3. If someone logged in, but is not the owner
  if (currentUserId !== ownerId) {
    return (
      <div>
        <p>Sorry, you are not the owner!</p>
        {logOutButton}
      </div>
    );
  }

  // 4. Else - logged in user is the owner - show inventory
  // Of course this is not secure and is just a mock-authorization (state values can be edited by users using React plugins) 😋
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <>
        {logOutButton}
        {/* Interface for managing the inventory (e.g. editing existing fish) */}
        {children}
      </>
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
};