import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class TrimBodyValuesPipe implements PipeTransform {
  private isObject(obj: unknown): boolean {
    return typeof obj === 'object' && obj !== null
  }

  private trimBodyValues(obj) {
    Object.keys(obj).forEach(key => {
      if (this.isObject(obj[key])) {
        obj[key] = this.trimBodyValues(obj[key]);
      } else {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].trim();
        }
      }
    })
    return obj;
  }

  transform(obj: unknown, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (this.isObject(obj) && type === 'body') {
      return this.trimBodyValues(obj);
    }

    throw new BadRequestException('Validation failed');
  }
}
