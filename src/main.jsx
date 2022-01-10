import { render } from 'preact'
import { App, GlobalStyle } from './app'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Room } from './pages/Room'
import { ReducerProvider, SocketProvider } from './context/socket'
import { CardsProvider } from './context/cards'
import { Toaster } from 'react-hot-toast'
import CreateRoom from './pages/CreateRoom/CreateRoom'
import Admin from './pages/Admin/Admin'

render(
	<SocketProvider>
		<CardsProvider>
			<ReducerProvider>
				<GlobalStyle />
				<Toaster
					toastOptions={{
						duration: 3000,
						className: 'toast',
						icon: '🔥',
						style: {
							padding: '16px',
							color: '#FFF',
							backgroundColor: 'var(--primary-600)',
						},
					}}
				/>
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<App />} />
						<Route
							path="/admin/create-room"
							element={<CreateRoom />}
						/>
						<Route path="rooms" element={<Room />} />
						<Route path="admin" element={<Admin />} />
						<Route
							path="*"
							element={
								<main
									style={{
										padding: '1rem',
										fontSize: '4rem',
									}}
								>
									<p>
										<strong>404 Not Found</strong> | There's
										nothing here!
									</p>
								</main>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ReducerProvider>
		</CardsProvider>
	</SocketProvider>,
	document.getElementById('app')
)
