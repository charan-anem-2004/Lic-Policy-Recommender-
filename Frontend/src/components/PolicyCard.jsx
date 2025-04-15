export default function PolicyCard({ policy }) {
  console.log('PolicyCard', policy);
    return (
      <div className="card bg-base-100 shadow-md p-4" style={{ marginBottom: '20px' }}>
        <h2 className="text-xl font-bold">{policy.name}</h2>
        <p>{policy.description}</p>
        <p>Premium: {policy.premium}/Year</p>
        <p>Coverage: {policy.sumAssured}</p>
        <p>Term: {policy.term}</p>
        <div className="badge badge-primary mt-2">
          Match Score: {(policy.similarity * 100).toFixed(2)}%
        </div>
      </div>
    );
  }
  
