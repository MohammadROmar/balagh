export type FilterByStatus = {
  status: string;
  complaintCount: number;
  percentageOfTotalComplaints: number;
}[];

export type FilterByGovEntity = {
  govermentalEntityId: number;
  govermentalEntityName: string;
  complaintCount: number;
  percentageOfTotalComplaints: number;
}[];

export type FilterByTime = {
  year: number;
  month: number;
  complaintCount: number;
  percentageOfTotalComplaints: number;
}[];
