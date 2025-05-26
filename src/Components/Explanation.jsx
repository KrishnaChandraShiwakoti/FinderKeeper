import React from "react";
import { MapPin, Compass, MessageCircle } from "lucide-react";
import ExplanationCard from "./ExplanationCard";

import "../Styles/Explanation.css";

const Explanation = () => {
  return (
    <section className="section how-section">
      <div className="container">
        <h2 className="section-title">How FinderKeeper Works</h2>
        <div className="how-grid">
          <ExplanationCard
            icon={<MapPin />}
            title="Report"
            description="Quickly report a lost item or register something you've found to
              help it find its way home."
          />
          <ExplanationCard
            icon={<Compass />}
            title="Connect"
            description="Our platform helps connect item owners with finders through our
              secure messaging system."
          />
          <ExplanationCard
            icon={<MessageCircle />}
            title="Reunite"
            description="Arrange a safe meetup to retrieve your belongings and reward
              honest finders."
          />
        </div>
      </div>
    </section>
  );
};

export default Explanation;
