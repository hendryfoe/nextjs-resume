import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Head from 'next/head';

import '../../public/css/nprogress.css';
import '../styles/globals.css';

function handleStart() {
  NProgress.start();
}

function handleStop() {
  NProgress.done();
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log('qweqweqwe');
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Minimalist Resume</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
