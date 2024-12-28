import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: (typeof HttpStatus)[keyof typeof HttpStatus];
    message: string;
  }) {
    super(`${HttpStatus[type]} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];
    if (name) {
      // @ts-ignore
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export const errorManagerParamCharacter = ({ id }: { id: string }) => {
  if (!Number.isInteger(id) || !id) {
    throw new ErrorManager({
      type: HttpStatus.BAD_REQUEST,
      message: `Only numeric type IDs are allowed ${id}`,
    });
  }
};
