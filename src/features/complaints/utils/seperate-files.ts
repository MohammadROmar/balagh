import type { ComplaintFile } from '../models/complaint';

export function seperateComplaintFiles(files: ComplaintFile[]) {
  const seperatedFiles: {
    images: ComplaintFile[];
    documents: ComplaintFile[];
  } = {
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
