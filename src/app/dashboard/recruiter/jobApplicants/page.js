'use client';
import JobApplicantsPage from '@/components/JobApplicantsPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobApplicantsPage />
    </Suspense>
  );
}
