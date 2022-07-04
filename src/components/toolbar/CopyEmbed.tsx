import { Component, createMemo } from 'solid-js'
import CodeIcon from '~icons/heroicons-outline/code'
import { useCopy } from '~/hooks/use-copy'
import ToolbarButton from '../ToolbarButton'
import Dialog, {
  DialogActions,
  DialogBox,
  DialogCloseAction,
  DialogDescription,
  DialogHeading,
  useDialog,
} from '../Dialog'

interface CopyEmbedProps {}

const CopyEmbed: Component<CopyEmbedProps> = () => {
  const [copy, copied] = useCopy()
  const dialog = useDialog({ id: 'embed' })

  const embedUrl = createMemo(() => {
    dialog.api().isOpen
    const url = new URL(location.href)
    url.searchParams.set('embed', 'true')
    return url.toString()
  })

  const embedCode = createMemo(() => {
    return `<iframe 
  title="Pokelife" 
  src="${embedUrl()}"
></iframe>`
  })

  return (
    <>
      <ToolbarButton
        id="embed-code"
        class="grid place-items-center"
        onClick={() => dialog.api().open()}
        label={'See Embed Code'}
        ref={dialog.triggerRef}
      >
        <CodeIcon class="col-span-full row-start-1 h-6 w-6 transition" />
      </ToolbarButton>
      <Dialog api={dialog.api()}>
        <DialogBox>
          <DialogHeading>Embed Code</DialogHeading>
          <DialogDescription>
            <p>Use the following snippet to embed this whereever you want.</p>
            <div class="relative">
              <pre class="rounded-box w-full min-w-0 overflow-x-auto border-2 border-primary p-4">
                <code>{embedCode()}</code>
              </pre>
              <button
                class="btn btn-primary btn-xs absolute top-4 right-4"
                onClick={() => copy(embedCode())}
              >
                {copied() ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p>Small Example</p>
            <div>
              <div innerHTML={embedCode()} class="flex justify-center"></div>
              <style innerHTML="iframe {width: 100%; height: 240px;}" />
            </div>
          </DialogDescription>
          <DialogActions>
            <DialogCloseAction>Close</DialogCloseAction>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  )
}

export default CopyEmbed
