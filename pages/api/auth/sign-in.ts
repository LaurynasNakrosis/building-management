import { NextApiRequest, NextApiResponse } from 'next'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body ?? {}
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (email !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  return res.status(200).json({ username: email })
}
