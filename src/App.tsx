import {
  Component,
  createEffect,
  createMemo,
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
import { cx, rafLoopAsync, toggle } from './utils/misc'
import Dialog, {
  DialogActions,
  DialogBox,
  DialogCloseAction,
  DialogDescription,
  DialogHeading,
  useDialog,
} from './components/Dialog'
import RangeSlider from './components/RangeSlider'
import CopyEmbed from './components/toolbar/CopyEmbed'
import Info from './components/toolbar/Info'

const toolbarChildCommon = 'p-4 bg-base-100/50 sm:bg-transparent'
const toolbarClass = 'sm:bg-base-100/50'

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
    const { size, delay, allowedTypes: _types, isEmbed } = options
    const params = new URLSearchParams({
      size: size.toString(),
      delay: delay.toString(),
      types: _types.map(t => typeNameMap[t]).join(','),
    })
    if (isEmbed) params.set('embed', 'true')
    history.replaceState('', '', `?${params}`)
  }

  const [options, setOptions] = createStore(getInitialOptionsFromSearchParams())
  const selectedTypes = createMemo(() => new Set(options.allowedTypes))

  createEffect(() => {
    if (ready()) {
      syncOptionsToUrl()
    }
  })

  const settingsDialog = useDialog({ id: 'settings' })
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
    await pokelifeWorker.setAllowedTypes([...options.allowedTypes])
    state = await pokelifeWorker.randomState(canvasSize.cols, canvasSize.rows)
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
    pokelifeWorker.setAllowedTypes([...options.allowedTypes])
  })

  createEffect(() => {
    if (!options.running || !ready()) {
      return
    }

    const cancel = rafLoopAsync(() => step(), options.delay)
    onCleanup(() => cancel())
  })

  return (
    <>
      <div
        class="grid h-full place-items-center overflow-hidden"
        classList={{ 'bg-base-100': !options.isEmbed }}
      >
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
            class={cx(
              'fixed inset-x-0 bottom-0 flex items-end justify-between space-x-4 transition-opacity'
            )}
            classList={{
              'opacity-0 hocus-within:opacity-100': !options.toolbarVisible,
              [toolbarClass]: options.toolbarVisible,
            }}
          >
            <div
              class={cx('flex space-x-4 p-4', toolbarChildCommon)}
              classList={{ hidden: !options.toolbarVisible }}
            >
              <ToolbarButton
                id="settings"
                class="grid place-items-center"
                onClick={() => {
                  const api = settingsDialog.api()
                  if (api.isOpen) {
                    api.close()
                  } else {
                    api.open()
                  }
                }}
                label={
                  settingsDialog.api().isOpen
                    ? 'Close Settings'
                    : 'Open Settings'
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
                    <div class="form-control">
                      <p class="label">
                        <span class="label-text">Allowed Types</span>
                      </p>
                      <p class="label-text-alt mb-4">
                        Note you will need to refresh the game's state for this
                        setting to be reflected.
                      </p>
                      <div class="grid grid-cols-2 gap-x-4 gap-y-6">
                        <For each={allTypes}>
                          {type => {
                            const isSelected = createMemo(() =>
                              selectedTypes().has(type)
                            )
                            return (
                              <>
                                <input
                                  id={`type-radio-${type}`}
                                  type="checkbox"
                                  name="types"
                                  value={type}
                                  checked={isSelected()}
                                  class="sr-only"
                                  onChange={event => {
                                    const shouldBeIncluded =
                                      event.currentTarget.checked
                                    if (shouldBeIncluded && !isSelected()) {
                                      setOptions('allowedTypes', current => [
                                        ...current,
                                        type,
                                      ])
                                    } else if (
                                      !shouldBeIncluded &&
                                      isSelected()
                                    ) {
                                      setOptions('allowedTypes', current =>
                                        current.filter(t => t !== type)
                                      )
                                    }
                                  }}
                                />
                                <label
                                  class="block cursor-pointer space-y-2"
                                  for={`type-radio-${type}`}
                                >
                                  <span
                                    class="rounded-btn relative block h-16 w-full"
                                    style={{
                                      'background-color': colorTheme[type],
                                    }}
                                  >
                                    <span class="rounded-tr-box absolute bottom-0 left-0 bg-base-100 px-3 py-1">
                                      {typeNameMap[type]}
                                    </span>
                                    <Show when={isSelected()}>
                                      <span class="badge absolute bottom-1 right-1 bg-base-100 text-success">
                                        Selected
                                      </span>
                                    </Show>
                                  </span>
                                </label>
                              </>
                            )
                          }}
                        </For>
                      </div>
                    </div>
                  </DialogDescription>
                  <DialogActions>
                    <DialogCloseAction>Close</DialogCloseAction>
                  </DialogActions>
                </DialogBox>
              </Dialog>
              <Info />
              <CopyEmbed />
            </div>
            <div class="flex-1" />
            <div
              class={cx('grid gap-4 sm:flex', toolbarChildCommon)}
              classList={{ 'grid-cols-2': options.toolbarVisible }}
            >
              <div
                class="contents"
                classList={{ hidden: !options.toolbarVisible }}
              >
                <ToolbarButton
                  id="randomise"
                  class="grid place-items-center"
                  onClick={() => reset()}
                  label={'Randomise State'}
                >
                  <RefreshIcon class="col-span-full row-start-1 h-6 w-6 transition" />
                </ToolbarButton>
                <ToolbarButton
                  id="step"
                  class="grid place-items-center"
                  disabled={options.running}
                  onClick={() => step(true)}
                  label={'Next Step'}
                >
                  <ChevronDoubleRightIcon class="col-span-full row-start-1 h-6 w-6 transition" />
                </ToolbarButton>
                <ToolbarButton
                  id="play-pause"
                  class="grid place-items-center"
                  onClick={() => setOptions('running', toggle)}
                  label={options.running ? 'Pause Automaton' : 'Play Automaton'}
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
              </div>
              <ToolbarButton
                id="hide"
                class="grid place-items-center"
                onClick={() => {
                  if (options.toolbarVisible) {
                    canvas.focus({ preventScroll: true })
                  }
                  setOptions('toolbarVisible', toggle)
                }}
                label={options.running ? 'Hide Toolbar' : 'Show Toolbar'}
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
          </div>
        </Show>
      </div>
      <Show when={options.isEmbed}>
        <a
          href={(() => {
            const url = new URL(location.href)
            url.searchParams.delete('embed')
            return url.toString()
          })()}
          target="_blank"
          class="fixed inset-0 opacity-0"
        ></a>
      </Show>
    </>
  )
}

export default App
