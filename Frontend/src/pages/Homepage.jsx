import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    sumAssured: "",
    description: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a custom prompt/query from the form data
    const prompt = `
      User Details:
      Name: ${formData.name}
      Age: ${formData.age}
      Gender: ${formData.gender}
      Occupation: ${formData.occupation}
      Minimum Sum Assured: ${formData.sumAssured}
      Description of Needs: ${formData.description}
    `;

    // Navigate to the recommendations page with the generated query
    navigate(`/recommendations?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="hero ">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-8">LIC Policy Recommender</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-left mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-left mb-2 font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Gender Input */}
            <div>
              <label className="block text-left mb-2 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Occupation Input */}
            <div>
              <label className="block text-left mb-2 font-medium">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter your occupation"
                className="input input-bordered w-full"
              />
            </div>

            {/* Minimum Sum Assured Input */}
            <div>
              <label className="block text-left mb-2 font-medium">
                Minimum Sum Assured Needed
              </label>
              <input
                type="number"
                name="sumAssured"
                value={formData.sumAssured}
                onChange={handleChange}
                placeholder="Enter minimum sum assured amount"
                className="input input-bordered w-full"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-left mb-2 font-medium">
                Description of Needs
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you need from the policy..."
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Get Recommendations
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
