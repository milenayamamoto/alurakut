import React from 'react'

export function CreateForm(props) {
  const { comunidades, scraps, onChangeCommunities, onChangeScraps } = props
  const [active, setActive] = React.useState('scrap')

  const handleChange = type => () => {
    setActive(type)
  }

  const handleCreateCommunity = event => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const comunidade = {
      title: formData.get('title'),
      imageUrl: formData.get('image')
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comunidade)
    }).then(async res => {
      const data = await res.json()
      const comunidade = data.registroCriado
      onChangeCommunities([...comunidades, comunidade])
    })
  }

  const handleCreateScrap = event => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const newScrap = {
      text: formData.get('scrap'),
      user: formData.get('user')
    }

    fetch('/api/scraps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newScrap)
    }).then(async res => {
      const data = await res.json()
      const newRegister = data.registroCriado
      onChangeScraps([...scraps, newRegister])
    })
  }

  return (
    <section className='actions'>
      <div className='actionButttons'>
        <button
          className={active === 'scrap' ? 'active' : 'actionsButton'}
          onClick={handleChange('scrap')}
        >
          deixar um scrap
        </button>
        <button
          className={active === 'community' ? 'active' : 'actionsButton'}
          onClick={handleChange('community')}
        >
          criar comunidade
        </button>
      </div>
      {active === 'scrap' ? (
        <div className='addBox'>
          <form onSubmit={handleCreateScrap}>
            <input
              name='scrap'
              placeholder='Qual mensagem você quer deixar?'
              aria-label='Qual mensagem você quer deixar?'
              type='text'
            />
            <input
              name='user'
              placeholder='Digite seu @github'
              aria-label='Digite seu @github'
              type='text'
            />
            <button className='orkutButton addScrap'>adicionar</button>
          </form>
        </div>
      ) : (
        <div className='addBox'>
          <form onSubmit={handleCreateCommunity}>
            <input
              name='title'
              placeholder='Qual vai ser o nome da sua comunidade?'
              aria-label='Qual vai ser o nome da sua comunidade?'
              type='text'
            />
            <input
              name='image'
              placeholder='Coloque uma URL para usarmos de capa'
              aria-label='Coloque uma URL para usarmos de capa'
            />
            <button className='orkutButton'>criar comunidade</button>
          </form>
        </div>
      )}
    </section>
  )
}
