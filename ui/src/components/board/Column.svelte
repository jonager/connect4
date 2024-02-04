<script lang="ts">
  import { Position as Pos } from './index'
  import type { Position } from '../../types'

  export let column: Position[]
</script>

<section class="column">
  {#each column as position (`${position.x}-${position.y}`)}
    <Pos {position} on:position />
  {/each}
</section>

<style>
</style>
