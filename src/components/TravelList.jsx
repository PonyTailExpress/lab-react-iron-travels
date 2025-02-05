import React, { useState, useEffect } from 'react';
import travelPlansData from '../assets/travel-plans.json';
import './TravelList.css';

const TravelList = () => {

  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    setTravelPlans(travelPlansData);
  }, []);

  const handleDelete = (id) => {
    setTravelPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const getCostLabel = (cost) => {
    if (cost <= 350) {
      return 'Great Deal';
    } else if (cost >= 1500) {
      return 'Premium';
    }
    return ''; 
  };

  return (
    <div>
      <h2>Travel Plans</h2>
      <ul>
        {travelPlans.map((plan) => (
          <li key={plan.id} className="travel-plan">
            <h3>{plan.destination}</h3>
            <img src={plan.image} alt={plan.destination} className="travel-image" />
            <p><strong>Duration:</strong> {plan.days} days</p>
            <p><strong>Description:</strong> {plan.description}</p>
            <p><strong>Total Cost:</strong> ${plan.totalCost}</p>

            <div className="labels">
              {getCostLabel(plan.totalCost) && (
                <span className="label">{getCostLabel(plan.totalCost)}</span>
              )}
              {plan.allInclusive && (
                <span className="label">All Inclusive</span>
              )}
            </div>

            <button onClick={() => handleDelete(plan.id)} className="delete-button">Delete</button>

            <h4>Included in the Package:</h4>
            <ul>
              {plan.parts.map((part, index) => (
                <li key={index}>
                  <p><strong>{part.name}</strong></p>
                  <p>{part.description}</p>
                  <p><strong>Cost:</strong> ${part.cost}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelList;
