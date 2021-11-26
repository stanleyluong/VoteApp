import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap'

const Home = props => {

    const [promptsState, setPromptsState] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
            getPrompts()
    }, [])

    const getPrompts = async () => {
        let prompts = await window.contract.getAllPrompt()
        console.log(prompts)
        setPromptsState(prompts)
    }

    const handleDeletePoll = async (promptToDelete) => {
        if(window.accountId !== ''){
            setLoading(true)
            console.log('prompt to delete', prompt)
            console.log('promptsState',promptsState)
            let newPromptsState = promptsState.filter((prompt)=>{
                return prompt!== promptToDelete
            })
            console.log('newPromptsState',newPromptsState)
            try {
                const prompts = await window.contract.setPrompts({prompts:newPromptsState})
                setPromptsState(prompts)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        } else {
            alert('Please login to delete')
        }
    }
    return (
        <div>
            <Container>
                <Table className="center" style={{ margin: "5vh" }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List of Polls</th>
                            <th>Go to Poll</th>
                            <th>Delete a Poll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promptsState.map((el,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{el}</td>
                                    <td>{loading ? 
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                        :
                                        <Button disabled={loading} onClick={()=>props.changeCandidates(el)}>Go Vote</Button>
                                        }
                                    </td>
                                    <td> {loading ? 
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                        :
                                        <Button disabled={loading} onClick={()=>handleDeletePoll(el)}>Delete Poll</Button>
                                        }
                                    </td>  
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Home;