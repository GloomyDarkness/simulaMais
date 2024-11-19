import '../styles/globals.css';  // Base styles primeiro
import '../public/css/navbar.css';  // Componentes específicos depois
import '../public/css/carousel.css';
import '../public/css/scrollbar.css';
import '../public/css/styles.css';  // Estilos específicos por último

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;