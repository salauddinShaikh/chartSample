import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class MasterContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">High Chart</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><Link to={'advanceChart'}>Advance Chart</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}


export default MasterContainer;
