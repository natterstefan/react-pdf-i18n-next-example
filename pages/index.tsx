import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactCountryFlag from 'react-country-flag'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const locale = router.locale || 'en'

  return (
    <div className={styles.container}>
      <Head>
        <title>react-pdf with use-intl</title>
        <meta
          name="description"
          content="This is a Next.js app illustrating how to use use-intl to render i18n-ready PDFs with react-pdf.org."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a
            href="https://react-pdf.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-pdf
          </a>{' '}
          with{' '}
          <a
            href="https://www.npmjs.com/package/use-intl"
            target="_blank"
            rel="noopener noreferrer"
          >
            use-intl
          </a>
        </h1>

        <div className={styles.lang}>
          <Link href="/" locale="en">
            <a>
              <ReactCountryFlag
                className={styles.flag}
                countryCode="US"
                style={{
                  fontSize: '2rem',
                }}
              />
            </a>
          </Link>
          <Link href="/" locale="de">
            <a>
              <ReactCountryFlag
                className={styles.flag}
                countryCode="DE"
                style={{
                  fontSize: '2rem',
                }}
              />
            </a>
          </Link>
        </div>

        <div className={styles.pdf}>
          <iframe
            src={`//${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pdf?locale=${locale}`}
          />
          <a
            href={`//${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pdf?locale=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.github}>
          <a
            href="https://github.com/natterstefan/react-pdf-i18n-next-example"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={30}
              height={30}
              src="/github.svg"
              alt="Open https://github.com/natterstefan/react-pdf-i18n-next-example"
            />
          </a>
        </div>

        <a
          href="https://twitter.com/natterstefan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created with 💛 by @natterstefan
        </a>
      </footer>
    </div>
  )
}
