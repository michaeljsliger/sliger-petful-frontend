import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
    <div className="home">
        <img src="https://wishbonepetrescue.org/wp-content/uploads/sites/45/2014/10/Wishbone-Adopt-homepg-2.jpg" alt="Necessary pet image"/>
        <br />
        <h3>The adoption process:</h3>
        <p>Click below to view the pets up for adoption.</p>
        <br />
        <p>Add your name to the waitlist in the center, and click adopt</p>
        <p>below the pet you'd like to adopt.</p>
        <br />
        <p>The pets are displayed in a FIFO Queue data structure,</p>
        <p>and clicking adopt will cycle to the next pet available</p>
        <br />
        <p>Once the queue is empty, the server automatically refills</p>
        <p>the dummy data back into the queue, so there are no gaps.</p>
        <br />
        <p>Find your next friend!</p>
        <Link to="/adopt"><button>Adopt!</button></Link>
    </div>
    )}

export default Home