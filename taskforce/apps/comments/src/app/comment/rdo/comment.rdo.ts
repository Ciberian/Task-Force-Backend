import { Expose } from 'class-transformer'

export class CommentRdo {
  @Expose({name: '_id'})
  public id: string

  @Expose()
  taskId: string;

  @Expose()
  text: string;
}
