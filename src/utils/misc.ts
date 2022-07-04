export const randomItem = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]!

export const debounce = <T extends CallableFunction>(
  fn: T,
  delay: number
): T => {
  let timer: ReturnType<typeof setTimeout>

  return ((...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as any
}

export const dbg = <T>(t: T, ...args: any[]) => (console.log(t, ...args), t)

export const rafLoopAsync = (fn: () => Promise<void>, delay?: number) => {
  let stopped = false
  let timeout: NodeJS.Timeout
  const loop = async () => {
    await fn()
    if (stopped) return
    if (delay) timeout = setTimeout(() => doRaf(), delay)
    else doRaf()
  }
  const doRaf = () => (raf = requestAnimationFrame(loop))
  let raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(timeout)
    stopped = true
  }
}

export const rafLoop = (fn: () => void, delay = 0) => {
  let timeout: NodeJS.Timeout
  const loop = () => {
    fn()
    if (delay) timeout = setTimeout(() => doRaf(), delay)
    else doRaf()
  }
  const doRaf = () => (raf = requestAnimationFrame(loop))
  let raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(timeout)
  }
}

export const cx = (...classes: (string | boolean | null | undefined)[]) =>
  classes.filter(cls => typeof cls === 'string').join(' ')

export const toggle = (b: boolean) => !b

export const range = (min: number, max: number, step = 1): number[] => {
  const result = [] as number[]
  let i = min
  for (; i < max; i += step) {
    result.push(i)
  }
  if (i !== max) {
    result.push(max)
  }
  return result
}
