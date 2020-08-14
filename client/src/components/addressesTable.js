import React, { Component } from 'react';
import AddressRows from './addressRows';

export class addressesTable extends Component {
    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mail id #</th>
                        <th>Address</th>
                        <th>Date sent</th>
                    </tr>
                </thead>
                <AddressRows data={this.props.data} />
            </table>
        );
    }
}

export default addressesTable;
