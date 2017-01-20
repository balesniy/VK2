import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import User from '../components/User'
import SearchPage from '../components/SearchPage'
import Graph from '../components/Graph'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as searchActions2 from '../actions/searchActions2'
import * as graphActions from '../actions/graphActions'

class App extends Component {
  render() {
    const { first_name, error } = this.props.user;
    const { result } = this.props.searchResult;
    const { result:result2 } = this.props.searchResult2;
    const { graph } = this.props;
    const { loginUser } = this.props.userActions;
    const { getPhoto } = this.props.graphActions;
    const { handleSearch, selectUser } = this.props.searchActions;
    const { handleSearch2, selectUser2 } = this.props.searchActions2;

    return (
      <div className='pure-g'>
        <div className="pure-u-1">
          <h1>Welcome to React</h1>
          <User name={first_name} handleLogin={loginUser} error={error}/>
        </div>
        <div className="pure-u-1-2">
          <SearchPage handleSearch={handleSearch}
                      result={result}
                      handleSelect={selectUser}
          />
        </div>
        <div className="pure-u-1-2">
          <SearchPage handleSearch={handleSearch2}
                      result={result2}
                      handleSelect={selectUser2}
          />
        </div>
        <div className="pure-u-1">
          <Graph graph={graph} getPhoto={getPhoto}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, searchResult, searchResult2, graph }) {
  return {
    user,
    searchResult,
    searchResult2,
    graph
  }
}
function mapDispatchToProps(dispatch) {
  return {
    userActions:    bindActionCreators(userActions, dispatch),
    searchActions:  bindActionCreators(searchActions, dispatch),
    searchActions2: bindActionCreators(searchActions2, dispatch),
    graphActions: bindActionCreators(graphActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
