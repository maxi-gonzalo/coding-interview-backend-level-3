import { ErrorException } from '../middlewares/error-exception';
import { ItemDto } from '../mappers/dto/item.dto';
import { mapItemToDTO, mapListItemToDTO } from '../mappers/item.mapper';
import Item from '../models/item.model';
import { ErrorCode } from '../middlewares/error-code';
import { Types } from 'mongoose';

const ITEM_NOT_FOUND_ERROR = 'item not found';

/**
 * Return all existing MongoDB Items.
 *
 * @returns Promise<ItemDto[]>
 */
export async function getAll(): Promise<ItemDto[]> {
  try {
    const items = await Item.find();
    return mapListItemToDTO(items);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Return an MongoDB Item.
 *
 * @param itemId
 * @returns Promise<ItemDto>
 */
export async function getByID(itemId: string): Promise<ItemDto> {
  try {
    const itemFound = await Item.findOne({ _id: new Types.ObjectId(itemId) });
    if (!itemFound) throw new ErrorException(ErrorCode.NotFound, ITEM_NOT_FOUND_ERROR);
    return mapItemToDTO(itemFound);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Creates an Item on MongoDB.
 *
 * @param itemData
 * @returns Promise<ItemDto>
 */
export async function create(itemData: any): Promise<ItemDto> {
  try {
    const itemCreated = await Item.create(itemData);
    console.log('itemCreated: ', itemCreated);
    return mapItemToDTO(itemCreated);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Upate item by id on MongoDB.
 *
 * @param itemId
 * @param itemData
 * @returns Promise<ItemDto>
 */
export async function update(itemId: string, itemData: any): Promise<ItemDto> {
  try {
    //   return await Item.updateOne({ itemUuid }, { $set: itemData });
    const itemUpdated = await Item.findByIdAndUpdate(
      { _id: new Types.ObjectId(itemId) },
      itemData,
      {
        new: true,
      },
    );
    if (!itemUpdated) throw new ErrorException(ErrorCode.NotFound, ITEM_NOT_FOUND_ERROR);
    return mapItemToDTO(itemUpdated);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Delete item by id on MongoDB.
 *
 * @param itemId
 * @returns
 */

export async function deleteByID(itemId: string): Promise<void> {
  try {
    const result = await Item.deleteOne({ _id: new Types.ObjectId(itemId) });
    if (result.deletedCount === 1) {
      console.log('item deleted successfully');
    } else {
      console.log('item not found or error on delete');
      throw new ErrorException(ErrorCode.NotFound, ITEM_NOT_FOUND_ERROR);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
