import {
  Component,
  ComponentProps,
  createMemo,
  Show,
  splitProps,
} from 'solid-js'
import { normalizeProps, useMachine, useSetup } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { cx } from '~/utils/misc'

interface ToolbarButtonProps extends ComponentProps<'button'> {
  id: string
  label: string
}

const ToolbarButton: Component<ToolbarButtonProps> = props => {
  const [local, delegated] = splitProps(props, ['class', 'label'])
  const [state, send] = useMachine(
    tooltip.machine({
      openDelay: 250,
      closeOnPointerDown: false,
    })
  )
  const ref = useSetup({ send, id: 'tb-' + props.id })
  const api = createMemo(() => tooltip.connect(state, send, normalizeProps))

  return (
    <>
      <span {...(api().triggerProps as any)}>
        <button
          ref={ref}
          class={cx(
            'btn btn-primary btn-circle disabled:bg-opacity-50',
            local.class
          )}
          {...delegated}
        >
          {props.children}
        </button>
      </span>
      <Show when={api().isOpen}>
        <div {...(api().positionerProps as any)}>
          <div
            {...(api().contentProps as any)}
            class="rounded-md bg-base-100 py-2 px-4"
          >
            {local.label}
          </div>
        </div>
      </Show>
    </>
  )
}

export default ToolbarButton
