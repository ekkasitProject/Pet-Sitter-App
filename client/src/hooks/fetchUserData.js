import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";

const fetchUserData = () => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [petOwnerProfile, setPetOwnerProfile] = useState(null);
  const [allpets, setAllpets] = useState([]);
  const [petDetail, setPetDetail] = useState(null);

  const { petOwnerID } = useAuth();

  const getPetOwnerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/petOwnerUser/${petOwnerID}`,
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

      setIsError(false);
      setIsLoading(true);
      await axios.put(
        `http://localhost:4000/petOwnerUser/${petOwnerID}`,
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
      setIsError(true);
      setIsLoading(false);
    }
  };

  const createPet = async (data) => {
    try {
      const token = localStorage.getItem("token");

      setIsError(false);
      setIsLoading(true);
      await axios.post(
        `http://localhost:4000/petOwnerUser/petdetail/${petOwnerID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
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
      // setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/petOwnerUser/petdetail/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(result);
      setAllpets(result.data.owner.pets);
      //setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  /*
  const getPetSitterById = async (petSitterId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/petsitteruser/petsisterdetail/${petSitterId}`
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
      await axios.post(`http://localhost:4000/petsitterProfile`, data);
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
      await axios.delete(`http://localhost:4000/petsitterProfile/${petSitterId}`);
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
      await axios.put(`http://localhost:4000/posts/${postId}`, data);
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
    allpets,
    setAllpets,
    petDetail,
    setPetDetail,
    isError,
    isLoading,
  };
};

export default fetchUserData;
