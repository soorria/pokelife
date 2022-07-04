import {
  Component,
  createEffect,
  createSignal,
  For,
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
  allTypes,
  colorTheme,
  pokelifeWorker,
  PokemonType,
  State,
  typeNameMap,
  typeNameMapReverse,
  useCanvasSize,
} from './lib/pokelife'
import { rafLoopAsync, toggle } from './utils/misc'
import Dialog, {
  DialogActions,
  DialogBox,
  DialogCloseAction,
  DialogDescription,
  DialogHeading,
  useDialog,
} from './components/Dialog'
import RangeSlider from './components/RangeSlider'
import ExternalLink from './components/ExternalLink'

const App: Component = () => {
  const getInitialOptionsFromSearchParams = () => {
    const params = new URL(location.href).searchParams
    const result = {
      running: true,
      toolbarVisible: true,
      size: 16,
      isEmbed: false,
      delay: 100,
      allowedTypes: [...allTypes],
    }

    if (params.has('embed') && params.get('embed') !== 'false') {
      result.isEmbed = true
    }

    if (params.has('size')) {
      const maybeNumber = parseInt(params.get('size') ?? '')
      if (Number.isSafeInteger(maybeNumber)) {
        result.size = maybeNumber
      }
    }

    if (params.has('delay')) {
      const maybeNumber = parseInt(params.get('delay') ?? '')
      if (Number.isSafeInteger(maybeNumber)) {
        result.delay = maybeNumber
      }
    }

    const maybeAllowedTypes = params
      .getAll('types')
      .flatMap(typesStr => typesStr.split(','))
      .map(maybeTypeName => typeNameMapReverse[maybeTypeName])
      .filter(Boolean) as PokemonType[]
    if (maybeAllowedTypes.length) {
      result.allowedTypes = maybeAllowedTypes
    }

    return result
  }

  const syncOptionsToUrl = () => {
    const { size, delay, allowedTypes: _types } = options
    const params = new URLSearchParams({
      size: size.toString(),
      delay: delay.toString(),
      types: _types.map(t => typeNameMap[t]).join(','),
    })
    history.replaceState('', '', `?${params}`)
  }

  const [options, setOptions] = createStore(getInitialOptionsFromSearchParams())

  createEffect(() => syncOptionsToUrl())

  const settingsDialog = useDialog({ id: 'settings' })
  const infoDialog = useDialog({ id: 'info' })
  const canvasSize = useCanvasSize(() => options.size)

  const canvas = (
    <canvas
      tabIndex={-1}
      class="mx-auto"
      width={canvasSize.width}
      height={canvasSize.height}
    />
  ) as HTMLCanvasElement

  const ctx = canvas.getContext('2d', { alpha: true })!

  const [ready, setReady] = createSignal(false)
  let state: State = []

  const init = async () => {
    await Promise.all([
      pokelifeWorker
        .randomState(canvasSize.cols, canvasSize.rows)
        .then(random => {
          state = random
        }),
      pokelifeWorker.setAllowedTypes([...options.allowedTypes]),
    ])
    setReady(true)
  }
  init()

  let wasManuallyUpdated = false

  const reset = async () => {
    state = await pokelifeWorker.randomState(canvasSize.cols, canvasSize.rows)
    wasManuallyUpdated = true
    render()
  }

  let stepping = false
  const step = async (force = false) => {
    if (!ready() || stepping) return
    stepping = true
    const start = Date.now()
    const next = await pokelifeWorker.nextState(state)
    // console.log('step took', Date.now() - start)
    if (!wasManuallyUpdated) {
      state = next
      if (force || options.running) {
        render()
      }
    }
    wasManuallyUpdated = false
    stepping = false
  }

  const render = () => {
    const size = options.size
    const start = Date.now()
    state.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = colorTheme[cell]
        ctx.fillRect(j * size, i * size, size, size)
      })
    })
    // console.log('render took', Date.now() - start)
  }

  createEffect(() => {
    pokelifeWorker
      .resizeState(state, canvasSize.rows, canvasSize.cols)
      .then(resized => (state = resized))
  })

  createEffect(() => {
    if (!options.running || !ready()) {
      return
    }

    const cancel = rafLoopAsync(() => step(), options.delay)
    onCleanup(() => cancel())
  })

  return (
    <div class="grid h-full place-items-center overflow-hidden">
      <Show
        when={ready()}
        fallback={
          <div
            class="radial-progress animate-spin text-primary"
            style="--value:75"
          />
        }
      >
        {canvas}
      </Show>
      <Show when={!options.isEmbed}>
        <div
          class="fixed inset-x-0 bottom-0 flex space-x-4 bg-base-100/50 p-4 transition-opacity"
          classList={{
            'opacity-0 hocus-within:opacity-100': !options.toolbarVisible,
          }}
        >
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => {
              const api = settingsDialog.api()
              if (api.isOpen) {
                api.close()
              } else {
                api.open()
              }
            }}
            aria-label={
              settingsDialog.api().isOpen ? 'Close Settings' : 'Open Settings'
            }
            ref={settingsDialog.triggerRef}
          >
            <CogIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[180deg] opacity-0': settingsDialog.api().isOpen,
              }}
            />
            <XIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[-180deg] opacity-0': !settingsDialog.api().isOpen,
              }}
            />
          </ToolbarButton>
          <Dialog api={settingsDialog.api()}>
            <DialogBox>
              <DialogHeading>Settings</DialogHeading>
              <DialogDescription>
                <div class="form-control">
                  <label class="label" for="cell-size">
                    <span class="label-text">Cell Size</span>
                    <span class="label-text-alt">{options.size}</span>
                  </label>
                  <RangeSlider
                    class="range range-primary"
                    min={1}
                    max={32}
                    step={1}
                    value={options.size}
                    onChange={value => {
                      if (Number.isSafeInteger(value) && value > 0) {
                        setOptions('size', value)
                      }
                    }}
                  />
                </div>
                <div class="form-control">
                  <label class="label" for="cell-size">
                    <span class="label-text">Update Delay</span>
                  </label>
                  <input
                    type="number"
                    class="input input-primary"
                    min={0}
                    value={options.delay}
                    onInput={event => {
                      const value = event.currentTarget.valueAsNumber
                      if (Number.isSafeInteger(value) && value > 0) {
                        setOptions('delay', value)
                      }
                    }}
                  />
                </div>
              </DialogDescription>
              <DialogActions>
                <DialogCloseAction>Close</DialogCloseAction>
              </DialogActions>
            </DialogBox>
          </Dialog>
          <ToolbarButton
            class="grid place-items-center"
            onClick={() => {
              const api = infoDialog.api()
              if (api.isOpen) {
                api.close()
              } else {
                api.open()
              }
            }}
            aria-label={'Randomise State'}
            ref={infoDialog.triggerRef}
          >
            <InfoIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[180deg] opacity-0': infoDialog.api().isOpen,
              }}
            />
            <XIcon
              class="col-span-full row-start-1 h-6 w-6 transition"
              classList={{
                'rotate-[-180deg] opacity-0': !infoDialog.api().isOpen,
              }}
            />
          </ToolbarButton>
          <Dialog api={infoDialog.api()}>
            <DialogBox>
              <DialogHeading>Info</DialogHeading>
              <DialogDescription>
                <div class="space-y-4">
                  <p>
                    This is kinda like{' '}
                    <ExternalLink href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                      Conway's Game of Life
                    </ExternalLink>
                    , but using Pokemon Types rather than boolean cell states.
                    This is <span class="font-bold italic">heavily</span>{' '}
                    inspired by{' '}
                    <ExternalLink href="https://twitter.com/matthen2/status/1543226572592783362">
                      this tweet
                    </ExternalLink>{' '}
                    by{' '}
                    <ExternalLink href="https://twitter.com/matthen2">
                      Matt Henderson
                    </ExternalLink>
                  </p>
                  <p>
                    Made by{' '}
                    <ExternalLink href="https://soorria.com?ref=pokelife">
                      Soorria
                    </ExternalLink>{' '}
                    and{' '}
                    <ExternalLink href="https://github.com/soorria/pokelife">
                      source here
                    </ExternalLink>
                    .
                  </p>
                  <div class="space-y-3">
                    <h3 class="text-lg">Pokemon Types &amp; Colors</h3>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-6">
                      <For each={allTypes}>
                        {type => (
                          <div class="space-y-2">
                            <div
                              class="rounded-btn relative h-16"
                              style={{ 'background-color': colorTheme[type] }}
                            >
                              <p class="rounded-tr-box absolute bottom-0 left-0 bg-base-100 px-3 py-1">
                                {typeNameMap[type]}
                              </p>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </DialogDescription>
              <DialogActions>
                <DialogCloseAction>Close</DialogCloseAction>
              </DialogActions>
            </DialogBox>
          </Dialog>
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
