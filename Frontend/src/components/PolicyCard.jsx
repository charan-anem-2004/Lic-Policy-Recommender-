export default function PolicyCard({ policy }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-[#013b6d] mb-2">{policy.name}</h3>
      <p className="text-gray-700 mb-2">{policy.description}</p>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>
          <strong>Premium:</strong> ₹{policy.premium}/year
        </li>
        <li>
          <strong>Coverage:</strong> ₹{policy.sumAssured}
        </li>
        <li>
          <strong>Term:</strong> {policy.term} years
        </li>
      </ul>
      <div className="mt-4 inline-block bg-[#fcc860] text-[#013b6d] font-semibold px-4 py-1 rounded-full text-sm shadow-sm">
        Match Score: {(policy.similarity * 100).toFixed(2)}%
      </div>
    </div>
  );
}
