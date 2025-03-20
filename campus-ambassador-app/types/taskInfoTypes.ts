export interface TaskInfo {
  _id: string; // MongoDB ObjectId as a string
  taskId: string;
  taskName: string;
  taskDetails: string[];
  image: string;
  taskExpiry: string; // ISO date string
  points: number;
  addedDate: string; // ISO date string
}
