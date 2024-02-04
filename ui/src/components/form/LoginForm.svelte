<script lang="ts">
  import { userID, isLoggedIn } from '../../stores/User'
  import { validateLength } from '../../utils/utils'
  const fields = { username: '', password: '' }
  const errors = { username: '', password: '' }

  const submitHandler = async (): Promise<void> => {
    // validation
    const { username, password } = fields

    if (!validateLength(1, 20, username.trim())) {
      errors.username = 'username must be between 1 and 20 characters long'
      return
    } else errors.username = ''

    if (!validateLength(8, 50, password.trim())) {
      errors.password = 'password must be between 8 and 50 characters long'
      return
    } else errors.password = ''

    try {
      const res = await fetch(`http://localhost:4000/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(fields),
      })
      const userIDRes: number = await res.json()
      if (userIDRes) {
        userID.set(userIDRes)
        isLoggedIn.set(true)
        localStorage.setItem('userID', `${userIDRes}`) // todo: remove when users logs out
      }
      // todo: redirect to '/'
    } catch (err) {
      console.log(err)
    }
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="form-field">
    <label for="username">username</label>
    <input type="text" bind:value={fields.username} />
    <div class="error">{errors.username}</div>
  </div>
  <div class="form-field">
    <label for="password">password</label>
    <input type="password" bind:value={fields.password} />
    <div class="error">{errors.password}</div>
  </div>
  <button type="submit">Sign in</button>
</form>
