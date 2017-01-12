import React, {Component} from 'react'

class SearchPage extends Component {
  handleSearch(e) {
    e.preventDefault();
    this.props.handleSearch(this.refs.inp.value)
  }

  handleSelect(id, friends) {
    if (this.props.selected != id) {
      this.props.handleSelect(id, friends)
    }
  }

  render() {
    return <div>
      <form className="pure-form" onSubmit={::this.handleSearch}>
        <input ref="inp" type='text' value="Юрий Балесный"/>
        <button type="submit" className="pure-button">Search</button>
      </form>

      <ul>
        {this.props.result.map(i =>
          <li key={i.id}>
            <h3>{i.name}</h3>
            <img src={i.photo} onClick={() => this.handleSelect(i.id, i.friends)}/>

            <p>{i.city}</p>
            <p>Друзья:{i.friends}</p>
            <p>Подписчики:{i.followers}</p>
            <p>Подписан:{i.subscriptions}</p>
          </li>)}
      </ul>

    </div>

  }
}
export default SearchPage