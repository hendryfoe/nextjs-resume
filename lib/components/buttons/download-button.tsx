'use client';

import { useRouter } from 'next/navigation';

export function DownloadButton() {
  const router = useRouter();

  function handleDownload() {
    const password = window.prompt('Input password');
    if (password != null && password !== '') {
      router.push(`/api/pdf?p=${password}`);
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 hover:bg-blue-700 text-white font-semi py-2 px-4 rounded w-full transition-all disabled:bg-blue-700"
    >
      Download
    </button>
  );
}
