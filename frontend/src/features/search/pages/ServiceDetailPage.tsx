import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import searchAPI from '../api/searchAPI';
import BookNowForm from '../../bookings/components/BookNowForm';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await searchAPI.getService(id);
      setService(res.data.data);
    })();
  }, [id]);

  if (!service) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{service.title}</h1>
      <p className="text-gray-700">{service.description}</p>
      <p className="mt-2">Price: ${service.price}</p>
      <div className="mt-4">
        <BookNowForm service={service} />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
