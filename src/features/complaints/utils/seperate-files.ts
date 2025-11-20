import type { Complaint } from '../models/complaint';

type Files = Complaint['complaintFiles'];

export function seperateComplaintFiles(files: Files) {
  const seperatedFiles: { images: Files; documents: Files } = {
    images: [],
    documents: [],
  };

  for (const file of files) {
    if (file.path.endsWith('.pdf')) {
      seperatedFiles.documents.push(file);
    } else {
      seperatedFiles.images.push(file);
    }
  }

  return seperatedFiles;
}
