import { Contract } from 'near-api-js';
import React, { useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
// import { math } from "near-sdk-as";

const NewPoll = props => {
    const candidate1NameRef = useRef()
    const candidate1URLRef = useRef()
    const candidate2NameRef = useRef()
    const candidate2URLRef = useRef()
    const descriptionRef = useRef()
    const [showSubmit, setShowSubmit] = useState(true)
    // const [showLoading, setShowLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (event) => {
        console.log('begin submit')
        event.preventDefault()
        setShowSubmit(false)
        setLoading(true)
        let newElection = {
            candidate1Name: candidate1NameRef.current.value,
            candidate2Name: candidate2NameRef.current.value,
            candidate1URL: candidate1URLRef.current.value,
            candidate2URL: candidate2URLRef.current.value,
            description: descriptionRef.current.value
        }
        console.log('candidate1Name',candidate1NameRef)
        console.log('candidate2Name',candidate2NameRef)
        console.log('candidate1URL',candidate1URLRef)
        console.log('candidate2URL',candidate2URLRef)
        console.log('description',descriptionRef)
        // let id = math.hash32<string>(description)
        let candidate1Name = candidate1NameRef.current.value
        let candidate2Name = candidate2NameRef.current.value
        let candidate1URL = candidate1URLRef.current.value
        let candidate2URL = candidate2URLRef.current.value
        let description = descriptionRef.current.value
        let candidate1Votes = 0
        // console.log('candidate1Votes',candidate1Votes)
        let candidate2Votes = 0
        let voters = []
        try {
            const election = await window.contract.create({
                // id: id,
                candidate1Name: candidate1NameRef.current.value,
                candidate2Name: candidate2NameRef.current.value,
                candidate1URL: candidate1URLRef.current.value,
                candidate2URL: candidate2URLRef.current.value,
                description: descriptionRef.current.value,
                candidate1Votes: 0,
                candidate2Votes: 0,
                voters: []
            })
            setLoading(false)
            console.log('election', election)
        } catch (error) {
            console.log(error)
        }
        
        // console.log(typeof(0))
        // const election = await window.contract.create( { candidate1Name, candidate2Name, candidate1URL, candidate2URL, description, candidate1Votes, candidate2Votes, voters })
       
    }

    // const sendToBlockChain = async () => {
    //     // console.log('candidatename1',candidateName1)
    //     // console.log('candidateurl1',candidateName1URL)
    //     // console.log('candidatename2',candidateName2)
    //     // console.log('candidateurl2',candidateName2URL)
    //     // console.log('promptref', promptRef)
    //     setShowSubmit(false)
    //     setLoading(true)
    //     await window.contract.addUrl({
    //         name: candidate1NameRef.current.value,
    //         url: candidate1URLRef.current.value
    //     })

    //     await window.contract.addUrl({
    //         name: candidate2NameRef.current.value,
    //         url: candidate2URLRef.current.value
    //     })

    //     await window.contract.addCandidatePair({
    //         prompt: descriptionRef.current.value,
    //         name1: candidate1NameRef.current.value,
    //         name2: candidate2NameRef.current.value
    //     })
    //     await window.contract.addToPromptArray({prompt:descriptionRef.current.value})
    //     console.log('windowlocationhref',window.location.href)
    //     window.location.replace(window.location.href+'/')
    //     console.log('windowlocationhref',window.location.href)
    // }

    return (
        <Container style={{ marginTop: '10px' }}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 1 Name
                    </Form.Label>
                    <Form.Control placeholder="Enter Candidate Name" ref={candidate1NameRef}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 1 Image URL
                    </Form.Label>
                    <Form.Control ref={candidate1URLRef} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 2 Name
                    </Form.Label>
                    <Form.Control placeholder="Enter Candidate Name" ref={candidate2NameRef}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Candidate 2 Image URL
                    </Form.Label>
                    <Form.Control ref={candidate2URLRef} placeholder="Enter Image URL"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} placeholder="Add Description"></Form.Control>
                </Form.Group>
            </Form>

            {showSubmit && <Button onClick={handleSubmit} variant='primary'>Submit</Button>}
            {loading && <div className="spinner-border" role="status"><span className="visually-hidden"></span>
            </div>}
        </Container>
    );
};

export default NewPoll;