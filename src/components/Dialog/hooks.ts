import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine, useSetup } from '@zag-js/solid'
import { createMemo } from 'solid-js'

type UseDialogProps = Partial<dialog.Context> & {
  id: string
}

export type DialogApi = ReturnType<typeof dialog.connect>
export type DialogApiAccessor = () => DialogApi

export const useDialog = <
  TTriggerElement extends HTMLElement = HTMLButtonElement
>({
  id,
  ...ctx
}: UseDialogProps) => {
  const [state, send] = useMachine(dialog.machine(ctx))
  const triggerRef = useSetup<TTriggerElement>({ send, id })
  const api = createMemo(() => dialog.connect(state, send, normalizeProps))

  return { triggerRef, api }
}
