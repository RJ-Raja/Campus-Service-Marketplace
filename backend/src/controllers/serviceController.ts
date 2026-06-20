import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Service from '../models/Service';
import { serviceCreateSchema, serviceUpdateSchema } from '../utils/validation';
import cloudinaryService from '../services/cloudinaryService';

// POST create service (provider only). Expects files in req.files (multer)
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    // validate body
    const body = { ...req.body, price: Number(req.body.price) };
    const parse = serviceCreateSchema.safeParse(body);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: 'Invalid payload', errors: parse.error.flatten() });
    }

    const files = (req.files as Express.Multer.File[]) || [];
    const uploadPromises = files.map((file) => cloudinaryService.uploadBufferToCloudinary(file.buffer, 'csmp/services'));
    const imageUrls = await Promise.all(uploadPromises);

    const service = new Service({
      title: parse.data.title,
      description: parse.data.description,
      price: parse.data.price,
      category: parse.data.category,
      images: imageUrls,
      providerId: user._id,
    });

    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error('createService error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET the authenticated provider's services
export const getMyServices = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const services = await Service.find({ providerId: user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT update a service (only owner)
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { id } = req.params;
    const body: any = { ...req.body };
    if (body.price) body.price = Number(body.price);

    const parse = serviceUpdateSchema.safeParse(body);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: 'Invalid payload', errors: parse.error.flatten() });
    }

    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    if (service.providerId.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // handle new images if provided
    const files = (req.files as Express.Multer.File[]) || [];
    if (files.length) {
      const uploadPromises = files.map((file) => cloudinaryService.uploadBufferToCloudinary(file.buffer, 'csmp/services'));
      const imageUrls = await Promise.all(uploadPromises);
      service.images = service.images.concat(imageUrls);
    }

    // update fields
    if (parse.data.title) service.title = parse.data.title;
    if (parse.data.description) service.description = parse.data.description;
    if (parse.data.price !== undefined) service.price = parse.data.price;
    if (parse.data.category) service.category = parse.data.category;

    await service.save();
    res.json({ success: true, data: service });
  } catch (error) {
    console.error('updateService error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { createService, getMyServices, updateService };
