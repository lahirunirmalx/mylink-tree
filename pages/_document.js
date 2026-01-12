import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="light-mode">
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function() {
                                    var storageKey = 'darkMode';
                                    var classNameDark = 'dark-mode';
                                    var classNameLight = 'light-mode';
                                    function setClassOnDocumentBody(darkMode) {
                                        document.body.classList.add(darkMode ? classNameDark : classNameLight);
                                        document.body.classList.remove(darkMode ? classNameLight : classNameDark);
                                    }
                                    var preferDarkQuery = '(prefers-color-scheme: dark)';
                                    var mql = window.matchMedia(preferDarkQuery);
                                    var supportsColorSchemeQuery = mql.media === preferDarkQuery;
                                    var localStorageTheme = null;
                                    try { localStorageTheme = localStorage.getItem(storageKey); } catch (err) {}
                                    var localStorageExists = localStorageTheme !== null;
                                    if (localStorageExists) { localStorageTheme = JSON.parse(localStorageTheme); }
                                    if (localStorageExists) {
                                        setClassOnDocumentBody(localStorageTheme);
                                    } else if (supportsColorSchemeQuery) {
                                        setClassOnDocumentBody(mql.matches);
                                    }
                                })();
                            `,
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
