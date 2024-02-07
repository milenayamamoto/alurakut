import { useState, useEffect } from 'react'
import CommunitiesGrid from '../src/components/CommunitiesGrid'
import Box from '../src/components/Box'
import { useRouter } from 'next/router'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import { ProfileSidebar } from '../src/components/ProfileSidebar'

export default function Pokemon() {
	const router = useRouter()
	const { githubUser } = router.query

	const [pokemons, setPokemons] = useState([])

	useEffect(function () {
		//Get Pokemons
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
	}, [])

	return (
		<>
			<AlurakutMenu githubUser={githubUser} />
			<CommunitiesGrid>
				<div className='profileArea' style={{ gridArea: 'profileArea' }}>
					<ProfileSidebar githubUser={githubUser} />
				</div>
				<div>
					<Box className='communitiesBox'>
						<h1>Meus pokémons</h1>
						<span className='breadcrumb'>
							<a href='#' onClick={() => router.back()}>
								Início
							</a>{' '}
							&gt; Meus pokémons
						</span>
						<div className='communitiesList'>
							<button className='active'>pokémon</button>
							<div className='menu'>
								<div>
									mostrando <strong>1-{pokemons.length}</strong> de{' '}
									<strong>{pokemons.length}</strong>
								</div>
								<div>
									<a href='#'>primeira</a> | <a href='#'> &lt; anterior</a> |{' '}
									<a href='#'>próxima &gt;</a> | <a href='#'>última</a>
								</div>
							</div>
							<ul>
								{pokemons.length > 0 &&
									pokemons.map((pokemon, index) => {
										return (
											<li key={index}>
												<div>
													{pokemon.imageUrl ? (
														<img src={pokemon.imageUrl} />
													) : (
														<img src='https://picsum.photos/300' />
													)}
												</div>
												<div className='communityTitle'>{pokemon.name}</div>
											</li>
										)
									})}
							</ul>
							<div className='menu'>
								<div>
									mostrando <strong>1-{pokemons.length}</strong> de{' '}
									<strong>{pokemons.length}</strong>
								</div>
								<div>
									<a href='#'>primeira</a> | <a href='#'> &lt; anterior</a> |{' '}
									<a href='#'>próxima &gt;</a> | <a href='#'>última</a>
								</div>
							</div>
						</div>
					</Box>
				</div>
			</CommunitiesGrid>
		</>
	)
}
