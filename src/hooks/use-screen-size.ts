import { createEffect, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

export const useScreenSize = () => {
  const [size, setSize] = createStore(getWindowSize())

  const onResize = () => setSize(getWindowSize())
  window.addEventListener('resize', onResize)
  onCleanup(() => window.removeEventListener('resize', onResize))

  return size
}
