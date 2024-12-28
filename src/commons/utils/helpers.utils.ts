import { FindManyOptions } from 'typeorm';

export const mergeAndOrConditionsHelpers = <T>({
  and,
  or,
}: {
  and: FindManyOptions<T>;
  or: FindManyOptions<T>;
}) => {
  return (Array.isArray(or.where) ? or.where : [or.where]).map((item) => ({
    ...item,
    ...and.where,
  }));
};
