'use client';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeAnalyzer />
    </Suspense>
  );
}
