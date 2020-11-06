import React from 'react';
import './people.css';

class People extends React.Component {





    render() {
        const peopleArr = this.props.people.map((el, index) => {
            return <div key={index} className="people-item">{el}</div>
        })

        return (
            <div>
                <div>
                    <form onSubmit={event => this.props.onFormSubmit(event)}>
                        <label htmlFor="person-input">Get in line:</label>
                        <input type="text" id="person-input" name="person-input" required 
                        placeholder="Your name here!"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <h5>
                    {this.props.peopleError}
                </h5>
                {peopleArr}
            </div>
        )
    }
}

export default People;