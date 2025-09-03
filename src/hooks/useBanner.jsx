import { useState, useEffect } from 'react';

const useBanner = (position) => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/banner`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }
        return response.json();
      })
      .then((data) => {
        const filtered = position
          ? data.filter((item) => item.position === position)
          : data;
        setBanner(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [position]);

  return { banner, loading, error };
};

export default useBanner;
