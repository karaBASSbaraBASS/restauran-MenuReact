import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
    // constructor() {
    //     // super extend react with our own metod and allows bind
    //      // used for multiply call
    //      // for one call you can use
    //      // this.goToStore.bind(this)/(e) => this.goToStore(e))
    //     super();
    //     this.goToStore = this.goToStore.bind(this)
    // }
    goToStore(e) {
        e.preventDefault();
        //grab thr text from the box
        //transition from "/" to "/store/:storeID"
        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`)

    }

    render() {
        return (
            <form action="" className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter A Store</h2>
                <input
                    type="text"
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                    ref={(input) => {this.storeInput = input}}
                />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default StorePicker;