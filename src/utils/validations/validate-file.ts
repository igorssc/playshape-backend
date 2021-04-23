import { HttpException, HttpStatus } from '@nestjs/common';

export default (type: string, mimetype: string) => {
  switch (type) {
    case 'image':
      if (
        !['image/jpeg', 'image/png', 'image/webp'].find(
          (element) => element === mimetype,
        )
      ) {
        throw new HttpException('Format file invalid!', HttpStatus.BAD_REQUEST);
      }
      break;
    case 'document':
      if (
        ![
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].find((element) => element === mimetype)
      ) {
        throw new HttpException('Format file invalid!', HttpStatus.BAD_REQUEST);
      }
      break;
  }
};
