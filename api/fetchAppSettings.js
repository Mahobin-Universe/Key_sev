import { KeyAuth } from '../../keyauth.js';

const keyauth = new KeyAuth(process.env.APP_NAME, process.env.OWNER_ID, process.env.APP_VERSION);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const result = await keyauth.fetchAppSettings();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
