import { KeyAuth } from '../../keyauth.js';

const keyauth = new KeyAuth(process.env.APP_NAME, process.env.OWNER_ID, process.env.APP_VERSION);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { username, password, key, email, token } = req.body;

  try {
    const result = await keyauth.register(username, password, key, email || '', token || '');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
