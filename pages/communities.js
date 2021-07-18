import React from 'react'
import CommunitiesGrid from '../src/components/CommunitiesGrid'
import Box from '../src/components/Box'
import { useRouter } from 'next/router'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import { ProfileSidebar } from '../src/components/ProfileSidebar'

export default function Communities() {
  const router = useRouter()
  const { githubUser } = router.query

  const [comunidades, setComunidades] = React.useState([])

  React.useEffect(function () {
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
      } }`
      })
    }).then(async res => {
      const getCommunities = await res.json()
      const comunidade = getCommunities.data.allCommunities
      setComunidades(comunidade)
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
            <h1>Minhas Comunidades</h1>
            <span className='breadcrumb'>
              <a href='#' onClick={() => router.back()}>Início</a> &gt; Minhas comunidades
            </span>
            <div className='communitiesList'>
              <button className='active'>comunidades</button>
              <div className='menu'>
                <div>
                  mostrando <strong>1-{comunidades.length}</strong> de{' '}
                  <strong>{comunidades.length}</strong>
                </div>
                <div>
                  <a href='#'>primeira</a> | <a href='#'> &lt; anterior</a> |{' '}
                  <a href='#'>próxima &gt;</a> | <a href='#'>última</a>
                </div>
              </div>
              <ul>
                {comunidades.length > 0 &&
                  comunidades.map(community => {
                    return (
                      <li>
                        <div>
                          {community.imageUrl ? (
                            <img src={community.imageUrl} />
                          ) : (
                            <img src='https://picsum.photos/300' />
                          )}
                        </div>
                        <div>{community.title}</div>
                      </li>
                    )
                  })}
              </ul>
              <div className='menu'>
                <div>
                  mostrando <strong>1-{comunidades.length}</strong> de{' '}
                  <strong>{comunidades.length}</strong>
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
