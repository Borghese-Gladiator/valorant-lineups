import fs from 'fs'
import path from 'path'

/**
 * Finds list of image paths given filter parameters agent, map, attackDefense
 * 
 * @param request
 * @param response
 * @returns {array} list of paths
 */ 
export default function handler(req, res) {
  const { agent, map, attackDefense } = req.query;
  const dirFilterRelativePath = path.join('img', 'lineups', agent, map, attackDefense);
  const dirAbsolutePath = path.resolve('./public', dirFilterRelativePath);
  const filenames = fs.readdirSync(dirAbsolutePath);
  const imagesList = filenames.map(name => (path.join("/", dirFilterRelativePath, name)).replace(/\\/g, '/'))

  res.statusCode = 200;
  res.json(imagesList);
}