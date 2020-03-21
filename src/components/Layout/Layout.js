import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
 

class Layout extends Component {

    state = {
        showSidedrawer: false
    }
    showSidedrawerHandler = () => {
        this.setState({showSidedrawer: false})
    }
    showedSidedrawerHandler = () => {

        this.setState({showSidedrawer: true})

    }
    render() { 
    return (
        <Auxi>
            <Toolbar showed={this.showedSidedrawerHandler} />
            <Sidedrawer show={this.state.showSidedrawer} closed={this.showSidedrawerHandler}/>
            <main>{this.props.children}</main>




        </Auxi>
    )
}

}

export default Layout;