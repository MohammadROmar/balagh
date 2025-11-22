export type Complaint = {
  id: number;
  userId: string;
  userName: string;
  status: string;
  createdAt: string;
  location: string;
  description: string;
  governmentalEntityId: number;
  lockedBy: string;
  lockedByUserName: string;
  isLocked: boolean;
  complaintFiles: ComplaintFile[];
  histories: History[];
  notes: Note[];
};

export type ComplaintFile = {
  id: number;
  path: string;
};

export type History = {
  id: number;
  complaintId: number;
  userId: string;
  userName: string;
  changeType: string;
  oldValue: string;
  newValue: string;
  changeDetails: string;
  createdAt: string;
};

export type Note = {
  id: number;
  userId: string;
  userName: string;
  complaintId: number;
  noteBody: string;
  createdAt: string;
};
