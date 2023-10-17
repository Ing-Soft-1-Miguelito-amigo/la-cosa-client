import {sertupServer} from 'msw/node'
import {handlers} from './handlers'

export const worker = setupWorker(...handlers)

