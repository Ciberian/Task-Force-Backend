import { CommentInterface } from '@taskforce/shared-types'

export class CommentEntity implements CommentInterface {
  public _id: string;
  public taskId: string;
  public text: string;
  public createdAt: Date;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment);
  }

  public toObject() {
    return { ...this }
  }

  public fillEntity(comment: CommentInterface) {
    this._id = comment._id;
    this.taskId = comment.taskId;
    this.text = comment.text;
    this.createdAt = new Date();
  }
}
