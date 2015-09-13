var React = require('react');
var request = require('superagent');
var styles = {
      border : "1px solid",
      borderColor : "#000"
    };

var User = React.createClass({
  render: function() {
    return (
      <tr className="user" style={styles}>
        <td className="userName" style={styles}>
          {this.props.name}
        </td>
        <td className="userEmail" style={styles}>
          {this.props.email}
        </td>
      </tr>
    );
  }
});

var UserBox = React.createClass({
  loadUsersFromServer: function() {
    var url = "/get_users",
        that = this;
    //ajax通信する
    request
      .get(url)
      .end(function(err, res){
        if (this.isMounted()) {
          var map = JSON.parse(res.text);
          //表示されている値を更新
          this.setState({data: map});
        }
      }.bind(this));
  },
  handleUserSubmit: function(user) {
    //var users = this.state.data;
    //var newUsers = users.concat([user]);
    //this.setState({data: newUsers});
    var url = "/post_user",
        that = this;
    //ajax通信する
    request
      .post(url)
      .send({name: user.name, email: user.email})
      .end(function(err, res){
        if (this.isMounted()) {
          var map = JSON.parse(res.text);
          //表示されている値を更新
          this.setState({data: map});
        }
      }.bind(this));
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadUsersFromServer();
    //setInterval(this.loadUsersFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="userBox">
        <h1>Users</h1>
        <UserForm onUserSubmit={this.handleUserSubmit} />
        <UserList data={this.state.data} />
      </div>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user, index) {
      return (
        <User name={user.name} email={user.email} key={index} />
      );
    });
    return (
      <table className="userList" style={styles}>
        <tbody>
          <tr className="user" style={styles}>
            <th className="userName" style={styles}>
              name
            </th>
            <th className="userEmail" style={styles}>
              email
            </th>
          </tr>
          {userNodes}
        </tbody>
      </table>
    );
  }
});

var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    if (!name || !email) {
      return;
    }
    this.props.onUserSubmit({name: name, email: email});
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.email).value = '';
  },
  render: function() {
    return (
      <form className="userForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="name" />
        <input type="email" placeholder="Email" ref="email" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = User;
module.exports = UserForm;
module.exports = UserList;
module.exports = UserBox;
