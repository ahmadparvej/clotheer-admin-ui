

const LoginPage = () => {
  return (
    <>
      <h1>Sign in</h1>
      <input type="text" placeholder="Username"/>
      <input type="password" placeholder="Password"/>
      <button>Log in</button>
      <label htmlFor="remember">Remember me</label>
      <input type="checkbox" name="Remember me" id="remember" />
      <a href="#">Forgot password?</a>
    </>
  )
}

export default LoginPage