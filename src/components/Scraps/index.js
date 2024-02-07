export function Scraps(props) {
	const { scraps } = props

	return (
		<section className='actions'>
			<h1>Scraps</h1>
			<ul>
				{scraps.length > 0 &&
					scraps.map((scrap, index) => {
						return (
							<li key={index}>
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
