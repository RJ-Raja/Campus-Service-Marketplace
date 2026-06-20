import { Request, Response } from 'express';
import Service from '../models/Service';
import { searchSchema } from '../utils/validation';

export const searchServices = async (req: Request, res: Response) => {
  try {
    const parse = searchSchema.safeParse(req.query);
    if (!parse.success) return res.status(400).json({ success: false, message: 'Invalid query', errors: parse.error.flatten() });

    const { query, category, page = 1, limit = 10 } = parse.data as any;
    const filters: any = { status: 'active' };
    if (category) filters.category = category;

    let findQuery = Service.find(filters);
    if (query) {
      findQuery = Service.find({ $text: { $search: query }, ...filters }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Service.countDocuments(findQuery.getFilter());
    const results = await findQuery.skip(skip).limit(Number(limit));

    res.json({ success: true, data: results, meta: { total, page: Number(page), limit: Number(limit) } });
  } catch (error) {
    console.error('searchServices error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { searchServices, getServiceById };
