<script lang="ts">
  import { validateEmail, validateLength } from '../../utils/utils'
  const fields = { username: '', password: '', email: '' }
  const errors = { username: '', password: '', email: '' }

  const submitHandler = async () => {
    // validation
    const { username, password, email } = fields

    if (!validateLength(1, 20, username.trim())) {
      errors.username = 'username must be between 1 and 20 characters long'
      return
    } else errors.username = ''

    if (!validateLength(8, 50, password.trim())) {
      errors.password = 'password must be between 8 and 50 characters long'
      return
    } else errors.password = ''

    if (!validateEmail(email.trim())) {
      errors.email = 'email is not valid'
      return
    } else errors.email = ''

    try {
      const res = await fetch(`http://localhost:4000/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(fields),
      })
      const userID: number = await res.json()
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
  <div class="form-field">
    <label for="email">email</label>
    <input type="text" bind:value={fields.email} />
    <div class="error">{errors.email}</div>
  </div>
  <button type="submit">Sign up</button>
</form>
