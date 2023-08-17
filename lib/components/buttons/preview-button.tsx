'use client';

import { useRouter } from 'next/navigation';

export function PreviewButton() {
  const router = useRouter();

  function handlePreview() {
    const password = window.prompt('Input password');
    if (password != null && password !== '') {
      router.push(`/?p=${password}`);
    }
  }

  return (
    <button
      onClick={handlePreview}
      className="bg-blue-500 hover:bg-blue-700 text-white font-semi py-2 px-4 rounded w-full transition-all disabled:bg-blue-700"
    >
      Preview
    </button>
  );
}
