import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import { searchPolicies } from '../services/api';
import "../App.css"
export default function RecommendationsPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false); // Ensure loading starts as false initially
  
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    const fetchPolicies = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const results = await searchPolicies(query);
        setPolicies(results);
        console.log("Final response data:", results);
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (query) fetchPolicies();
  }, [location.search]);

  return (
    <div className="container">
      <h2 className="text-5xl font-bold mb-8 text-center">Recommended Policies</h2>

      {loading ? (
        <div className="text-center">
          <p>Fetching Policies...</p>
          <span className="loader"></span>
        </div>
      ) : policies.length > 0 ? (
        <div className="card-container">
          {policies.map((policy,index) => (
            <PolicyCard key={index} policy={policy} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No policies found.</p>
        </div>
      )}
    </div>
  );
}
