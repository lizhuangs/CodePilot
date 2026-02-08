'use client';

import { useState, useCallback } from 'react';
import type { FileAttachment } from '@/types';
import { isImageFile } from '@/types';
import { ImageThumbnail } from './ImageThumbnail';
import { FileCard } from './FileCard';
import { ImageLightbox } from './ImageLightbox';

interface FileAttachmentDisplayProps {
  files: FileAttachment[];
}

export function FileAttachmentDisplay({ files }: FileAttachmentDisplayProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageFiles = files.filter((f) => isImageFile(f.type));
  const otherFiles = files.filter((f) => !isImageFile(f.type));

  const lightboxImages = imageFiles.map((f) => ({
    src: `data:${f.type};base64,${f.data}`,
    alt: f.name,
  }));

  const handlePreview = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  if (files.length === 0) return null;

  const imageGridCols =
    imageFiles.length === 1
      ? 'grid-cols-1 max-w-xs'
      : imageFiles.length === 2
        ? 'grid-cols-2 max-w-sm'
        : 'grid-cols-3 max-w-md';

  return (
    <div className="space-y-2 mb-2">
      {imageFiles.length > 0 && (
        <div className={`grid gap-2 ${imageGridCols}`}>
          {imageFiles.map((file, i) => (
            <ImageThumbnail
              key={file.id}
              src={`data:${file.type};base64,${file.data}`}
              alt={file.name}
              onClick={() => handlePreview(i)}
            />
          ))}
        </div>
      )}

      {otherFiles.length > 0 && (
        <div className="space-y-1.5">
          {otherFiles.map((file) => (
            <FileCard key={file.id} name={file.name} size={file.size} />
          ))}
        </div>
      )}

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
