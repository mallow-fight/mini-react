import React, {
  Component,
} from '../../packages/react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'mallow',
    };
  }

  componentWillMount() {
    this.setState({
      name: ' jucy',
    });
  }

  componentDidMount() {
    this.setState({
      name: 'peter',
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div className="home">
        <p>there is home.</p>
        <p>
          there is a people, whose name is
          {name}
          .
        </p>
        <p>
          <p>{name}</p>
        </p>
      </div>
    );
  }
}

export default Home;
