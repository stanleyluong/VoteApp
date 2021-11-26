import React, { useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
const NewPoll = props => {
    const candidateName1 = useRef()
    const candidateName1URL = useRef()
    const candidateName2 = useRef()
    const candidateName2URL = useRef()
    const promptRef = useRef()
    const [loading, setLoading] = useState(false)

    const sendToBlockChain = async () => {
        if(window.accountId !== ''){
            setLoading(true)
            console.log('candidatename1',candidateName1)
            console.log('candidateurl1',candidateName1URL)
            console.log('candidatename2',candidateName2)
            console.log('candidateurl2',candidateName2URL)
            console.log('promptref', promptRef)
            await window.contract.addUrl({
                name: candidateName1.current.value,
                url: candidateName1URL.current.value
            })
    
            await window.contract.addUrl({
                name: candidateName2.current.value,
                url: candidateName2URL.current.value
            })
    
            await window.contract.addCandidatePair({
                prompt: promptRef.current.value,
                name1: candidateName1.current.value,
                name2: candidateName2.current.value
            })
    
            await window.contract.addToPromptArray({prompt:promptRef.current.value})
            setLoading(false)
            let home = window.location.href
            let newLoc = home.substring(0, home.length-7)
            window.location.replace(newLoc)
        } else {
            alert('Please login to create a new poll')
        }
    }

    return (
        <Container style={{ marginTop: '10px' }}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 1 Name
                    </Form.Label>
                    <Form.Control placeholder="Enter Candidate Name" ref={candidateName1}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 1 Image URL
                    </Form.Label>
                    <Form.Control ref={candidateName1URL} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 2 Name
                    </Form.Label>
                    <Form.Control placeholder="Enter Candidate Name" ref={candidateName2}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 2 Image URL
                    </Form.Label>
                    <Form.Control ref={candidateName2URL} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={promptRef} placeholder="Enter Description"></Form.Control>
                </Form.Group>
            </Form>
            {loading ? 
            <Button className="btn btn-primary" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Sending to blockchain
            </Button>
            :
            <Button onClick={sendToBlockChain}  className="btn btn-primary" >
                Submit
            </Button>
            }
        </Container>
    );
};

export default NewPoll;