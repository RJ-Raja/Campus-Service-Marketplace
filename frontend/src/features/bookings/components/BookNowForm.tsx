import React from 'react';
import { useForm } from 'react-hook-form';
import bookingAPI from '../api/bookingAPI';

const BookNowForm: React.FC<{ service: any }> = ({ service }) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<any>({ defaultValues: { details: '', requestedDate: '' } });

  const onSubmit = async (values: any) => {
    await bookingAPI.createBooking({ serviceId: service._id, details: values.details, requestedDate: values.requestedDate });
    alert('Booking requested');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Details</label>
        <textarea {...register('details')} className="mt-1 block w-full rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Requested Date</label>
        <input type="date" {...register('requestedDate')} className="mt-1 block rounded" />
      </div>
      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 text-white px-4 py-2">Request Booking</button>
    </form>
  );
};

export default BookNowForm;
