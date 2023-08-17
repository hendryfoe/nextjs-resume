declare namespace NodeJS {
  interface ProcessEnv {
    API_AUTHENTICATION_KEY: string;
    OBSCURE_KEYS: string;
    RESUME_CONTENT_URL: string;
  }
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
