import React from 'react';
import Header from "./header";

class AddFishForm extends React.Component {
    createFish(event) {
        event.preventDefault();
        console.log("gonna mske some fish");
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addFish(fish);
        this.fishForm.reset();
    }

    render() {
        return (
            <form ref={(input) => {this.fishForm = input}} className="fish-edit" onSubmit={(e)=> this.createFish(e)}>
                <input
                    type="text"
                    placeholder="fish name"
                    ref={(input) => {this.name = input}}
                />
                <input
                    type="text"
                    placeholder="fish price"
                    ref={(input) => {this.price = input}}
                />
                <select
                    name=""
                    id=""
                    ref={(input) => {this.status = input}}
                >
                    <option value="avalable">Fresh!</option>
                    <option value="unavalable">Sold Out!</option>
                </select>
                <textarea
                    placeholder="fish desc"
                    ref={(input) => {this.desc = input}}
                >

                </textarea>
                <input
                    type="text"
                    placeholder="fish image"
                    ref={(input) => {this.image = input}}
                />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

AddFishForm.propTypes = {
    addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;

