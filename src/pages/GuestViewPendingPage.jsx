import React from "react";
import PendingArtDisplay from "../components/PendingArtDisplay";
import AcceptedArtDisplay from "../components/AcceptedArtDisplay";

const GuestViewPendingPage = () => {
  return (
    <main className="py-20  flex flex-col bg-gray-950 min-h-screen justify-center items-center">
      <h1 className="text-white text-3xl mb-12">- Submission Pending -</h1>
      <PendingArtDisplay />
      <h1 className="text-white text-3xl mt-20 mb-12">
        - Submission Accepted -
      </h1>
      <AcceptedArtDisplay />
    </main>
  );
};

export default GuestViewPendingPage;
