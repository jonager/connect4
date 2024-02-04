<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Position } from '../../types'

  export let position: Position
  $: player1 = position.player === 1
  $: player2 = position.player === 2

  const dispatch = createEventDispatcher()

  const sendPosition = () => dispatch('position', { position })
</script>

<div class="position" class:player1 class:player2 on:click={sendPosition} />

<style>
  .position {
    width: 4.5rem;
    height: 4.5rem;
    margin: 10px;
    border: 0.5px rgba(0, 0, 0, 0.8) solid;
    border-radius: 50%;
    background-color: rgba(169, 169, 169, 0.637);
  }

  .player1 {
    background-color: #d8e802;
  }

  .player2 {
    background-color: #050203;
  }
</style>
