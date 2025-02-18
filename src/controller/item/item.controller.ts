import { Request, Response } from 'express';
import { getAll, getByID, create, update, deleteByID } from '../../services/item.service';
import { ItemDto } from '../../mappers/dto/item.dto';

/**
 *  Get All existing Items on DB.
 *
 * @param req
 * @param res
 * @returns
 */
export const getAllItems = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const items: ItemDto[] = await getAll();
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ message: error?.message });
  }
};

/**
 * Get Item by ID from BD.
 *
 * @param req
 * @param res
 * @returns
 */
export const getItemByID = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const errors = [];
  try {
    const { itemId } = req.params;

    if (!itemId) {
      errors.push({
        field: 'itemId',
        message: 'Param "itemId" is required',
      });
      return res.status(400).json({ errors });
    } else {
      const item: ItemDto = await getByID(itemId);
      return res.status(200).json(item);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ message: error?.message });
  }
};

/**
 * Create an Item from data.
 *
 * @param req
 * @param res
 * @returns
 */
export const createItem = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const errors = [];
  try {
    const { name, price } = req.body;

    if (!name) {
      errors.push({
        field: 'name',
        message: 'Field "name" is required',
      });
      return res.status(400).json({ errors });
    }

    if (!price) {
      errors.push({
        field: 'price',
        message: 'Field "price" is required',
      });
      return res.status(400).json({ errors });
    } else if (price < 0) {
      errors.push({
        field: 'price',
        message: 'Field "price" cannot be negative',
      });
      return res.status(400).json({ errors });
    }
    const newItem: ItemDto = await create({ name, price });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ message: error?.message });
  }
};

/**
 * Update an item from data.
 *
 * @param req
 * @param res
 * @returns
 */
export const updateItem = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const errors = [];
  try {
    const { itemId } = req.params;
    const { name, price } = req.body;

    if (!itemId) {
      errors.push({
        field: 'itemId',
        message: 'Param "itemId" is required',
      });
      return res.status(400).json({ errors });
    } else {
      if (!name) {
        errors.push({
          field: 'name',
          message: 'Field "name" is required',
        });
        return res.status(400).json({ errors });
      }

      if (!price) {
        errors.push({
          field: 'price',
          message: 'Field "price" is required',
        });
        return res.status(400).json({ errors });
      } else if (price < 0) {
        errors.push({
          field: 'price',
          message: 'Field "price" cannot be negative',
        });
        return res.status(400).json({ errors });
      }

      const updatedItem = await update(itemId, { name, price });
      return res.status(200).json(updatedItem);
    }
  } catch (error) {
    res.status(error.status).json({ message: error?.message });
  }
};

/**
 * Delete an item by ID.
 *
 * @param req
 * @param res
 * @returns
 */
export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const errors = [];
  try {
    const { itemId } = req.params;

    if (!itemId) {
      errors.push({
        field: 'itemId',
        message: 'Param "itemId" is required',
      });
      return res.status(400).json({ errors });
    } else {
      await deleteByID(itemId);
      return res.status(204).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ message: error?.message });
  }
};
