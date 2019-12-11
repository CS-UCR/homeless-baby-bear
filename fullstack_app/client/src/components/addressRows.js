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
}

export default addressRows
