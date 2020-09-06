import React from 'react'
import Row from "../row"
import {PersonDetails, PersonList} from "../sw-components";

export default class PeoplesPage extends React.Component {

    state = {
        selectedItem: 3
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem});
    };

    render() {
        return (
            <Row
                left={<PersonList onItemSelected={this.onItemSelected}/>}
                right={<PersonDetails itemId={this.state.selectedItem}/>}
            />
        )
    }
}