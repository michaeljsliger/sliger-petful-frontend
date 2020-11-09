import React from 'react'
import config from '../config';
import Animal from './Animal';
import People from './People';
import './Adoption.css';

class Adoption extends React.Component {
    state = {
        people: [],
        cat: {},
        dog: {},
        adopted: [],
        adopt: false,
        currentUser: '',
    }

    componentDidMount() {
        fetch(`${config.SERVER_URL}/api/pets`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    cat: json.cat,
                    dog: json.dog,
                })
            });
        fetch(`${config.SERVER_URL}/api/people`)
            .then(res => res.json())
            .then(json => {
                if (json.message) {
                    return this.setState({ peopleError: json.message });
                }
                this.setState({ people: json, peopleError: null })
            }).then(() => {
                // after second fetch call for all people,
                // run the looping setTimeout to simulate adoptions
                // alert can be removed later if necessary
                // while loop runs, set this.adopt to false, so buttons are disabled.
                this.simulateAdopts();

            }).catch(e => {
                this.setState({ peopleError: e.message });
            })
    }

    onAdopt = (type) => {
        if (this.state.people.length === 0) {
            return this.setState({ error: 'Add yourself to queue before you adopt' })
        }

        const deleteObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type
            })
        }

        fetch(`${config.SERVER_URL}/api/pets`, deleteObj)
            .then(res => res.json())
            .then(json => {
                const person = this.state.people.splice(0, 1)
                alert(`${person} adopted one of the ${type}!`)


                if (this.state.people[0] === this.state.currentUser) {
                    this.setState({
                        adopt: true,
                        people: this.state.people,
                        cat: json.cat || {},
                        dog: json.dog || {},
                        error: '',
                        peopleError: '',
                    })
                } else {
                    this.setState({
                        people: this.state.people,
                        cat: json.cat || {},
                        dog: json.dog || {},
                        error: '',
                        peopleError: '',
                        adopt: false,
                    });
                }
            }).then(() => {
                if (this.state.people.length > 4) {
                    setTimeout(this.simulateAdopts(), 5000);
                }
            })
    }


    findCurrentUser = (state) => {
        console.log(this.state);
        if (state.people) {
            // comparison
            return state.people[0] == state.currentUser;
        } else {
            // no one in queue
            return false;
        }
    }
    onAdoptWrapper = async (type) => {
        this.state.adopt = false;
        await this.simulateAdopts();
        this.state.adopt = true;
    }

    onNameFormSubmit = (event) => {
        // manual form submits
        event.preventDefault();
        const value = event.target[0].value;
        this.setState({ currentUser: value });

        const postObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person: value
            })
        }

        fetch(`${config.SERVER_URL}/api/people`, postObj)
            .then(res => res.json())
            .then(json => {
                fetch(`${config.SERVER_URL}/api/people`)
                    .then(res => res.json())
                    .then(json => {
                        if (json.message) {
                            return this.setState({ peopleError: json.message });
                        }
                        this.setState({ people: json, peopleError: null })
                    }).then(() => {
                        // queue people behind input
                        if (this.state.people.length === 1) {
                            setTimeout(this.simulateQueuing(), 5000);
                        }
                        if (this.state.people[0] === this.state.currentUser) {
                            this.setState({ adopt: true })
                        }
                    }).catch(e => {
                        this.setState({ peopleError: e.message });
                    })
                this.setState({ people: json })
            })
    }

    simulateAdopts() {
        this.state.adopt = false;
        for (let i = 0; i < this.state.people.length; i++) {
            setTimeout(this.adoptTimeouts(this.state.people[i], i), 1000);
        }
    }
    adoptTimeouts(person, i) {
        const petTypes = ['cats', 'dogs'];
        const index = Math.floor(Math.random() * petTypes.length);
        return setTimeout(() => {
            this.onAdopt(petTypes[index]);
        }, i * 5000)
    }

    simulateQueuing() {
        for (let i = 0; i < 4; i++) {
            setTimeout(this.queueTimeouts(i), 1000);
        }
    }
    queueTimeouts(i) {
        const names = ['Patrick', 'Sarah',
            'Hannah', 'Joshua', 'Moses', 'Buford',
            'Phineas', 'Ferb', 'Isabella', 'Candace',
            'Travis', 'Danielle', 'The King', 'The Queen',
            'The Prince', 'The Pauper', 'The Princess',
            'Matthew', 'Chris', 'Sandra', 'Constantine',
            'Babylon'
        ]
        const index = Math.floor(Math.random() * names.length);
        return setTimeout(() => {

            const value = names[index];

            const postObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    person: value
                })
            }
            /* SEPARATE FETCH CALL FROM NAMESUBMIT */
            fetch(`${config.SERVER_URL}/api/people`, postObj)
                .then(res => res.json())
                .then(json => {
                    fetch(`${config.SERVER_URL}/api/people`)
                        .then(res => res.json())
                        .then(json => {
                            if (json.message) {
                                return this.setState({ peopleError: json.message });
                            }
                            this.setState({ people: json, peopleError: null, })
                        }).then(() => {
                            // queue people behind input
                            if (this.state.people.length === 1) {
                                this.simulateQueuing();
                            }
                            if (this.state.people[0] === this.state.currentUser) {
                                this.setState({adopt: true,});
                            } else {
                                this.setState({adopt: false});
                            }
                        }).catch(e => {
                            this.setState({ peopleError: e.message });
                        })
                    this.setState({ people: json })
                })
        }, i * 5000);
    }

    render() {
        return (
            <div className="adoption-list">
                <div className="animal-box">
                    <Animal animal={this.state.cat} />
                    <button disabled={!this.state.adopt} onClick={e => this.onAdoptWrapper('cats')}>Adopt</button>
                </div>
                <div>
                    <People onFormSubmit={this.onNameFormSubmit} people={this.state.people}
                        peopleError={this.state.peopleError}
                    />
                    <h5>
                        {(!this.state.people.length) ? 'Add yourself to queue before you adopt' : this.state.error}
                        <br />
                        {/* {(this.findCurrentUser()) ? '' : 'Wait for your turn'} */}
                    </h5>
                </div>
                <div className="animal-box">
                    <Animal animal={this.state.dog} />
                    <button disabled={!this.state.adopt} onClick={e => this.onAdoptWrapper('dogs')}>Adopt</button>
                </div>
            </div>
        )
    }
}

export default Adoption;