import React from "react";
import {Navigation} from "../components/Navigation";
import {Button} from "react-bootstrap";
import {AiOutlineDownload} from "react-icons/ai";

export class Resume extends React.Component {
    render() {
        return (
            <div className="App">
                <Navigation/>
                <div className='pdf-embed-container'>
                    <embed type="application/pdf"
                           src="resume.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0"
                           className={'pdf-embed'}/>
                    <Button href="resume.pdf" download className={'download-button'}><AiOutlineDownload/></Button>
                </div>
            </div>
        );
    }
}