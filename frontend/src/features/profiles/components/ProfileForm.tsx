import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileAPI, ProfilePayload } from '../api/profileAPI';

const ProfileForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProfilePayload>();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await profileAPI.getMyProfile();
        const data = res.data.data;
        setValue('bio', data.bio || '');
        setValue('skills', (data.skills || []).join(', '));
      } catch (err) {
        // ignore
      }
    };
    load();
  }, [setValue]);

  const onSubmit = async (values: ProfilePayload) => {
    await profileAPI.updateMyProfile(values);
    alert('Profile saved');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea {...register('bio')} className="mt-1 block w-full rounded-md" rows={4} />
        {errors.bio && <p className="text-sm text-red-600">{errors.bio.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
        <input {...register('skills')} className="mt-1 block w-full rounded-md" />
      </div>

      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 text-white px-4 py-2">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
