'use client';

import { FileIcon } from 'lucide-react';
import { formatFileSize } from '@/types';

interface FileCardProps {
  name: string;
  size: number;
}

export function FileCard({ name, size }: FileCardProps) {
  return (
    <div className="rounded-lg border bg-muted/50 p-3 flex items-center gap-3">
      <FileIcon className="h-5 w-5 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{name}</div>
        <div className="text-xs text-muted-foreground">{formatFileSize(size)}</div>
      </div>
    </div>
  );
}
