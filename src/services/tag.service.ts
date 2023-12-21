import { CreateTagInput } from '../schemas/tag.schema';
import { tagRepository } from '../repositories/tag.repository';

export const findTag = async (data: CreateTagInput) => {
  return tagRepository.findTag(data);
};
