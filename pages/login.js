import { useState } from 'react'
// Hook do NextJS
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function LoginScreen() {
	const router = useRouter()
	const [githubUser, setGithubUser] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('https://alurakut.vercel.app/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ githubUser: githubUser }),
		}).then(async (res) => {
			const data = await res.json()
			const token = data.token

			nookies.set(null, 'USER_TOKEN', token, {
				path: '/',
				maxAge: 86400 * 7,
			})
			router.push('/')
		})
	}

	const handleChange = (event) => {
		const { value } = event.target
		setGithubUser(value)
	}

	return (
		<main
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				className='loginScreen'
				style={{
					position: 'relative',
				}}
			>
				<img
					src='/static/images/pikachu.png'
					alt='pikachu'
					style={{
						position: 'absolute',
						top: '10px',
						left: '40px',
						width: '15%',
						zIndex: 1,
					}}
				/>
				<section className='logoArea'>
					<img src='https://alurakut.vercel.app/logo.svg' />
					<p>
						<strong>Conecte-se</strong> aos seus amigos e familiares usando
						recados e mensagens instantâneas
					</p>
					<p>
						<strong>Conheça</strong> novas pessoas através de amigos de seus
						amigos e comunidades
					</p>
					<p>
						<strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
						lugar
					</p>
					<span
						style={{
							fontSize: '12px',
							color: 'var(--colorQuarternary)',
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<strong>Edição</strong>
						<img
							src='/static/images/pokemon-logo.png'
							alt='logo pokemon'
							style={{
								marginBottom: 0,
							}}
						/>
					</span>
				</section>
				<section className='formArea'>
					<form className='box' onSubmit={handleSubmit}>
						<p>
							Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
						</p>
						<input
							placeholder='Usuário'
							value={githubUser}
							onChange={handleChange}
							className='input-user'
						/>
						{githubUser.length === 0 ? (
							<span className='error'>Preencha o campo</span>
						) : (
							''
						)}
						<button type='submit'>Login</button>
					</form>

					<footer className='box'>
						<p>
							Ainda não é membro? <br />
							<a href='/login'>
								<strong>ENTRAR JÁ</strong>
							</a>
						</p>
					</footer>
				</section>
				<footer className='footerArea'>
					<p>
						© 2021 - <a href='/'>Sobre o Orkut.br</a> -{' '}
						<a href='/'>Centro de segurança</a> - <a href='/'>Privacidade</a> -{' '}
						<a href='/'>Termos</a> - <a href='/'>Contato</a>
					</p>
				</footer>
			</div>
		</main>
	)
}
