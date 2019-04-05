import { Server } from 'http'
import { createTerminus } from '@godaddy/terminus'

function beforeShutdown(delay: number) {
  return () =>
    new Promise(resolve => {
      setTimeout(resolve, delay)
    })
}

interface IOptions {
  delayBeforeShutdown: number
}

const defaultOptions: IOptions = {
  delayBeforeShutdown: 5000,
}

export function configureTerminus(server: Server, options: Partial<IOptions>) {
  const parsedOptions = { ...defaultOptions, ...options }

  createTerminus(server, {
    beforeShutdown: beforeShutdown(parsedOptions.delayBeforeShutdown),
    healthChecks: {
      '/healthcheck': () => Promise.resolve(), // a promise returning function indicating service health
    },
  })
}
