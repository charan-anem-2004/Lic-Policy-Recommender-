import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchPolicies } from "../services/api";

export default function RecommendationsPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    const fetchPolicies = async () => {
      setLoading(true);
      try {
        const results = await searchPolicies(query);
        setPolicies(results);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchPolicies();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#013b6d] via-[#00539c] to-[#073259] px-6 py-16 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
          Top Recommended <span className="text-[#fcc860]">Policies</span>
        </h1>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : policies.length > 0 ? (
          <div className="space-y-8">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md p-6 hover:scale-[1.01] transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#fcc860] mb-2">
                      {policy.name}
                    </h2>
                    <p className="text-white/90 text-sm mb-4">
                      {policy.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-sm">
                      <div>
                        <span className="font-medium text-white/80">
                          Premium:
                        </span>{" "}
                        ₹{policy.premium}/year
                      </div>
                      <div>
                        <span className="font-medium text-white/80">
                          Coverage:
                        </span>{" "}
                        ₹{policy.sumAssured}
                      </div>
                      <div>
                        <span className="font-medium text-white/80">Term:</span>{" "}
                        {policy.term} years
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/80 mt-10">
            No policies found. Please adjust your inputs.
          </div>
        )}
      </div>
    </div>
  );
}
