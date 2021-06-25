/* eslint-disable no-console */
import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  Document,
  Page,
  renderToStream,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import { IntlProvider, useTranslations } from 'use-intl'

const styles = StyleSheet.create({
  page: {
    padding: 24,
  },
  section: {
    flexDirection: 'row',
    padding: '24px 0',
  },
  title: {
    fontSize: 24,
  },
})

interface IProps {
  locale: string
}

const App = ({ locale }: IProps) => {
  const t = useTranslations('App')

  return (
    <Document
      title="react-pdf with use-intl"
      subject="react-pdf with use-intl"
      author="Stefan Natter (@natterstefan)"
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, styles.title]}>
          <Text>{t('title')}</Text>
        </View>
        <View style={styles.section}>
          <Text>
            {t('hello')} - {t('bye')}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// You can get the messages from anywhere you like. You can also fetch
// them from within a component and then render the provider along with
// your app once you have the messages.
const messages = {
  de: {
    App: {
      title: 'react-pdf mit useIntl',
      hello: 'Hallo',
      bye: 'Tschüss',
    },
  },
  en: {
    App: {
      title: 'react-pdf with useIntl',
      hello: 'Hello',
      bye: 'Goodbye',
    },
  },
}

export default async function offerPdf(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { locale } = req.query

  if (!locale || (locale !== 'de' && locale !== 'en')) {
    res.status(400).end('Locale parameter must be set to either "de" or "en"')
  } else {
    try {
      const pdfStream = await renderToStream(
        <IntlProvider messages={messages[locale]} locale="en">
          <App locale={locale} />
        </IntlProvider>,
      )

      res.setHeader('Content-Type', 'application/pdf')
      pdfStream.pipe(res)
      pdfStream.on('end', () => console.log('Done streaming, response sent.'))
    } catch (error) {
      console.log('\n', error)
      res.status(error.status || 400).end(error.message)
    }
  }
}
