'use client';

import Image from 'next/image';

import AttachmentICon from '@/assets/icons/attachment';
import type { Complaint } from '../models/complaint';
import ComplaintFullImageOverlay from './full-image-overlay';
import { Activity, useState } from 'react';

type ComplaintFilesProps = {
  title: string;
  complaintFiles: Complaint['complaintFiles'];
};

function ComplaintFiles({ title, complaintFiles }: ComplaintFilesProps) {
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

      <section className="bg-secondary-background rounded-2xl border border-gray-300 p-4 shadow dark:border-gray-600">
        <div className="flex items-center gap-2">
          <AttachmentICon className="text-emerald-green size-5" />
          <h3 className="text-heading text-xl font-semibold">{title}</h3>
        </div>

        <hr className="my-4 text-gray-300 dark:text-gray-600" />

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {complaintFiles.map((file, i) => (
            <li
              key={`complaint-file-${file.id}`}
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
      </section>
    </>
  );
}

export default ComplaintFiles;
