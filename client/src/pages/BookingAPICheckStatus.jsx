import React, { useEffect } from "react";
import axios from "axios";

function useInterval(callback, delay) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

function CallApiComponent() {
  const sitterId = "123";
  const cancelApiUrl = `https://example.com/booking/petsitter/${sitterId}/cancel`;
  const endServiceApiUrl = `https://example.com/booking/petsitter/${sitterId}/end-service`;

  const callCancelApi = () => {
    axios
      .put(cancelApiUrl)
      .then((response) => {
        console.log("Cancel API response:", response.data);
      })
      .catch((error) => {
        console.error("Error calling Cancel API:", error);
      });
  };

  const callEndServiceApi = () => {
    axios
      .put(endServiceApiUrl)
      .then((response) => {
        console.log("End Service API response:", response.data);
      })
      .catch((error) => {
        console.error("Error calling End Service API:", error);
      });
  };

  // Call the APIs initially
  useEffect(() => {
    callCancelApi();
    callEndServiceApi();
  }, []);

  // Schedule the API calls every 1 hour
  useInterval(() => {
    callCancelApi();
    callEndServiceApi();
  }, 6000); // 1 hour in milliseconds

  return <div>Calling APIs every 30 min.</div>;
}

export default CallApiComponent;
