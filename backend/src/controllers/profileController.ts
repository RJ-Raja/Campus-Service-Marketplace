import { Request, Response } from 'express';
import ProviderProfile, { IProviderProfile } from '../models/ProviderProfile';
import { AuthRequest } from '../middlewares/auth';
import { profileUpdateSchema } from '../utils/validation';

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const profile = await ProviderProfile.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const parseResult = profileUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, message: 'Invalid payload', errors: parseResult.error.flatten() });
    }

    const { bio, skills } = parseResult.data;
    const skillsArray = skills ? skills.split(',').map((s) => s.trim()).filter(Boolean) : undefined;

    const updated = await ProviderProfile.findOneAndUpdate(
      { userId: user._id },
      { $set: { ...(bio !== undefined ? { bio } : {}), ...(skillsArray ? { skills: skillsArray } : {}) } },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { getMyProfile, updateMyProfile };
