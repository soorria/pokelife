import { Transition, TransitionChild } from 'solid-headless'
import {
  ComponentProps,
  createContext,
  mergeProps,
  ParentComponent,
  splitProps,
  useContext,
} from 'solid-js'
import { Dynamic, Portal } from 'solid-js/web'
import invariant from 'tiny-invariant'
import { cx } from '~/utils/misc'
import type { DialogApi } from './hooks'

export * from './hooks'

interface DialogProps {
  api: DialogApi
}

const DialogContext = createContext<DialogApi | null>(null)
const useDialogContext = () => {
  const ctx = useContext(DialogContext)
  invariant(ctx)
  return ctx
}

const Dialog: ParentComponent<DialogProps> = props => {
  return (
    <Portal>
      <Transition show={props.api.isOpen}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div class="fixed inset-0 bg-neutral-focus/40" />
        </TransitionChild>

        <TransitionChild
          enterFrom="opacity-0 translate-y-16"
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-16 sm:translate-y-0 sm:scale-75"
          class="fixed inset-0 flex items-end justify-center transition duration-150 sm:items-center"
          {...props.api.underlayProps}
        >
          <DialogContext.Provider value={props.api}>
            {props.children}
          </DialogContext.Provider>
        </TransitionChild>
      </Transition>
    </Portal>
  )
}

export default Dialog

export const DialogBox: ParentComponent<ComponentProps<'div'>> = props => {
  const api = useDialogContext()
  return (
    <div
      class="rounded-t-box relative flex max-h-[90vh] w-full max-w-md flex-col space-y-6 bg-base-100 p-6 shadow-lg sm:rounded-b-box sm:px-8"
      {...api.contentProps}
      {...props}
    />
  )
}

export const DialogHeading: ParentComponent<
  { component?: `h${1 | 2 | 3 | 4 | 5 | 6}` } & ComponentProps<'h1'>
> = _props => {
  const props = mergeProps({ component: 'h2' }, _props)
  const api = useDialogContext()
  return <Dynamic class="text-2xl" {...api.titleProps} {...props} />
}

export const DialogDescription: ParentComponent<
  ComponentProps<'div'>
> = props => {
  const [local, rest] = splitProps(props, ['class'])
  const api = useDialogContext()
  return (
    <div
      class={cx(
        '-m-2 flex-1 space-y-4 overflow-y-auto p-2 text-base',
        local.class
      )}
      {...api.descriptionProps}
      {...rest}
    />
  )
}

export const DialogActions: ParentComponent<ComponentProps<'div'>> = props => {
  return <div class="flex justify-end space-x-2" {...props} />
}

export const DialogCloseAction: ParentComponent<
  ComponentProps<'button'>
> = props => {
  const api = useDialogContext()
  return (
    <button
      class="btn btn-outline btn-error"
      {...api.closeButtonProps}
      {...props}
    />
  )
}
