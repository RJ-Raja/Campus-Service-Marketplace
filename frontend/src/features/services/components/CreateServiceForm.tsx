import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import serviceAPI from '../api/serviceAPI';

type FormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  images: FileList | null;
};

const CreateServiceForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onSubmit = async (values: FormValues) => {
    const fd = new FormData();
    fd.append('title', values.title);
    fd.append('description', values.description);
    fd.append('price', String(values.price));
    fd.append('category', values.category);

    if (values.images && values.images.length) {
      Array.from(values.images).forEach((file) => fd.append('images', file));
    }

    await serviceAPI.createService(fd);
    alert('Service created');
    reset();
    setPreviewUrls([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input {...register('title', { required: true })} className="mt-1 block w-full rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register('description', { required: true })} className="mt-1 block w-full rounded-md" rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="mt-1 block w-full rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input {...register('category', { required: true })} className="mt-1 block w-full rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <input type="file" {...register('images')} onChange={handleImageChange} multiple accept="image/*" className="mt-1" />
        <div className="mt-2 flex gap-2">
          {previewUrls.map((u, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <img key={i} src={u} alt={`preview-${i}`} className="h-20 w-20 object-cover rounded" />
          ))}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="rounded bg-green-600 text-white px-4 py-2">
        Create Service
      </button>
    </form>
  );
};

export default CreateServiceForm;
