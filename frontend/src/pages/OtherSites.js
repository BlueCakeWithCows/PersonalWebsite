import React from "react";
import {Container, Jumbotron} from "react-bootstrap";
import {Navigation} from "../components/Navigation";

export class OtherSites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {websites: [{full_name: 'loading', nickname: 'loading', url: '#'}]}
    }

    render() {
        const sites = this.state.websites;
        const listSites = sites.map((x) =>
            <li key={x['nickname']}><a href={x['url']}> {x['nickname']}</a></li>
        );
        return (
            <div className="App">
                <Navigation/>
                <header className="App-header">
                    <Container className="p-3">
                        <Jumbotron>
                            <ul className="list-unstyled">{listSites}</ul>
                        </Jumbotron>
                    </Container>
                </header>
            </div>
        );
    }

    componentDidMount() {
        this.getFavoriteWebsites().then((array) => {
            this.setState({websites: array});
        });
    }

    async getFavoriteWebsites() {
        return fetch('/websites_list/api/websites/')
            .then((res) => res.json())
            .then(data => (data))
            .catch((err) => 'D:');
    }
}