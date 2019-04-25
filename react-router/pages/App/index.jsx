import React, {
  Component,
} from 'react';
import Home from './Home';
import Person from './Person';
import Garden from './Garden';
import './index.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: 'hello react!',
      pre: 'i am pre',
      classTest: 'container'
    };
  }

  componentWillMount() {
    this.setState({
      pre: '我将要render了，render之前加一个state',
    });
  }

  componentDidMount() {
    this.setState({
      notice: 'hello mallow',
    });
    // todo：支持异步
    setTimeout(() => {
      this.setState({
        classTest: 'container-test',
        notice: 'hello every one!!!! look here.'
      })
    }, 3000)
  }

  render() {
    const { name, version } = this.props;
    const { notice, pre, classTest } = this.state;
    return (
      <div className={classTest}>

        <div className="one">
          props:
          <p>{name}</p>
          <p>{version}</p>
        </div>

        <div className="two">
          state:
          <p>{notice}</p>
          <p>{pre}</p>
        </div>

        <div>{notice}</div>

        <Home />

        <Person name="mallow" />

        <Garden>
          <div>tree.</div>
          <div>flower.</div>
        </Garden>

        <Garden>
          <div>mallow</div>
        </Garden>

      </div>
    );
  }
}

export default App;
