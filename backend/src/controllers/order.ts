import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

interface IOrderBody {
  items: string[];
  total: number;
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
}

const createOrder = (
  req: Request<{}, {}, IOrderBody>,
  res: Response,
  next: NextFunction,
): void => {
  const { items, total } = req.body;
  const uniqueIds = [...new Set(items)];

  Product.find({ _id: { $in: uniqueIds } })
    .then((products) => {
      if (products.length !== uniqueIds.length) {
        throw new BadRequestError('Один или несколько товаров не найдены');
      }
      const productMap = new Map(products.map((product) => [product._id.toString(), product]));
      const calculatedTotal = items.reduce((sum, id) => {
        const product = productMap.get(id);
        if (!product || product.price === null) {
          throw new BadRequestError('Заказ содержит товар не для продажи');
        }
        return sum + product.price;
      }, 0);

      if (calculatedTotal !== total) {
        throw new BadRequestError('Неверная сумма заказа');
      }
      res.status(200).json({ id: randomUUID(), total: calculatedTotal });
    })
    .catch(next);
};

export default createOrder;
