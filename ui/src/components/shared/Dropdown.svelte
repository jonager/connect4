<script lang="ts">
  export let title: string
  export let path: string
  export let URLs: { title: string; path: string }[]
</script>

<div class="dropdown">
  {#if path}
    <a href={path} class="dropbtn">{title}</a>
  {:else}
    <button class="dropbtn">{title}</button>
  {/if}
  <div class="dropdown-content">
    {#each URLs as URL, idx (idx)}
      <a href={URL.path}>{URL.title}</a>
    {/each}
  </div>
</div>

<style>
  .dropbtn {
    background-color: #04aa6d;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    display: block;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
</style>
