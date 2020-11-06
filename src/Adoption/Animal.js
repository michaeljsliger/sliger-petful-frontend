import React from 'react';
import './Animal.css';

class Animal extends React.Component {

    render() {
        const theAnimal = this.props.animal;
            return (
                <div className="animal-individual">
                <div>
                { `${theAnimal.name}, ${theAnimal.breed}` }
                </div>
                <div>
                { `${theAnimal.gender}, ${theAnimal.age}`}
                </div>
                <div>
                <img src={theAnimal.imageURL} alt={theAnimal.breed} />
                </div>
                <div>
                { theAnimal.story }
                </div>
            </div>
        )
    
    }
}

export default Animal;