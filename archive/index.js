// FIRST ATTEMPT getStaticProps pathsObject
export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const getDirectories = source => {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  }

  const pathsObject = {}
  const lineupsDir = path.join(process.cwd(), 'public', 'img', 'lineups')
  const agentDirList = getDirectories(lineupsDir)
  for (const agentDir of agentDirList) {
    pathsObject[agentDir] = {}
    const mapDirList = getDirectories(path.join(lineupsDir, agentDir))
    for (const mapDir of mapDirList) {
      pathsObject[agentDir][mapDir] = {}
      const attackDefendDirList = getDirectories(path.join(lineupsDir, agentDir, mapDir))
      for (const attackDefendDir of attackDefendDirList) {
        const imgList = fs.readdirSync(path.join(lineupsDir, agentDir, mapDir, attackDefendDir)).map((filename, idx) => {
          return path.join('img', 'lineups', agentDir, mapDir, attackDefendDir, filename)
        });
        pathsObject[agentDir][mapDir][attackDefendDir] = imgList
      }
    }
  }
  console.log("CORRECT")
  console.log(pathsObject)

  return {
    props: {
      pathsObject,
    },
  }
}