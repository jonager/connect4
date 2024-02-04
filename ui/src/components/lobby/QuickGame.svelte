<script lang="ts">
  import Card from '../shared/Card.svelte'
  import { times, timeControls } from '../../config'
</script>

{#each times as t, idx (idx)}
  <Card>
    {#if t === 'custom'}
      <div>{t}</div>
    {:else}
      <div>{t}</div>
      <div>{timeControls[idx]}</div>
    {/if}
  </Card>
{/each}

<style>
</style>
