import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { open, close } from 'redux/modules/menu';
import { browserHistory } from 'react-router';
import { routeActions } from 'react-router-redux';
import config from '../../config';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#375EAB',
    primary2Color: colors.green700,
    primary3Color: colors.green100,
    accent1Color: colors.pink900,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: 'all'
});

@themeDecorator(muiTheme)
@connect(
  state => ({
    menu: state.menu.open
  }),
  {open, close, pushState: routeActions.push}
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    menu: PropTypes.bool,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleToggle = (isOpen) => {
    if (isOpen === false) {
      return this.props.close();
    }
    if (this.props.menu) {
      return this.props.close();
    }
    return this.props.open();
  };

  render() {
    const titleStyle = {
      lineHeight: '59px',
      fontSize: '34px',
      fontWeight: '300',
      letterSpacing: '-.01em'
    };
    const styles = require('./App.css');
    return (
      <div>
        <Helmet {...config.app.head}/>
        <div className={styles.appContent}>
          <AppBar
            titleStyle={titleStyle}
            style={{'position': 'fixed', 'top': 0}}
            title="exago"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <LeftNav open={this.props.menu} docked={false} onRequestChange={this.handleToggle}>
            <MenuItem onClick={() => browserHistory.push('/')}>Home</MenuItem>
            <MenuItem onClick={() => browserHistory.push('/about')}>About</MenuItem>
          </LeftNav>
          {this.props.children}
        </div>
      </div>
    );
  }
}
