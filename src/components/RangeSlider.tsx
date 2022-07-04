import { Component, ComponentProps, For, splitProps } from 'solid-js'
import { range } from '~/utils/misc'

interface RangeSliderProps
  extends Omit<
    ComponentProps<'input'>,
    'min' | 'max' | 'onInput' | 'onChange'
  > {
  min: number
  max: number
  onChange?: (n: number) => void
}

const RangeSlider: Component<RangeSliderProps> = props => {
  const [local, delegated] = splitProps(props, ['onChange', 'min', 'max'])
  return (
    <div>
      <input
        type="range"
        class="range range-primary block"
        min={local.min}
        max={local.max}
        onInput={event => {
          local.onChange?.(event.currentTarget.valueAsNumber)
        }}
        {...delegated}
      />
      <div class="text-2xs flex justify-between">
        <For each={range(local.min, local.max, 100)}>
          {n => <button onClick={() => local.onChange?.(n)}>{n}</button>}
        </For>
      </div>
    </div>
  )
}

export default RangeSlider
