// hooks/useFeatured.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFeatured = () => {
  const [featured, setFeatured] = useState([]);
  const API_URL = "https://nikejsonserver-2.onrender.com";


  useEffect(() => {
     axios.get(`${API_URL}/featured`).then((res) => {
      setFeatured(res.data);
    });
  }, []);

  return { featured, setFeatured };
};

export default useFeatured;
