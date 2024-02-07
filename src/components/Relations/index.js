import Link from 'next/link'

export function Relations(props) {
  const { title, options, githubUser } = props

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

  return <>
    <h2 className='smallTitle'>
      {title} <a href='#'>({options?.length})</a>
    </h2>
    <ul>
      {options.slice(0, 6).map((itemAtual,index) => {
        return <li key={index}>{renderRows(itemAtual)}</li>
      })}
    </ul>
    <Link
      href={{
        pathname: title === 'Comunidades' ? '/communities' : '/pokemon',
        query: { githubUser }
      }}
      legacyBehavior>
      <span className='seeMore'>ver todos</span>
    </Link>
  </>;
}
