<script lang="ts">
  import { Dropdown, Modal } from './shared'
  import { LoginForm } from './form'
  import { isLoggedIn } from '../stores/User'
  import { navLinks, userLinks } from '../config'

  let showModal = false

  const toggleModal = () => {
    showModal = !showModal
  }
</script>

<header>
  <nav>
    {#each navLinks as { path, title, URLs }, idx (idx)}
      <Dropdown {path} {title} {URLs} />
    {/each}
  </nav>
  {#if $isLoggedIn}
    <div>
      <Dropdown path={userLinks.path} title={userLinks.title} URLs={userLinks.URLs} />
    </div>
  {:else}
    <button on:click={toggleModal}>Log in</button>
    <Modal {showModal} on:click={toggleModal}>
      <LoginForm />
    </Modal>
  {/if}
</header>

<style>
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
