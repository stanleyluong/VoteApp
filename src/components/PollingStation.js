import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import LoadingPic from '../assets/profile-logo.png'
const PollingStation = props => {

    const [candidate1URL, setCandidate1URL] = useState(LoadingPic)
    const [candidate2URL, setCandidate2URL] = useState(LoadingPic)
    // const [isLoading, setIsLoading] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [candidate1votes, setCandidate1Votes] = useState('--')
    const [candidate2votes, setCandidate2Votes] = useState('--')

    useEffect(()=>{
        const getInfo = async () => {
            let voteCount = await window.contract.getVotes({
                prompt: localStorage.getItem('prompt')
            })
            setCandidate1Votes(voteCount[0])
            setCandidate2Votes(voteCount[1])
            console.log(localStorage.getItem('Candidate1'))
            console.log(localStorage.getItem('Candidate2'))
            setCandidate1URL(await window.contract.getUrl({name: localStorage.getItem('Candidate1')}))
            setCandidate2URL(await window.contract.getUrl({name: localStorage.getItem('Candidate2')}))
            let didUserVote = await window.contract.didParticipate({ prompt: localStorage.getItem('prompt'), user: window.accountId })
            setShowResults(didUserVote)
        }
        getInfo()
    })

    const addVote = async (index) => {
        await window.contract.addVote({ prompt: localStorage.getItem('prompt'), index: index})
        await window.contract.recordUser({ prompt: localStorage.getItem('prompt'), user: window.accountId })
        setShowResults(true)
    }

    return (
        <Container>
            <Row>
                <Col className="justify-content-center d-flex" >
                    <Container>
                        <Row style={{ marginTop: '5vg', backgroundColor: 'grey' }}>
                            <div style={{ display: 'flex',justifyContent: 'center',padding: '3vw'}}>
                                <img style={{height: '35vh',width: '20vw'}} src={candidate1URL}></img>
                            </div>
                        </Row>
                    {showResults ? (
                        <Row style={{ margin: '5vh' }} className="justify-content-center d-flex">
                            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '8vw', padding: '10px', backgroundColor: 'grey' }}>
                                {candidate1votes}
                            </div>
                        </Row>
                    ) : null}
                        <Row style={{ marginTop: '5vh'}}className="justify-content-center d-flex">
                            <Button disabled={showResults} onClick={() => addVote(0)}>Vote</Button>
                        </Row>
                    </Container>
                </Col>
                <Col className="justify-content-center d-flex align-items-center">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'grey',
                        height: '20vh',
                        alignItems: 'center',
                        padding: '2vh',
                        textAlign: 'center'
                    }}>
                        who would win
                    </div>
                </Col>
                <Col className="justify-content-center d-flex" >
                    <Container>
                        <Row style={{ marginTop: '5vg', backgroundColor: 'grey' }}>
                            <div style={{ display: 'flex',justifyContent: 'center',padding: '3vw'}}>
                                <img style={{height: '35vh',width: '20vw'}} src={candidate2URL}></img>
                            </div>
                        </Row>
                    {showResults ? (
                        <Row style={{ margin: '5vh' }} className="justify-content-center d-flex">
                            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '8vw', padding: '10px', backgroundColor: 'grey' }}>
                            {candidate2votes}
                            </div>
                        </Row>
                    ) : null}
                        <Row style={{ marginTop: '5vh'}}className="justify-content-center d-flex">
                            <Button disabled={showResults} onClick={() => addVote(1)}>Vote</Button>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default PollingStation;