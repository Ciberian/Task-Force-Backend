import mongoose from 'mongoose';


export interface ReviewInterface {
  _id?: string;
  customerId: mongoose.Types.ObjectId;
  contractorId: mongoose.Types.ObjectId;
  taskId: number;
  reviewText: string;
  reviewRating: number;
}
