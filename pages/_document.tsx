import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preload"
                        href="/assets/fonts/tempestapacheexpandital.ttf"
                        as="font"
                        type="font/truetype"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/tempestapacheexpandital.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/tempestapacheexpandital.svg"
                        as="font"
                        type="font/svg"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/tempestapacheexpandital.eot"
                        as="font"
                        type="font/eot"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument