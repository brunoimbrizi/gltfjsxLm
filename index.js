#!/usr/bin/env node

const version = require('./package.json').version
const gltfjsxlm = require('./gltfjsxlm')
const argv = require('yargs')
  .boolean('animation')
  .boolean('draco')
  .option('draco', { alias: 'd', describe: 'Adds draco-Loader', type: 'boolean' })
  .option('types', { alias: 't', describe: 'Adds Typescript definitions', type: 'boolean' })
  .option('animation', { alias: 'a', describe: 'Extracts animation clips', type: 'boolean' })
  .option('compress', { alias: 'c', default: true, describe: 'Removes names and empty groups', type: 'boolean' })
  .option('precision', { alias: 'p', default: 2, describe: 'Number of fractional digits', type: 'number' })
  .option('binary', { alias: 'b', describe: 'Draco path', default: '/draco-gltf/', type: 'string' })
  .usage('npx gltfjsx model.gltf [Model.js] [options] [publicPath]')
  .help().argv

if (argv._[0]) {
  let path = argv._[1].toString()
  let file = argv._[0]
  let nameExt = file.match(/[-_\w]+[.][\w]+$/i)[0]
  let name = nameExt.split('.').slice(0, -1).join('.')
  let output = argv._[2] || name.charAt(0).toUpperCase() + name.slice(1) + (argv.types ? '.tsx' : '.js')

  console.log(`gltfjsxlm ${version}, converting ${file} to ${output} nameExt ${nameExt}`)
  console.log('')
  gltfjsxlm(file, nameExt, path, output, argv)
    .then(() => console.log('\ndone.'))
    .catch((err) => console.log('\nfailed.\n\n', err))
} else {
  console.log('missing the input filename. type: gltfjsx --help')
}
