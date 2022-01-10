import styled, { createGlobalStyle } from 'styled-components'
import { EnterRoom } from './components/EnterRoom'
import ThemeColors from './themeColors'
import AnimatedHomeSvg from './components/AnimatedHomeSvg'
import GithubIcon from './assets/github.svg'

export const GlobalStyle = createGlobalStyle`
*{
	padding:0 ;
	margin:0;
	box-sizing: border-box;
}

body {
	height: 100%;
	background: linear-gradient(to right, var(--primary-50), var(--primary-200));
	font-family: 'Montserrat', sans-serif;
	color: var(--primary-300);

}

html{
font-size: 62.5%;
--tap-area-height: 48px;
--shadow-color:  0deg 0% 0%;
--shadow-elevation-low:
  0px 0.8px 0.9px hsl(var(--shadow-color) / 0.34),
  0px 1.3px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
  0px 3px 3.4px -2.5px hsl(var(--shadow-color) / 0.34);
--shadow-elevation-medium:
  0px 0.8px 0.9px hsl(var(--shadow-color) / 0.36),
  0px 2.5px 2.8px -0.8px hsl(var(--shadow-color) / 0.36),
  0px 6.2px 7px -1.7px hsl(var(--shadow-color) / 0.36),
  0px 15.2px 17.1px -2.5px hsl(var(--shadow-color) / 0.36);
--shadow-elevation-high:
  0px 0.8px 0.9px hsl(var(--shadow-color) / 0.34),
  0px 4.4px 5px -0.4px hsl(var(--shadow-color) / 0.34),
  0px 8.3px 9.3px -0.7px hsl(var(--shadow-color) / 0.34),
  0px 13.6px 15.3px -1.1px hsl(var(--shadow-color) / 0.34),
  -0.1px 21.7px 24.4px -1.4px hsl(var(--shadow-color) / 0.34),
  -0.1px 33.9px 38.1px -1.8px hsl(var(--shadow-color) / 0.34),
  -0.1px 51.5px 57.9px -2.1px hsl(var(--shadow-color) / 0.34),
  -0.2px 75.9px 85.4px -2.5px hsl(var(--shadow-color) / 0.34);

	
	--primary-50: ${ThemeColors.primary[50]};
	--primary-100: ${ThemeColors.primary[100]};
	--primary-200: ${ThemeColors.primary[200]};
	--primary-300: ${ThemeColors.primary[300]};
	--primary-400: ${ThemeColors.primary[400]};
	--primary-500: ${ThemeColors.primary[500]};
	--primary-600: ${ThemeColors.primary[600]};
	--primary-700: ${ThemeColors.primary[700]};
	--primary-800: ${ThemeColors.primary[800]};
	--primary-900: ${ThemeColors.primary[900]};
	--secondary-50: ${ThemeColors.secondary[50]};
	--secondary-100: ${ThemeColors.secondary[100]};
	--secondary-200: ${ThemeColors.secondary[200]};
	--secondary-300: ${ThemeColors.secondary[300]};
	--secondary-400: ${ThemeColors.secondary[400]};
	--secondary-500: ${ThemeColors.secondary[500]};
	--secondary-600: ${ThemeColors.secondary[600]};
	--secondary-700: ${ThemeColors.secondary[700]};
	--secondary-800: ${ThemeColors.secondary[800]};
	--secondary-900: ${ThemeColors.secondary[900]};
	
}

body{
	overflow: hidden;
	min-height: 100vh;
	line-height: 1.5;
	width: 100%;
	padding: 0;
	margin: 0;
	font-weight: 400;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

input, button, textarea, select {
font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
overflow-wrap: break-word;
}
`
const Container = styled.div`
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	place-items: center;

	grid-template-areas: 'area1		area2';

	.area1 {
		grid-area: area-1;
	}

	.area2 {
		grid-area: area-2;
	}
`

const Footer = styled.div`
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 400px;
	z-index: 1;
	background-image: url('../dist/assets/wave.svg');
	background-size: cover;
	background-position: center center;
`

export function App() {
	const LeftSide = styled.div`
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		font-size: 1.6rem;
		color: var(--primary-800);
	`
	return (
		<>
			<Container>
				<LeftSide>
					<h1>Votar suas tarefas do agile nunca foi tão fácil!</h1>
					<AnimatedHomeSvg style={{ width: '800px' }} />
				</LeftSide>
				<EnterRoom />
			</Container>
			<Footer />
			<GithubBadge>
				<a href='https://github.com/LucasGabrielBecker?tab=repositories&q=plan-poker'>
					<img src={GithubIcon} alt='github Icon' />
					Projeto em construção
				</a>
			</GithubBadge>
		</>
	)
}

const GithubBadge = styled.div`
	position: absolute;
	bottom: 10px;
	left: 10px;
	transform: rotate(10deg, 10deg, 10deg);

	color: var(--primary-900);
	z-index: 889999;
	cursor: pointer;
	a,
	a:visited {
		text-decoration: none;
		color: inherit;
	}

	a {
		display: grid;
		place-items: center;
	}

	img {
		height: 30px;
	}

	&:hover img {
		transform: translateY(-10px);
		transition: transform 600ms;
	}
`
