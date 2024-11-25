import React, { createContext, useState, useEffect } from "react";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  // Load requests from localStorage when the component mounts
  useEffect(() => {
    const savedRequests = localStorage.getItem("requests");
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save requests to localStorage whenever the requests state changes
  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem("requests", JSON.stringify(requests));
    }
  }, [requests]);

  // Function to add a new request
  const addRequest = (newRequest) => {
    setRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  // Function to update an existing request
  const updateRequest = (updatedRequest) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
  };

  // Function to delete a request by id
  const deleteRequest = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, updateRequest, deleteRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
