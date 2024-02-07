import { SiteClient } from 'datocms-client'

export default async function getCommunities(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '2cc01ee5671837d59aeee6c8e2d51b'
    const client = new SiteClient(TOKEN)

    const newRecord = await client.items.create({
      itemType: '972982', // model ID
      ...req.body
    })

    res.json({
      dados: 'Algum dado qualquer',
      registroCriado: newRecord
    })

    return
  }

  res.status(404).json({
    message: 'No GET'
  })
}
