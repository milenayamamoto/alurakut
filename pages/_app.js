import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    background: linear-gradient(rgba(61, 122, 204, 0.9), rgba(61, 122, 204, 0.9)), url(/static/images/pokemon-background.jpg);
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
	colors: {
		primary: '#0070f3',
	},
}

function shouldForwardProp(propName, target) {
	if (typeof target === 'string') {
		// For HTML elements, forward the prop if it is a valid HTML attribute
		return isPropValid(propName)
	}
	// For other elements, forward all props
	return true
}

export default function App({ Component, pageProps }) {
	return (
		<StyleSheetManager shouldForwardProp={shouldForwardProp}>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</StyleSheetManager>
	)
}
