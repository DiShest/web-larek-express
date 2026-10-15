import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description?: string;
  price: number | null;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле title обязательно'],
    unique: true,
    minlength: [2, 'Минимальная длина названия — 2 символа'],
    maxlength: [30, 'Максимальная длина названия — 30 символов'],
  },
  image: {
    type: new Schema({
      fileName: { type: String, required: [true, 'Укажите путь к изображению'] },
      originalName: { type: String, required: [true, 'Укажите имя изображения'] },
    }, { _id: false }),
    required: [true, 'Поле image обязательно'],
  },
  category: { type: String, required: [true, 'Поле category обязательно'] },
  description: { type: String },
  price: { type: Number, default: null },
}, { versionKey: false });

export default mongoose.model<IProduct>('product', productSchema);
