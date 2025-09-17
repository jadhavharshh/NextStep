"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        HOME PAGE
      </div>
      <Button
        onClick={() => router.push('/auth')}
        className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition"
      >
        Go to Auth
      </Button>
    </>
  );
};

export default Page;
