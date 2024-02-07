import { useState, useEffect } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { CreateForm } from '../src/components/CreateForm'
import { Scraps } from '../src/components/Scraps'
import { Relations } from '../src/components/Relations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { ProfileSidebar } from '../src/components/ProfileSidebar'
import { useRouter } from 'next/router'

export default function Home(props) {
	const { githubUser } = props

	const router = useRouter()

	const [comunidades, setComunidades] = useState([])
	const [pokemons, setPokemons] = useState([])
	const [scraps, setScraps] = useState([])

	const getCommunities = () => {
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				Authorization: '187143b7a807b4793b0a303090e947',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `query { allCommunities {
          id
          title
          imageUrl
        } }`,
			}),
		}).then(async (res) => {
			const getCommunities = await res.json()
			const comunidade = getCommunities.data.allCommunities
			setComunidades(comunidade)
		})
	}

	const getScraps = () => {
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				Authorization: '187143b7a807b4793b0a303090e947',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `query { allScraps {
            id
            text
            user
            createdAt
          } }`,
			}),
		}).then(async (res) => {
			const getScraps = await res.json()
			const scraps = getScraps.data.allScraps
			setScraps(scraps)
		})
	}

	const getPokemons = () => {
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				Authorization: '187143b7a807b4793b0a303090e947',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `query { allPokemons {
          id
          name
          imageUrl
        } }`,
			}),
		})
			.then((res) => res.json())
			.then((respostaCompleta) => {
				const data = respostaCompleta.data.allPokemons
				setPokemons(data)
			})
	}

	useEffect(function () {
		//Redirect to login page if there's no githubUser
		if (!githubUser.length > 0) return router.push('/login')

		getCommunities()
		getScraps()
		getPokemons()
	}, [])

	return (
		<>
			<AlurakutMenu githubUser={githubUser} />
			<MainGrid>
				<div className='profileArea' style={{ gridArea: 'profileArea' }}>
					<ProfileSidebar githubUser={githubUser} />
				</div>
				<div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
					<Box className='welcomeBox'>
						<h1 className='title'>Bem vindo(a), {githubUser}</h1>
						<CreateForm
							comunidades={comunidades}
							scraps={scraps}
							onChangeCommunities={setComunidades}
							onChangeScraps={setScraps}
							onGetCommunities={getCommunities}
							onGetScraps={getScraps}
						/>
						<hr style={{ marginTop: '16px' }} />
						<OrkutNostalgicIconSet
							recados={scraps.length}
							fotos={Math.floor(Math.random() * 10)}
							videos={Math.floor(Math.random() * 10)}
							fas={Math.floor(Math.random() * 10)}
						/>
						<hr style={{ marginBottom: '16px' }} />
						<div className='updates'>
							<div>
								<span>
									<b>Seus visitantes recentes: </b> nenhum
								</span>
								<span>
									<b>Sorte de hoje: </b> O melhor profeta do futuro é o passado.
								</span>
							</div>
							<img
								src='/static/images/ash-walking.gif'
								alt='ash andando com o pikachu'
							/>
						</div>
					</Box>
					<Box className='scrapsBox'>
						<Scraps scraps={scraps} />
					</Box>
				</div>
				<div
					className='profileRelationsArea'
					style={{ gridArea: 'profileRelationsArea' }}
				>
					<ProfileRelationsBoxWrapper>
						<Relations
							title='Pokémons'
							options={pokemons}
							githubUser={githubUser}
						/>
					</ProfileRelationsBoxWrapper>
					<ProfileRelationsBoxWrapper>
						<Relations
							title='Comunidades'
							options={comunidades}
							githubUser={githubUser}
						/>
					</ProfileRelationsBoxWrapper>
				</div>
			</MainGrid>
		</>
	)
}

export async function getServerSideProps(context) {
	const token = nookies.get(context)?.USER_TOKEN

	const { isAuthenticated } = await fetch(
		'https://alurakut.vercel.app/api/auth',
		{ headers: { Authorization: token } }
	).then((res) => res.json())

	if (!isAuthenticated) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const { githubUser } = jwt.decode(token)

	return {
		props: {
			githubUser,
		},
	}
}
