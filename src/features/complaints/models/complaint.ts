export type Complaint = {
  id: number;
  userId: string;
  userName: string;
  status: string;
  createdAt: string;
  location: string;
  description: string;
  governmentalEntityId: number;
  complaintFiles: {
    id: number;
    path: string;
  }[];
};
