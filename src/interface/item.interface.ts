import { Document } from 'mongoose';

export interface Iitem extends Document {
  name: string;
  price: number;
}
