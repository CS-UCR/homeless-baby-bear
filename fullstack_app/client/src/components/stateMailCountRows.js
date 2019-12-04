import React, { Component } from 'react'

export class stateMailCountRows extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let rows = this.props.state.states_array.map(
            (row) => 
            <tr>
                <td>{row.label}</td>
                <td>{row.data}</td>
            </tr>
        )

        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    // query the database for the states and the mail sent to each one
    getRows = () => {
        let stateMailCount = [];

        // Populate the array with objects ordered by the top state(most mail) to the bottom state(least mail)
        // Don't include states with 0. 
        // Objects will have two properties state and mailCount
        stateMailCount.push({state: "California", mailCount: 13});
        stateMailCount.push({state: "Nevada", mailCount: 8});
        stateMailCount.push({state: "Ohio", mailCount: 4});

        return stateMailCount;
    }
}

export default stateMailCountRows