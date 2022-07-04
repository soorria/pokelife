import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  Show,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import CogIcon from '~icons/heroicons-outline/cog'
import XIcon from '~icons/heroicons-outline/x'
import PlayIcon from '~icons/heroicons-outline/play'
import PauseIcon from '~icons/heroicons-outline/pause'
import ChevronDoubleRightIcon from '~icons/heroicons-outline/chevron-double-right'
import EyeIcon from '~icons/heroicons-outline/eye'
import EyeOffIcon from '~icons/heroicons-outline/eye-off'
import RefreshIcon from '~icons/heroicons-outline/refresh'
import InfoIcon from '~icons/heroicons-outline/information-circle'
import ToolbarButton from './components/ToolbarButton'

import {
  colorTheme,
  randomState,
  pokelifeWorker,
  useCanvasSize,
} from './lib/pokelife'
import { dbg, rafLoopAsync, toggle } from './utils/misc'

const App: Component = () => {
  const [options, setOptions] = createStore({
    running: true,
    toolbarVisible: true,
    size: 8,
  })
  const [settingsOpen, setSettingsOpen] = createSignal(false)
  const [infoOpen, setInfoOpen] = createSignal(false)
  const canvasSize = useCanvasSize(() => options.size)

  const canvas = (
    <canvas
      tabIndex={-1}
      class="mx-auto"
      width={dbg(canvasSize.width, 'width')}
      height={dbg(canvasSize.height, 'height')}
    />
  ) as HTMLCanvasElement

  const ctx = canvas.getContext('2d', { alpha: true })!

  let state = randomState(canvasSize.cols, canvasSize.rows)
  let wasReset = false

  const reset = () => {
    state = randomState(canvasSize.cols, canvasSize.rows)
    wasReset = true
    render()
  }

  const step = async (force = false) => {
    const next = await pokelifeWorker.nextState(state)
    if (wasReset) {
      wasReset = false
      return
    }
    state = next
    if (force || options.running) {
      render()
    }
  }

  const render = () => {
    const size = options.size
    state.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = colorTheme[cell]
        ctx.fillRect(j * size, i * size, size, size)
      })
    })
  }

  createEffect(() => {
    if (!options.running) {
      return
    }

    const cancel = rafLoopAsync(() => step())
    onCleanup(() => cancel())
  })

  return (
    <div class="grid h-full place-items-center overflow-hidden">
      {canvas}
      <Show
        when={
          new URL(location.href).searchParams.get('embed') !== 'true' && false
        }
      >
        <div
          class="fixed inset-x-0 bottom-0 flex space-x-4 bg-base-100/50 p-4 transition-opacity"
          classList={{
            'opacity-0 hocus-within:opacity-100': !options.toolbarVisible,
          }}
        >
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => setSettingsOpen(toggle)}
            aria-label={settingsOpen() ? 'Close Settings' : 'Open Settings'}
          >
            <CogIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[180deg] opacity-0': settingsOpen(),
              }}
            />
            <XIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[-180deg] opacity-0': !settingsOpen(),
              }}
            />
          </ToolbarButton>
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => setInfoOpen(toggle)}
            aria-label={'Randomise State'}
          >
            <InfoIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[180deg] opacity-0': infoOpen(),
              }}
            />
            <XIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[-180deg] opacity-0': !infoOpen(),
              }}
            />
          </ToolbarButton>
          <div class="flex-1" />
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => reset()}
            aria-label={'Randomise State'}
          >
            <RefreshIcon class="col-span-full row-start-1 h-6 w-6 transition" />
          </ToolbarButton>
          <ToolbarButton
            class="grid place-items-center"
            disabled={options.running}
            onClick={() => step(true)}
            aria-label={'Next Step'}
          >
            <ChevronDoubleRightIcon class="col-span-full row-start-1 h-6 w-6 transition" />
          </ToolbarButton>
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => setOptions('running', toggle)}
            aria-label={options.running ? 'Pause Automaton' : 'Play Automaton'}
          >
            <PlayIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'opacity-0': options.running,
              }}
            />
            <PauseIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'opacity-0': !options.running,
              }}
            />
          </ToolbarButton>
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => {
              if (options.toolbarVisible) {
                canvas.focus({ preventScroll: true })
              }
              setOptions('toolbarVisible', toggle)
            }}
            aria-label={options.running ? 'Hide Toolbar' : 'Show Toolbar'}
          >
            <EyeIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'opacity-0': options.toolbarVisible,
              }}
            />
            <EyeOffIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'opacity-0': !options.toolbarVisible,
              }}
            />
          </ToolbarButton>
        </div>
      </Show>
    </div>
  )
}

export default App
