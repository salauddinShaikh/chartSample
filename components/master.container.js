import React, {PropTypes} from 'react';
import 'highcharts/highcharts-more';
import HeaderContainer from './common/header.container';
import MenuContainer from './common/menu.container';

const styles = {
    navbar: {
        marginBottom: 0
    },
}

class MasterContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.location.pathname === "/login" ?
                        <div>
                            {this.props.children}
                        </div>
                        :
                        <div>
                            <div id="wrapper">
                                <nav className="navbar navbar-default navbar-static-top" role="navigation" style={styles.navbar}>
                                    <HeaderContainer />
                                    <MenuContainer />
                                </nav>
                                <div id="page-wrapper">
                                    <div className="container-fluid">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}


export default MasterContainer;
