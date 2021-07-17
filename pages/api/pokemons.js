import { SiteClient } from 'datocms-client'

export default async function getPokemons(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '2cc01ee5671837d59aeee6c8e2d51b'
    const client = new SiteClient(TOKEN)

    const newRecord = await client.items.create({
      itemType: '975899', // model ID
      ...req.body
    })

    res.json({
      newInput: newRecord
    })

    return
  }

  res.status(404).json({
    message: 'No GET'
  })
}
