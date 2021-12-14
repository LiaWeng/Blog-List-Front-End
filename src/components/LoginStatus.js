const LoginStatus = ({ user, setUser }) => {
  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {user.name} logged in &nbsp; 
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}

export default LoginStatus