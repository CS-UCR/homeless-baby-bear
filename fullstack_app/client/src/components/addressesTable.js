import React, { Component } from 'react';
import AddressRows from './addressRows';

export class addressesTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Mail id #</th>
                        <th>Address</th>
                        <th>Date sent</th>
                    </tr>
                </thead>
                <AddressRows state={this.props.state}/>
            </table>
        )
    }
}

export default addressesTable
