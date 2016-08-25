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
                            <Link to={'/'} className="navbar-brand">High Chart</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'advanceChart'}>Advance Charts</Link></li>
                            <li><Link to={'stockChart'}>Stock Charts</Link></li>
                            <li><Link to={'lineChart'}>Line Charts</Link></li>
                            <li><Link to={'barChart'}>Bar Charts</Link></li>
                            <li><Link to={'pieChart'}>Pie Charts</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}


export default MasterContainer;
