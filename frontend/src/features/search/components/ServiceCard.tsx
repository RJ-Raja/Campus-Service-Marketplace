import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  service: any;
};

const ServiceCard: React.FC<Props> = ({ service }) => {
  return (
    <div className="border rounded p-4">
      <Link to={`/services/${service._id}`}>
        <h3 className="text-lg font-semibold">{service.title}</h3>
      </Link>
      <p className="text-sm text-gray-600">{service.category} • ${service.price}</p>
      {service.images && service.images[0] && (
        <img src={service.images[0]} alt={service.title} className="mt-2 h-40 w-full object-cover rounded" />
      )}
    </div>
  );
};

export default ServiceCard;
