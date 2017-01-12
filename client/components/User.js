import React, {Component} from 'react'

class User extends Component {

  render() {
    const { name, error, handleLogin } = this.props;

    return <div>
      {name ? <p>Привет, {name}!</p> : <button className="pure-button" onClick={handleLogin}>Войти</button>}
      {error ? <p> {error}. <br /> Попробуйте еще раз.</p> : ''}
    </div>
  }
}
export default User