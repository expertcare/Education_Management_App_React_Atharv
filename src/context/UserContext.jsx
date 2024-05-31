import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Update user data and store it in local storage
  const updateUser = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userData) {
          return; // Exit early if userData is null
        }

        const token = userData.token;
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(token);

        // Store response data in local storage
        localStorage.setItem("userData", JSON.stringify(response.data));

        // Store response data in fetchedData state
        setFetchedData(response.data);

        console.log("User Data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData]); // Fetch data whenever userData changes

  return (
    <UserContext.Provider value={{ userData, updateUser, fetchedData }}>
      {children}
    </UserContext.Provider>
  );
};
