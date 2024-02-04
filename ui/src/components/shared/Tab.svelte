<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let items: readonly string[]
  export let activeItem: string
  const dispatch = createEventDispatcher()
</script>

<div class="tabs">
  <ul>
    {#each items as item}
      <li on:click={() => dispatch('tabChange', item)}>
        <div class:active={item === activeItem}>{item}</div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style: none;
  }
  li {
    margin: 0 16px;
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
  .active {
    color: crimson;
    border-bottom: 2px solid crimson;
    padding-bottom: 8px;
  }
</style>
