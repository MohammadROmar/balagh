'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import ComplaintFullImageOverlay from './full-image-overlay';
import ImageIcon from '@/assets/icons/image';
import PdfIcon from '@/assets/icons/pdf';
import FileIcon from '@/assets/icons/file';
import ComplaintDetailsContainer from './details-container';
import { seperateComplaintFiles } from '../utils/seperate-files';
import type { ComplaintFile } from '../models/complaint';
import type { TFunction } from '@/shared/models/tfunction';

type ComplaintFilesProps = { complaintFiles: ComplaintFile[] };

type ComplaintSubFilesProps = {
  t: TFunction<'complaintsPage.details'>;
} & ComplaintFilesProps;

function ComplaintFiles({ complaintFiles }: ComplaintFilesProps) {
  const t = useTranslations('complaintsPage.details');

  const files = seperateComplaintFiles(complaintFiles);

  return (
    <>
      <ComplaintImages t={t} complaintFiles={files.images} />
      <ComplaintDocuments t={t} complaintFiles={files.documents} />
    </>
  );
}

function ComplaintImages({ t, complaintFiles }: ComplaintSubFilesProps) {
  const [opendImage, setOpendImage] = useState(-1);

  return (
    <>
      {opendImage > -1 && (
        <ComplaintFullImageOverlay
          images={complaintFiles}
          opendImage={opendImage}
          close={() => setOpendImage(-1)}
        />
      )}

      <ComplaintDetailsContainer title={t('images')} icon={ImageIcon}>
        {complaintFiles.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {complaintFiles.map((file, i) => (
              <li
                key={`complaint-image-${file.id}`}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => setOpendImage(i)}
                  className="relative size-full cursor-pointer"
                >
                  <Image
                    src={file.path}
                    alt="Complaint image"
                    fill
                    sizes="(min-width: 48rem): 33.33vw, 50vw"
                    className="object-cover object-center"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary text-center text-sm">
            {t('noFilesProvided')}
          </p>
        )}
      </ComplaintDetailsContainer>
    </>
  );
}

function ComplaintDocuments({ t, complaintFiles }: ComplaintSubFilesProps) {
  return (
    <ComplaintDetailsContainer title={t('documents')} icon={FileIcon}>
      {complaintFiles.length > 0 ? (
        <ul className="flex flex-col gap-4 md:grid-cols-3">
          {complaintFiles.map((file) => {
            const x = complaintFiles[0].path.split('/');
            const complaintFileName = x[x.length - 1];

            return (
              <li
                key={`complaint-document-${file.id}`}
                className="bg-primary-background flex items-center justify-between rounded-2xl px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <PdfIcon className="text-error size-5" />
                  <p className="max-w-[20ch] truncate">{complaintFileName}</p>
                </div>
                <a
                  href={file.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal w-fit"
                >
                  {t('view')}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-secondary text-center text-sm">
          {t('noFilesProvided')}
        </p>
      )}
    </ComplaintDetailsContainer>
  );
}

export default ComplaintFiles;
