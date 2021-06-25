/* eslint-disable no-console */
import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  Page,
  renderToStream,
  Text,
  StyleSheet,
  View,
  Document,
} from '@react-pdf/renderer'

import { IntlProvider, useIntl, useTranslations } from 'use-intl'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const App = () => {
  const t = useTranslations('App')
  // const intl = useIntl();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{t('hello')}</Text>
        </View>
        <View style={styles.section}>
          <Text>{t('bye')}</Text>
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
      hello: 'Guten Tag',
      bye: 'Tschüss',
    },
  },
  en: {
    App: {
      hello: 'Good Day',
      bye: 'Bye',
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
          <App />
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
