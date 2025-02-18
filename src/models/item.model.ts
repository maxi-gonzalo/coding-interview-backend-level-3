import { Schema, model } from 'mongoose';
import { Iitem } from '../interface/item.interface';

export type ItemDocument = Iitem;

const ItemSchema = new Schema<Iitem>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// ItemSchema.index({ _id: 1 }, { name: 'item_index' });
export default model<Iitem>('Item', ItemSchema);
