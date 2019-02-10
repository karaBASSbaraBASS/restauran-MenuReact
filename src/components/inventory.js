import React from 'react';
import AddFishForm from './addfishform';
import base from '../base';
import Fish from "./fish";
import firebase from 'firebase';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }
    // save loggined state didnt work now
    // componentDidMount() {
    //     base.on('Auth')((user) => {
    //         if(user) {
    //             console.log(user)
    //         }
    //     })
    // }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        // take a copy of that fish state? and update it with the new data
        const updatedFish = {...fish, [e.target.name]: e.target.value}
        this.props.updateFish(key, updatedFish);
    }

    authenticate(val) {
        const auth = firebase.auth();
        const provider = val === 'git'? new firebase.auth.GithubAuthProvider(): new firebase.auth.FacebookAuthProvider();

        auth.signInWithPopup(provider).then((result) => {
            console.log(result)
            // grab the store info
            const storeRef = firebase.database().ref(this.props.storeId);
            console.log(storeRef)

            // query the firebase once for the store data
            storeRef.once('value', (snapshot) => {
                const data = snapshot.val() || {};

                // claim it as our own if there is no owner already
                if(!data.owner) {
                    storeRef.set({
                        owner: result.user.uid
                    });
                }

                this.setState({
                    uid: result.user.uid,
                    owner: data.owner || result.user.uid
                })

            })

        }).catch(function(error) {
            console.log(error)
        });
    }
    // //authHandler(result) {
    //     // grab the store info
    //     const storeRef = firebase.database().ref(this.props.storeId);
    //     console.log(storeRef)
    //
    //     // query the firebase once for the store data
    //     storeRef.once('value', (snapshot) => {
    //         const data = snapshot.val() || {};
    //
    //         // claim it as our own if there is no owner already
    //         if(!data.owner) {
    //             storeRef.set({
    //                 owner: result.user.uid
    //             });
    //         }
    //
    //         this.setState({
    //             uid: result.user.uid,
    //             owner: data.owner || result.user.uid
    //         })
    //
    //     })
    // }


    logout() {
        this.setState({ uid: null });
    }


    renderLogin() {
        return(
            <nav className="login">
                <h2>This is Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button
                    className="github"
                    onClick={() => this.authenticate('git')}
                >
                    Log in with Github
                </button>
                <button
                    className="facebook"
                    onClick={() => this.authenticate('face')}
                >
                    Log in with Facebook
                </button>
            </nav>
        )
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" placeholder="fish name" value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" placeholder="fish price" value={fish.price} onChange={(e) => this.handleChange(e, key)}/>

                <select type="text" name="status"  value={fish.status} onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea type="text" name="desc" placeholder="fish desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" placeholder="fish image" value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        // check if they are logged in at all
        if(!this.state.uid){
            return (
                <div>{this.renderLogin()}</div>
            )
        }
        // check if they are the owner of the current store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                <h2>This is Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
};

export default Inventory;