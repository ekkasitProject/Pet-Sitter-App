import { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { ToggleContext } from "../pages/AuthenticatedApp";

const fetchUserData = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [petOwnerProfile, setPetOwnerProfile] = useState(null);
  //const [allpets, setAllpets] = useState([]);
  const [petDetail, setPetDetail] = useState({});
  const [bookingHistory, setBookingHistory] = useState([]);
  const [booking, setBooking] = useState({});
  const [petsitterProfile, setPetsitterProfile] = useState(null);

  const [bookingListById, setBookingListById] = useState({});

  const {
    petID,

    isAllPetChange,
    setIsAllPetChange,
    allpets,
    setAllpets,
    petOwnerID,

    bookingID,

    petSitterID,

    bookingList,
    setBookingList,
  } = useContext(ToggleContext);

  const getPetOwnerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/petOwnerUser/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setPetOwnerProfile(result.data.petOwnerUser);
      // console.log(result);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const updatePetOwnerProfile = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/petOwnerUser/${petOwnerID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAllPetChange(!isAllPetChange);
      setIsLoading(false);
      navigate(`/user/profile/${petOwnerID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const createPet = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsError(false);
      setIsLoading(true);
      await axios.post(
        `http://localhost:6543/petOwnerUser/petdetail/${petOwnerID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsAllPetChange(!isAllPetChange);
      setIsLoading(false);

      navigate(`/user/yourpet/${petOwnerID}`);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getAllPets = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);

      const result = await axios.get(
        `http://localhost:6543/petOwnerUser/petdetail/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllpets(result.data.owner.pets);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const getPetByID = async () => {
    try {
      console.log(petOwnerID);
      console.log(petID);
      const token = localStorage.getItem("token");
      setIsError(false);

      const result = await axios.get(
        `http://localhost:6543/petowneruser/petdetail/${petOwnerID}/pet/${petID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPetDetail(result.data.pet);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const updatePet = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/petowneruser/petdetail/${petOwnerID}/pet/${petID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAllPetChange(!isAllPetChange);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.delete(
        `http://localhost:6543/petowneruser/petdetail/${petOwnerID}/pet/${petID}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            petID,
          },
        }
      );
      console.log(petID);
      const newPetLists = allpets.filter((pet) => {
        return pet.pet_id !== petID;
      });
      console.log(allpets);
      console.log(newPetLists);
      setAllpets(newPetLists);
      setIsAllPetChange(!isAllPetChange);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/booking/petowner/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      setBookingHistory(result.data.bookings);
      console.log(result.data.bookings);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const getBookingByID = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/booking/petowner/${petOwnerID}/${bookingID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setBooking(result.data.booking);
      console.log(result.data.booking);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const submitBooking = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:6543/booking/${petOwnerID}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getPetsitterProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get(
        `http://localhost:6543/petSitterUser/${petSitterID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPetsitterProfile(result.data.petSitterUser);
    } catch (error) {
      // Handle authentication error here
      console.error("Authentication error:", error);
    }
  };

  const getBookingList = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get(
        `http://localhost:6543/booking/petsitter/${petSitterID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingList(result.data.bookings);
      console.log(result.data);
    } catch (error) {
      // Handle authentication error here
      console.error("Authentication error:", error);
    }
  };

  const updatePetSitterProfile = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/petSitterUser/${petSitterID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingListById = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get(
        `http://localhost:6543/booking/petowner/${params.petownerId}/${params.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingList(result.data.bookings);
    } catch (error) {
      // Handle authentication error here
      console.error("Authentication error:", error);
    }
  };

  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        bookingId: bookingID,
      };
      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/booking/petsitter/${petSitterID}/confirm`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      navigate(`/petsitter/bookinglist/${petSitterID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        bookingId: bookingID,
      };
      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/booking/petsitter/${petSitterID}/cancel`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      navigate(`/petsitter/bookinglist/${petSitterID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const inServiceBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        bookingId: bookingID,
      };
      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/booking/petsitter/${petSitterID}/in-service`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      navigate(`/petsitter/bookinglist/${petSitterID}`);
    } catch (error) {
      console.log(error);
    }
  };
  const successBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        bookingId: bookingID,
      };
      setIsLoading(true);
      await axios.put(
        `http://localhost:6543/booking/petsitter/${petSitterID}/end-service`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      navigate(`/petsitter/bookinglist/${petSitterID}`);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getPetOwnerProfile,
    petOwnerProfile,
    setPetOwnerProfile,
    updatePetOwnerProfile,
    createPet,
    getAllPets,
    getPetByID,
    petDetail,
    setPetDetail,
    updatePet,
    deletePet,
    isError,
    isLoading,
    getBooking,
    bookingHistory,
    setBookingHistory,
    booking,
    setBooking,
    getBookingByID,
    submitBooking,
    petsitterProfile,
    setPetsitterProfile,
    getPetsitterProfile,
    bookingList,
    setBookingList,
    getBookingList,
    updatePetSitterProfile,
    getBookingListById,
    bookingListById,
    setBookingListById,
    confirmBooking,
    rejectBooking,
    inServiceBooking,
    successBooking,
  };
};

export default fetchUserData;
