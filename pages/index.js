import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { ProfileSidebar } from '../src/components/ProfileSidebar'
import { useRouter } from 'next/router'

function Relations(props) {
  const { title, options } = props

  const renderRows = itemAtual => {
    switch (title) {
      case 'Comunidades':
        return (
          <span>
            {/* If imageUrl is empty, provides a random image */}
            <a href={itemAtual.id} key={itemAtual}>
              {itemAtual.imageUrl ? (
                <img src={itemAtual.imageUrl} />
              ) : (
                <img src='https://picsum.photos/300' />
              )}
              <span>{itemAtual.title}</span>
            </a>
          </span>
        )

      case 'Pokémons':
        return (
          <a href={`/pokemon/${itemAtual.id}`} key={itemAtual.id}>
            <img src={itemAtual.imageUrl} />
            <span>{itemAtual.name}</span>
          </a>
        )
    }
  }

  return (
    <>
      <h2 className='smallTitle'>
        {title} <a href='#'>({options?.length})</a>
      </h2>
      <ul>
        {options.slice(0, 6).map(itemAtual => {
          return <li key={itemAtual}>{renderRows(itemAtual)}</li>
        })}
      </ul>
      <a href='#' className='seeMore'>
        ver todos
      </a>
    </>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser

  const router = useRouter()

  const [comunidades, setComunidades] = React.useState([])
  const [pokemons, setPokemons] = React.useState([])

  React.useEffect(function () {
    //Redirect to login page if there's no githubUser
    if (!githubUser.length > 0) return router.push('/login')

    //Get Communities
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '187143b7a807b4793b0a303090e947',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query { allCommunities {
        id
        title
        imageUrl
        creatorSlug
      } }`
      })
    }).then(async res => {
      const getCommunities = await res.json()
      const comunidade = getCommunities.data.allCommunities
      setComunidades(comunidade)
    })

    //Get Pokemons
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '187143b7a807b4793b0a303090e947',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query { allPokemons {
          id
          name
          imageUrl
        } }`
      })
    })
      .then(res => res.json())
      .then(respostaCompleta => {
        const data = respostaCompleta.data.allPokemons
        setPokemons(data)
      })
  }, [])

  const handleCreateCommunity = event => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const comunidade = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comunidade)
    }).then(async res => {
      const data = await res.json()
      const comunidade = data.registroCriado
      setComunidades([...comunidades, comunidade])
    })
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  name='title'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input
                  name='image'
                  placeholder='Coloque uma URL para usarmos de capa'
                  aria-label='Coloque uma URL para usarmos de capa'
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className='profileRelationsArea'
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <Relations title='Pokémons' options={pokemons} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <Relations title='Comunidades' options={comunidades} />
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
  ).then(res => res.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser
    }
  }
}
