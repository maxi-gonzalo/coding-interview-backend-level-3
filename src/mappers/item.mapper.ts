import { ItemDocument } from '../models/item.model';
import { ItemDto } from './dto/item.dto';

/**
 * Convert fromItemDocument to ItemDto
 *
 * @param item
 * @returns ItemDto
 */
export function mapItemToDTO(item: ItemDocument): ItemDto {
  const dto = new ItemDto();
  dto.id = item.id;
  dto.name = item.name;
  dto.price = item.price;
  return dto;
}

/**
 * Convert from ItemDocument array to ItemDto array.
 *
 * @param item
 * @returns ItemDto[]
 */
export function mapListItemToDTO(item: ItemDocument[]): ItemDto[] {
  return item.map((item) => mapItemToDTO(item));
}
