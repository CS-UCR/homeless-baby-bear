import React, { Component } from 'react';
import StateMailCountRows from './stateMailCountRows';

export class stateMailCountTable extends Component {
    render() {
        return (
            <div className="main-header" id="state-count-container">
                table with state and the total number of mail from them
                <table>
                    <thead>
                        <tr>
                            <th>State</th>
                            <th>Mail count</th>
                        </tr>
                    </thead>
                    <StateMailCountRows />
                </table>
            </div>
        )
    }
}

export default stateMailCountTable