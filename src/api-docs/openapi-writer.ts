import fs from 'node:fs'
import path from 'node:path'
import { stringify } from 'yaml'
import { openApiDoc } from './openapi-generator'

// Generate OpenAPI docs with Zod

// convert OpenAPI document to YAML
const yamlDoc = stringify(openApiDoc)

const scriptDir = path.resolve(__dirname)

// write the yaml file
fs.writeFileSync(`${scriptDir}/openapi.yaml`, yamlDoc)

console.log('OpenAPI document generated IN  YAML format.')

// Json version
const jsonDoc = JSON.stringify(openApiDoc, null, 2)

// write tge json file
fs.writeFileSync(`${scriptDir}/openapi.json`, jsonDoc)

console.log('OpenAPI document generated in JSON format.')
