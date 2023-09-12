import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchData = () => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [profile, setProfile] = useState(null);
  const [allpets, setAllpets] = useState(null);
  const [petDetail, setPetDetail] = useState(null);

  const getProfile = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/petOwnerUser/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(result.data.petOwnerUser);
      console.log(profile);
    } catch (error) {
      console.error(error);
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
  const updatePetsitterById = async (petSitterId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(
        `http://localhost:4000/petsitterProfile/${petSitterId}`,
        data
      );
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

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
*/
  return {
    getProfile,
    profile,
    setProfile,
    allpets,
    setAllpets,
    petDetail,
    setPetDetail,
    isError,
    isLoading,
  };
};

export default fetchData;
