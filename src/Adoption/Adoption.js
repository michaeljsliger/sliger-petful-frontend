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
                this.setState({
                    people: this.state.people,
                    cat: json.cat || {},
                    dog: json.dog || {},
                    error: '',
                    peopleError: '',
                });
            })
    }

    onNameFormSubmit = (event) => {
        event.preventDefault();
        const value = event.target[0].value;

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
                    }).catch(e => {
                        this.setState({ peopleError: e.message });
                    })
                this.setState({ people: json })
            })
    }

    render() {
        return (
            <div className="adoption-list">
                <div className="animal-box">
                    <Animal animal={this.state.cat} />
                    <button onClick={e => this.onAdopt('cats')}>Adopt</button>
                </div>
                <div>
                    <People onFormSubmit={this.onNameFormSubmit} people={this.state.people}
                        peopleError={this.state.peopleError}
                    />
                    <h5>
                        {this.state.error}
                    </h5>
                </div>
                <div className="animal-box">
                    <Animal animal={this.state.dog} />
                    <button onClick={e => this.onAdopt('dogs')}>Adopt</button>
                </div>
            </div>
        )
    }
}

export default Adoption;