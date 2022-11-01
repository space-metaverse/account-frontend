import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from '@space-metaverse-ag/space-ui';
import Sidenav from '../layouts/sidenav';

function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ThemeProvider>
      <Sidenav />
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
}

export default App
