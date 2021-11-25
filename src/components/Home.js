import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap'

const Home = props => {

    const [promptsState, setPromptsList] = useState([])

    useEffect(()=>{
            getPrompts()
    }, [])

    const getPrompts = async () => {
        let prompts = await window.contract.getAllPrompt()
        console.log(prompts)
        setPromptsList(prompts)
    }

    const handleDeletePoll = async (prompt) => {
        console.log('prompt to delete', prompt)
        await window.contract.deletePrompt({prompt})
    }
    return (
        <div>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr className="home-headers">
                            <th>#</th>
                            <th>List of Polls</th>
                            <th>Go to Poll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promptsState.map((el,index)=>{
                            return (
                                <tr className="home-button-row" key={index}>
                                    <td>{index+1}</td>
                                    <td>{el}</td>
                                    <td><Button onClick={()=>props.changeCandidates(el)}>Go Vote</Button></td>
                                    <td><Button onClick={()=>handleDeletePoll(el)}>Delete Poll</Button></td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Home;