import React from "react";
import Recommendations from "../components/Recommendations";


const RecommendationsPage = ({ userId }) => {
  return (
    <div>
      <h1>Personalized Recommendations</h1>
      <Recommendations userId={userId} />
    </div>
  );
};

export default RecommendationsPage;
