import type { NextApiRequest, NextApiResponse } from 'next'

// Estado inicial padrão (mock)
let gameState = {
  pause: false,
  t: 0,
  State: "menuView",
  ambient: [],
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Retorna o estado atual do jogo
    return res.status(200).json(gameState)
  }

  if (req.method === 'POST') {
    // Recebe novo estado do jogo
    const { pause, t, State, ambient } = req.body
    gameState = { pause, t, State, ambient }
    return res.status(200).json({ message: 'Estado atualizado', gameState })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}