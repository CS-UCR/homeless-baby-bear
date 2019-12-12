import React, { Component } from 'react'

export class addressRows extends Component {
    render() {
        let rows = this.props.data.map(
            (row, index) => 
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.address}</td>
                <td>{row.date.slice(0,10)}</td>
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
