<script lang="ts">
  import Tab from '../shared/Tab.svelte'
  import { Lobby, QuickGame } from './index'
  import { LobbyTabs } from '../../utils/types'

  const items = ['Quick game', 'Lobby', 'Correspondence'] as const
  let activeItem = 'Quick game'

  const tabChange = (e: CustomEvent) => {
    activeItem = e.detail
  }
</script>

<section>
  <Tab {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === LobbyTabs.QuickGame}
    <QuickGame />
  {:else if activeItem === LobbyTabs.Lobby}
    <Lobby type={activeItem} />
  {:else if activeItem === LobbyTabs.Correspondence}
    <Lobby type={activeItem} />
  {/if}
</section>
