import React from "react";
import {Container, Image, Jumbotron} from "react-bootstrap";
import {Navigation} from "../components/Navigation";

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {riddle: 'Why did the chicken cross the road?'};
    }


    componentDidMount() {
        this.getJokes().then((array) => {
            this.setState({riddle: array[randomInteger(0, array.length)]['joke']});
        }).catch();
    }

    async getJokes() {
        return fetch('/websites_list/api/joke/')
            .then((res) => res.json())
            .then(data => data);
    }

    render() {
        return (
            <div className="App">
                <Navigation/>

                <header className="App-header">
                    <div className={'text-center mb-2'}>
                        <div className={'display-inline'}><p
                            className={'quote'}>{this.state.riddle}</p>
                        </div>
                    </div>
                    <Container>
                        {/*<h1 className="header"><pre>MASON KOHLS</pre></h1>*/}

                        <Jumbotron className={'biography'}>
                            <Container className={'clearfix'} align='left'>
                                <Image src={'photograph.jpg'} style={{width: '60%'}} fluid={true}
                                       className={'float-left mr-3'}/>
                                <h2>Mason Kohls</h2>
                                <p>
                                    Programmer by day, general nerd all the time.<br/>
                                    I am currently studying at the University of California, Berkeley majoring in
                                    Computer Science, Physics, and Mathematics.<br/>
                                    Some of my interests are powerlifting, bouldering, super smash brothers, reading,
                                    and baking.
                                </p>
                            </Container>
                        </Jumbotron>
                    </Container>
                </header>
            </div>
        );
    }
}