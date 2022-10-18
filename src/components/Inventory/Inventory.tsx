// React
import React, { PropsWithChildren, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Firebase
import firebase, { appDB, appAuth, AUTH_PROVIDERS } from "../../firebase";

// Components
import { AddFishForm, LoadingAnimation, Login } from "./components";

// Types
import { InventoryProps } from "./Inventory.interface";
import { AvailableProviders } from "./types";

export const Inventory = ({
  addFish,
  loadSampleFishes,
  storeId,
  children,
}: PropsWithChildren<InventoryProps>) => {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const databaseOwnerRef = appDB.ref(`${storeId}/owner`);

  // Initial loading actions:
  useEffect(() => {
    // callback function of useEffect can't be async directly - useEffect expects the callback to return either a cleaning function or undefined, not a Promise
    (async () => {
      try {
        // 1. Get store owner id
        const fetchedOwnerId: string | null = (await databaseOwnerRef.get()).val(); // Can be null if store doesn't have an owner yet (new store)

        //2. Get current user
        const currentUser = appAuth.currentUser; // can be null if no user logged in in this session

       // 3. If we have an owner and we have a currentUser and they are the same, log user in
       if (currentUser?.uid === fetchedOwnerId) {
         authHandler(currentUser.uid);
         return
       }

        // 4. In different cases, only update local state to reflect store owner
        setOwnerId(fetchedOwnerId);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Authenticating user
  // * Checking updated owner is not strictly necessary for everything to work, so the function is not essential (could just be state updates).
  // * But it's worth keeping at least as a placeholder for any more sophisticated authentication handling in the future
  const authHandler = async (userId: string): Promise<void> => {
    try {
      // 1. Check who the current owner is (make sure nothing has changed)
      const ownerId: string = (await databaseOwnerRef.get()).val();

      // 2. Update state
      setOwnerId(ownerId);
      setCurrentUserId(userId);
      setIsLoading(false);
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
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  // Authentication function - use authentication of selected providers
  const authenticate = (provider: AvailableProviders, claim = false) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    appAuth
      .signInWithPopup(authProvider)
      .then((resp) => {
        setIsLoading(true);

        const uid = (resp as { user: firebase.User }).user.uid;
        // Check if we want to claim store or attempt to login
        if (claim) claimHandler(uid);
        else authHandler(uid);
      });
  };

  // Log out function
  const logOut = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await appAuth.signOut();
      setCurrentUserId(null);
      setIsLoading(false);
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
    return (
      <Login
        authFunction={authenticate}
        claim={ownerId === null}
        providers={AUTH_PROVIDERS}
      />
    );
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
        {/* UI for managing the inventory (e.g. editing existing fish) */}
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
  storeId: PropTypes.string.isRequired,
};
