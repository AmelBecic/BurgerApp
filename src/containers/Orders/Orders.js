import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';


class Orders extends Component {
    state= {
        data:  [],
        loading: true
    }

    componentDidMount() {
        
        axios.get('/orders.json').then(response=> {
         const fetchedOrders=[];
         console.log(response.data);
         for (let key in response.data) {
             fetchedOrders.push({
                 ...response.date[key] , 
                 id: key
             })
         }
         this.setState({loading: false , data: fetchedOrders});
            
            
        }).catch(err => {console.log(err);})
        
    }

    render() {
        
        

        return (

            <div>
                {this.state.data.map(order => (
                    <Order id={order.id} />
                ))}
            </div>

        );
    }



}


export default Orders;