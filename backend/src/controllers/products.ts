import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';

export const getProducts = (_req: Request, res: Response, next: NextFunction): void => {
  Product.find({})
    .then((items) => res.json({ items, total: items.length }))
    .catch(next);
};

export const createProduct = (req: Request, res: Response, next: NextFunction): void => {
  Product.create(req.body)
    .then((product) => res.status(201).json(product))
    .catch(next);
};
