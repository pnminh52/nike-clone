// hooks/useFeatured.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFeatured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/featured").then((res) => {
      setFeatured(res.data);
    });
  }, []);

  return { featured, setFeatured };
};

export default useFeatured;
