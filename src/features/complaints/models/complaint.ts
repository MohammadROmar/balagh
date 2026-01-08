export type Complaint = {
  id: number;
  userId: string;
  userName: string;
  status: ComplaintStatus;
  createdAt: string;
  location: string;
  description: string;
  governmentalEntityId: number;
  govermentalEntityName: string;
  lockedBy: string;
  lockedByUserName: string;
  isLocked: boolean;
  rowVersion: string;
  complaintFiles: ComplaintFile[];
  histories: History[];
  notes: Note[];
};

export type ComplaintStatus = 'New' | 'InProcessing' | 'Done' | 'Declined';

export type ComplaintFile = {
  id: number;
  path: string;
};

export type History = {
  id: number;
  complaintId: number;
  userId: string;
  userName: string;
  changeType: ComplaintChangeType;
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

export type ComplaintChangeType =
  | 'AddFile'
  | 'AddNote'
  | 'DeleteFile'
  | 'UpdateStatus'
  | 'UpdateLocation'
  | 'UpdateDescription'
  | 'RequestMoreInformation'
  | 'GovermentalEntityChange';
