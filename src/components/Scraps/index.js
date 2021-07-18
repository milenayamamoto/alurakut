import React from 'react'

export function Scraps() {
  const [scraps, setScraps] = React.useState([])

  React.useEffect(function () {
    //Get Scraps
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '187143b7a807b4793b0a303090e947',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query { allScraps {
            id
            text
            user
            createdAt
          } }`
      })
    }).then(async res => {
      const getScraps = await res.json()
      const scraps = getScraps.data.allScraps
      setScraps(scraps)
    })
  }, [])

  return (
    <section className='actions'>
      <h1>Scraps</h1>
      <ul>
        {scraps.length > 0 &&
          scraps.map(scrap => {
            return (
              <li>
                <div>
                  <img src={`http://github.com/${scrap.user}.png`} />
                </div>
                <div className='scrapInfo'>
                  <div className='scrapCreated'>
                    <h2>
                      <a
                        href={`https://github.com/${scrap.user}`}
                        target='_blank'
                      >
                        {scrap.user}
                      </a>
                    </h2>
                    <small>
                      {scrap.createdAt.split('T')[0]} -{' '}
                      {scrap.createdAt.split('T')[1].replace('Z', '')}
                    </small>
                  </div>
                  <div className='scrapText'>{scrap.text}</div>
                </div>
              </li>
            )
          })}
      </ul>
    </section>
  )
}
