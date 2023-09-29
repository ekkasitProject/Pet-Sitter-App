import { useState } from "react";
import axios from "axios";

const useFilter = () => {
  const [petSitterLists, setPetSitterLists] = useState([]);
  const [petSitter, setPetSitter] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPetSitterLists = async (input) => {
    const { petType, keywords, experience, page } = input;
    try {
      const params = new URLSearchParams();
      params.append("keywords", keywords);
      params.append("pet_type", petType);
      params.append("experience", experience);
      params.append("page", page);
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:6543/petSitterUser/petsitterdetail/alldetail?${params.toString()}` //edit
      );

      setPetSitterLists(results.data); //edit

      setTotalPages(results.data.total_pages); //edit
      setIsLoading(false);
    } catch (error) {
      setPetSitterLists([]);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getPetSitterById = async (petSitterId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:6543/petsitteruser/petsitterdetail/${petSitterId}`
      );

      setPetSitter(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error fetching petSitter:", error);
    }
  };

  return {
    petSitterLists,
    totalPages,
    petSitter,
    getPetSitterLists,
    getPetSitterById,

    isError,
    isLoading,
  };
};

export default useFilter;
