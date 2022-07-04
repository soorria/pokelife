import { Component, ComponentProps, splitProps } from 'solid-js'
import { cx } from '~/utils/misc'

interface ToolbarButtonProps extends ComponentProps<'button'> {}

const ToolbarButton: Component<ToolbarButtonProps> = props => {
  const [local, delegated] = splitProps(props, ['class'])
  return (
    <button
      class={cx(
        'btn btn-primary btn-circle disabled:bg-opacity-50',
        local.class
      )}
      {...delegated}
    >
      {props.children}
    </button>
  )
}

export default ToolbarButton
