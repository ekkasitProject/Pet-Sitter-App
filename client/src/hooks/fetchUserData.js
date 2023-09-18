import { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";
import { ToggleContext } from "../pages/AuthenticatedApp";

const fetchUserData = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [petOwnerProfile, setPetOwnerProfile] = useState(null);
  //const [allpets, setAllpets] = useState([]);
  const [petDetail, setPetDetail] = useState({});
  const {
    petID,
    setPetID,
    isAllPetChange,
    setIsAllPetChange,
    allpets,
    setAllpets,
    petOwnerID,
    setPetOwnerID,
    bookingID,
    setBookingID,
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
      // alert(response.data.message);
      navigate(`/user/yourpet/${petOwnerID}`);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      //alert(error.message);
    }
  };

  const getAllPets = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      // setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/petOwnerUser/petdetail/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(result);
      setAllpets(result.data.owner.pets);
      //console.log(allpets);
      //setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const getPetByID = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      // setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/petowneruser/petdetail/${petOwnerID}/pet/${petID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setPetDetail(result.data.pet);
      //setIsLoading(false);
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

  /*
  const getPetSitterById = async (petSitterId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/petsitteruser/petsisterdetail/${petSitterId}`
      );

      setPetSitter(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error fetching petSitter:", error);
    }
  };
  /*
  const createPetsitter = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:6543/petsitterProfile`, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
*/

  /*
  const deletePetsitter = async (petSitterId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(`http://localhost:6543/petsitterProfile/${petSitterId}`);
      const newPetSitterLists = petSitterLists.filter((petSitter) => {
        return petSitter.petsitter_id !== petSitterId;
      });
      setPetSitterLists(newPetSitterLists);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updatePostById = async (postId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:6543/posts/${postId}`, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
*/
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
  };
};

export default fetchUserData;
