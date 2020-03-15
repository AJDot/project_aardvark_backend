import { Hash } from '@/interfaces/basic'

type TProcess = 'Tracking'

interface IDebugHelper {
  state: Hash<Boolean>

  start (process: TProcess): void

  stop (process: TProcess): void

  log (process: TProcess, ...messages: string[]): void
}

export const DebugHelper: IDebugHelper = {
  state: {},
  start (process: TProcess) {
    this.state[process] = true
  },
  stop (process: TProcess) {
    this.state[process] = false
  },
  log (process: TProcess, ...messages: string[]) {
    if (this.state[process]) {
      console.log(
        `%c[${process}]`,
        'color: blue; font-weight: bold',
        ...messages,
      )
    }
  },
}
