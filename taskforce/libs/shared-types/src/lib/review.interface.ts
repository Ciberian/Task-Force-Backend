import mongoose from 'mongoose';


export interface ReviewInterface {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  taskId: number;
  reviewText: string;
  reviewRating: number;
}
