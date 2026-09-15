/** Os ícones do site são desenhados aqui: não há biblioteca de ícones no
    projeto. Todos herdam a cor com currentColor e recebem o tamanho de quem
    os usa, então servem tanto ao botão do hero quanto às pílulas da barra. */

/** Marca do LinkedIn em contorno (SVG Repo). A 15px o contorno original fica
    sub-pixel e lê bem mais claro que o ícone de tema ao lado; o stroke de 1.6
    (≈0,6px nesse tamanho) engrossa o desenho até o peso dos sinais de 2px, sem
    mudar a cor — as duas pílulas usam o mesmo --fg-dim. */
export function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M28.109,34.4c-0.35,0-0.635-0.284-0.635-0.634V24.13c0-3.484-1.788-3.484-2.462-3.484c-1.878,0-2.829,1.172-2.829,3.484 v9.637c0,0.35-0.284,0.634-0.634,0.634H16.1c-0.35,0-0.634-0.284-0.634-0.634V15.41c0-0.35,0.284-0.634,0.634-0.634h5.45 c0.35,0,0.634,0.284,0.634,0.634v0.684l0.328-0.271c1.29-1.067,2.829-1.608,4.574-1.608c2.157,0,3.973,0.689,5.251,1.994 c1.35,1.378,2.063,3.43,2.063,5.933v11.625c0,0.35-0.285,0.634-0.635,0.634H28.109z M25.013,19.376 c1.394,0,3.732,0.618,3.732,4.754v9.002h4.385v-10.99c0-4.231-2.203-6.657-6.044-6.657c-3.43,0-4.916,2.59-4.978,2.7 c-0.112,0.203-0.324,0.329-0.555,0.329c-0.052,0-0.105-0.008-0.159-0.021c-0.282-0.071-0.479-0.322-0.479-0.61v-1.837h-4.18v17.087 h4.18V24.13C20.915,21.153,22.447,19.376,25.013,19.376L25.013,19.376z" />
      <path d="M6.78,34.4c-0.35,0-0.635-0.284-0.635-0.634V15.41c0-0.35,0.285-0.634,0.635-0.634h5.685c0.35,0,0.634,0.284,0.634,0.634 v18.356c0,0.35-0.284,0.634-0.634,0.634H6.78z M7.415,33.132h4.415V16.045H7.415V33.132z" />
      <path d="M9.597,13.639c-2.204,0-3.997-1.803-3.997-4.019C5.6,7.403,7.393,5.6,9.597,5.6c2.201,0,3.993,1.804,3.993,4.021 C13.59,11.836,11.798,13.639,9.597,13.639L9.597,13.639z M9.597,6.866c-1.504,0-2.727,1.235-2.727,2.754 c0,1.518,1.223,2.751,2.727,2.751c1.503,0,2.725-1.233,2.725-2.751C12.321,8.102,11.1,6.866,9.597,6.866L9.597,6.866z" />
    </svg>
  );
}

/** Seta de baixar, nos mesmos traços do ícone de tema. */
export function DownloadMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

/** Marca do GitHub (Simple Icons). Como toda logo de terceiro, vem cheia. */
export function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/** Envelope, nos mesmos traços da seta de baixar. */
export function MailMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  );
}
