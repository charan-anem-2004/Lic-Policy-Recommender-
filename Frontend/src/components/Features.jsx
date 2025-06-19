import { FaBrain } from "react-icons/fa";
import { BsShieldShaded } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-white text-2xl" />,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your profile to find the perfect policy match",
  },
  {
    icon: <BsShieldShaded className="text-white text-2xl" />,
    title: "Comprehensive Coverage",
    description:
      "Get recommendations across all LIC policy categories and plans",
  },
  {
    icon: <FiTrendingUp className="text-white text-2xl" />,
    title: "Smart Optimization",
    description:
      "Optimize your investment returns while ensuring maximum protection",
  },
  {
    icon: <FaUserFriends className="text-white text-2xl" />,
    title: "Personalized Approach",
    description:
      "Tailored recommendations based on your unique financial goals",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white text-center w-full">
      <h2 className="text-4xl font-bold mb-4 text-[#014076]">
        Why Choose Our AI Recommender?
      </h2>
      <p className="text-gray-600 mb-25 max-w-2xl mx-auto">
        Experience the future of insurance planning with our intelligent
        recommendation system
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-20">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white drop-shadow-xl p-6 rounded-xl hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#0d65b1] to-[#014076] rounded-full mx-auto mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#014076]mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
