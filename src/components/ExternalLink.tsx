import { Component, ComponentProps, splitProps } from 'solid-js'
import { cx } from '~/utils/misc'

interface ExternalLinkProps extends ComponentProps<'a'> {}

const ExternalLink: Component<ExternalLinkProps> = props => {
  const [local, delegated] = splitProps(props, ['class'])
  return (
    <a
      class={cx('link link-primary', local.class)}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  )
}

export default ExternalLink
