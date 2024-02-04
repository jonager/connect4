<script lang="ts">
  import { Board } from './components/board'
  import Header from './components/Header.svelte'
  import { LobbyOptions } from './components/lobby'
  import { LoginForm, RegisterForm } from './components/form'
</script>

<main>
  <Header />
  <Board />
  <LobbyOptions />
  <RegisterForm />
  <LoginForm />
</main>

<style>
  main {
    display: grid;
    justify-items: center;
  }
</style>
