import { SiteClient } from 'datocms-client'

export default async function getCommunities(req, res) {
  if (req.method === 'POST') {
    const TOKEN = process.env.DATO_CMS
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
