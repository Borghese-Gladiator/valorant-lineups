import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const { agent, map, attackDefense } = req.query;
  const dirFilterRelativePath = path.join('img', 'lineups', agent, map, attackDefense);
  const dirAbsolutePath = path.resolve('./public', dirFilterRelativePath);
  const filenames = fs.readdirSync(dirAbsolutePath);
  const imagesList = filenames.map(name => (path.join(dirFilterRelativePath, name)).replace(/\\/g, '/'))

  res.statusCode = 200;
  res.json(imagesList);
}

/*
// pathfinder enables me to find all the images in a directory 
import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

/**
 * Finds list of image paths given filter parameters agent, map, attackDefense
 * 
 * @param request
 * @param response
 * @returns {array} list of paths
 
export default function handler(req, res) {
  const { agent, map, attackDefense } = req.body;
  console.log(req.body);
  const absoluteDirPath = serverPath(path.join("public", "img", "lineups", agent, map, attackDefense));
  console.log(absoluteDirPath);
  const pathsList = fs.readdirSync(absoluteDirPath);
  const clientPathsList = pathsList.map((val, idx) => {
    console.log(val);
    return val;
  })
  res.status(200).json({ pathsList: clientPathsList })
}
*/

/*
const a = {
  "viper": {
    "ascent": {
      "attack": [],
      "defense": []
    }
  }
}
*/