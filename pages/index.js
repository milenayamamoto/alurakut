import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(prop) {
  const { githubUser } = prop

  return (
    <Box as='aside'>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function Relations(props) {
  const { title, options } = props

  const renderRows = itemAtual => {
    switch (title) {
      case 'Comunidades':
        return (
          <span>
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

      case 'Pessoas da Comunidade':
        return (
          <a href={`/users/${itemAtual}`} key={itemAtual}>
            <img src={`https://github.com/${itemAtual}.png`} />
            <span>{itemAtual}</span>
          </a>
        )

      case 'Seguidores':
        return (
          <a href={`https://github.com/${itemAtual.login}`}>
            <img src={itemAtual.avatar_url} />
            <span>{itemAtual.login}</span>
          </a>
        )
    }
  }

  return (
    <>
      <h2 className='smallTitle'>
        {title} ({options.length})
      </h2>
      <ul>
        {options.slice(0, 6).map(itemAtual => {
          return <li key={itemAtual}>{renderRows(itemAtual)}</li>
        })}
      </ul>
    </>
  )
}

export default function Home() {
  const githubUser = 'milenayamamoto'
  const [comunidades, setComunidades] = React.useState([])
  const pessoasFavoritas = [
    'peas',
    'omariosouto',
    'marcobrunodev',
    'juunegreiros'
  ]

  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function () {
    //Get followers
    fetch('https://api.github.com/users/milenayamamoto/followers')
      .then(respostaDoServidor => respostaDoServidor.json())
      .then(respostaCompleta => setSeguidores(respostaCompleta))

    //APi GraphQL: Communities
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
    })
      .then(res => res.json())
      .then(respostaCompleta => {
        const data = respostaCompleta.data.allCommunities
        setComunidades(data)
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
            <h1 className='title'>Bem vindo(a)</h1>
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
            <Relations title='Seguidores' options={seguidores} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <Relations title='Comunidades' options={comunidades} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <Relations
              title='Pessoas da Comunidade'
              options={pessoasFavoritas}
            />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
