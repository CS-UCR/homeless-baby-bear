import React, { Component } from 'react'

export class addressRows extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let rows = this.props.data.map(
            (row) => 
            <tr>
                <td>{row.id}</td>
                <td>{row.address}</td>
                <td>{row.date}</td>
            </tr>
        )
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    getRows = () => {
        let addresses = [];

        // Here order is up to you guys.
        addresses.push({mailID: 1, address: "123 Sesame St", date: "January 1, 2019"});
        addresses.push({mailID: 2, address: "123 Sesame St", date: "January 1, 2019"});
        addresses.push({mailID: 3, address: "123 Sesame St", date: "January 1, 2019"});
        addresses.push({mailID: 1, address: "123 Sesame St", date: "January 1, 2019"});
        addresses.push({mailID: 2, address: "123 Sesame St", date: "January 1, 2019"});
        addresses.push({mailID: 3, address: "123 Sesame St", date: "January 1, 2019"});

        return addresses;
    }
}

export default addressRows
