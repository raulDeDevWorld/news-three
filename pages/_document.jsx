import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>   
                    <link rel="icon" href="h.png" />
                    <link rel='apple-touch-icon' href='/h.png' />
                    <link rel='manifest' href='/manifest.json' />
                    <meta name="theme-color" content="#007483" />
                    <meta name="msapplication-navbutton-color" content="#007483" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#007483" />
                    <meta name="description" content="Periódico HOY Bolivia" />
                    <meta name="keywords" content="Hoy" />
                    <meta name="author" content="Hoy" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}