import { Component, For } from 'solid-js'
import { allTypes, colorTheme, typeNameMap } from '~/lib/pokelife'
import InfoIcon from '~icons/heroicons-outline/information-circle'
import XIcon from '~icons/heroicons-outline/x'
import Dialog, {
  DialogBox,
  DialogHeading,
  useDialog,
  DialogDescription,
  DialogActions,
  DialogCloseAction,
} from '../Dialog'
import ExternalLink from '../ExternalLink'
import ToolbarButton from '../ToolbarButton'

const Info: Component = () => {
  const infoDialog = useDialog({ id: 'info' })
  return (
    <>
      <ToolbarButton
        id="info"
        class="grid place-items-center"
        onClick={() => {
          const api = infoDialog.api()
          if (api.isOpen) {
            api.close()
          } else {
            api.open()
          }
        }}
        label={'Info about pokelife'}
        ref={infoDialog.triggerRef}
      >
        <InfoIcon
          class="col-span-full row-start-1 h-6 w-6 transition"
          classList={{
            'rotate-[180deg] opacity-0': infoDialog.api().isOpen,
          }}
        />
        <XIcon
          class="col-span-full row-start-1 h-6 w-6 transition"
          classList={{
            'rotate-[-180deg] opacity-0': !infoDialog.api().isOpen,
          }}
        />
      </ToolbarButton>
      <Dialog api={infoDialog.api()}>
        <DialogBox>
          <DialogHeading>Info</DialogHeading>
          <DialogDescription>
            <div class="space-y-4">
              <p>
                This is kinda like{' '}
                <ExternalLink href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                  Conway's Game of Life
                </ExternalLink>
                , but using Pokemon Types rather than boolean cell states. This
                is <span class="font-bold italic">heavily</span> inspired by{' '}
                <ExternalLink href="https://twitter.com/matthen2/status/1543226572592783362">
                  this tweet
                </ExternalLink>{' '}
                by{' '}
                <ExternalLink href="https://twitter.com/matthen2">
                  Matt Henderson
                </ExternalLink>
              </p>
              <p>
                Made by{' '}
                <ExternalLink href="https://soorria.com?ref=pokelife">
                  Soorria
                </ExternalLink>{' '}
                and{' '}
                <ExternalLink href="https://github.com/soorria/pokelife">
                  source here
                </ExternalLink>
                .
              </p>
              <div class="space-y-3">
                <h3 class="text-lg">Pokemon Types &amp; Colors</h3>
                <div class="grid grid-cols-2 gap-x-4 gap-y-6">
                  <For each={allTypes}>
                    {type => (
                      <div class="space-y-2">
                        <div
                          class="rounded-btn relative h-16"
                          style={{ 'background-color': colorTheme[type] }}
                        >
                          <p class="rounded-tr-box absolute bottom-0 left-0 bg-base-100 px-3 py-1">
                            {typeNameMap[type]}
                          </p>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
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

export default Info
