import React, { Component } from 'react';

class Introduction extends Component {
    render() {
        const picture = (
            <img
                className="img-responsive "
                src={`https://c.slashgear.com/wp-content/uploads/2017/08/pokemongoevent.jpg`}
                alt={`Pokemon`}
            />
        );
        return (
            <div>
                {picture}
            </div>
        )
    }
}

export default Introduction;