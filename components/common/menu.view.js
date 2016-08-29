import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const styles = {
};

class MenuView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <Link to={'/'}><i className="fa fa-dashboard fa-fw"></i> Dashboard</Link>
                        </li>
                        <li>
                            <Link to={'advanceChart'}><i className="fa fa-area-chart fa-fw"></i> Advance Chart</Link>
                        </li>
                        <li>
                            <Link to={'stockChart'}><i className="fa fa-bar-chart fa-fw"></i> Stock Chart</Link>
                        </li>
                        <li>
                            <Link to={'lineChart'}><i className="fa fa-line-chart fa-fw"></i> Line Chart</Link>
                        </li>
                        <li>
                            <Link to={'barChart'}><i className="fa fa-bar-chart fa-fw"></i> Bar Chart</Link>
                        </li>
                        <li>
                            <Link to={'pieChart'}><i className="fa fa-pie-chart fa-fw"></i> Pie Chart</Link>
                        </li>
                         <li>
                            <Link to={'areaChart'}><i className="fa fa-area-chart fa-fw"></i> Area Chart</Link>
                        </li>
                         <li>
                            <Link to={'dynamicChart'}><i className="fa fa-bar-chart fa-fw"></i> Dynamic Chart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

MenuView.propTypes = {
};

export default MenuView