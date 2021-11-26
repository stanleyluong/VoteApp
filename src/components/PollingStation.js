import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import LoadingPic from '../assets/profile-logo.png'
import './styles.css'
const PollingStation = props => {

    const [candidate1URL, setCandidate1URL] = useState(LoadingPic)
    const [candidate2URL, setCandidate2URL] = useState(LoadingPic)
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [showVoteButton, setShowVoteButton] = useState(true)
    const [candidate1votes, setCandidate1Votes] = useState('--')
    const [candidate2votes, setCandidate2Votes] = useState('--')
    const [prompt, setPrompt] = useState('--')

    useEffect(()=>{
        const getInfo = async () => {
            let voteCount = await window.contract.getVotes({
                prompt: localStorage.getItem('prompt')
            })
            console.log('voteCount',voteCount)
            setCandidate1Votes(voteCount[0])
            setCandidate2Votes(voteCount[1])
            console.log(localStorage.getItem('Candidate1'))
            console.log(localStorage.getItem('Candidate2'))
            setCandidate1URL(await window.contract.getUrl({name: localStorage.getItem('Candidate1')}))
            setCandidate2URL(await window.contract.getUrl({name: localStorage.getItem('Candidate2')}))
            let didUserVote = await window.contract.didParticipate({ prompt: localStorage.getItem('prompt'), user: window.accountId })
            console.log('didUserVote',didUserVote)
            setShowResults(didUserVote)
            setShowVoteButton(!didUserVote)
            setPrompt(localStorage.getItem('prompt'))
        }
        getInfo()
    })

    const addVote = async (index) => {
        if(window.accountId !== ''){
            setShowVoteButton(false)
            setIsLoading(true)
            await window.contract.addVote({ prompt: localStorage.getItem('prompt'), index: index})
            await window.contract.recordUser({ prompt: localStorage.getItem('prompt'), user: window.accountId })
            setShowResults(true)
            setIsLoading(false)
        } else {
            alert('Please login to vote')
        }
    }

    return (
        <Container className="container">
             <Row>
                 <Col className="justify-content-center d-flex align-items-center">
                    <div className="description">
                        {prompt}
                    </div>
                </Col>
            </Row>
            <div className="img-row-outer-div">
                <Row className="img-row" >
                    <Col className="img-col" >
                        <img className="img" src={candidate1URL}></img>
                    </Col>
                    <Col className="img-col" >
                        <img className="img" src={candidate2URL}></img>
                    </Col>
                </Row>
            </div>
            <Row className="button-row">
            {showResults &&
            <>
                <Col>Votes: {candidate1votes}</Col>
                <Col>Votes: {candidate2votes}</Col>
            </>
            }
            {showVoteButton &&
            <>
                <Col>
                    <Button disabled={isLoading} onClick={() => addVote(0)}>
                        Vote
                    </Button>
                </Col>
                <Col>
                    <Button disabled={isLoading} onClick={() => addVote(1)}>
                        Vote
                    </Button>
                </Col>
            </>
            }
            {isLoading &&
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
            }
            
            
            
            </Row>
            {/* <Row>
            {showResults ? (
                        <Col className="justify-content-center d-flex">
                            <div className="vote-count">
                                {candidate1votes}
                            </div>
                        </Col>
                    ) : null}
                        <Col className="justify-content-center d-flex">
                            <Button disabled={showResults} onClick={() => addVote(0)}>Vote</Button>
                        </Col>
            {showResults ? (
                        <Col className="justify-content-center d-flex">
                            <div className="vote-count">
                            {candidate2votes}
                            </div>
                        </Col>
                    ) : null}
                        <Col className="justify-content-center d-flex">
                            <Button disabled={showResults} onClick={() => addVote(1)}>Vote</Button>
                        </Col>
            </Row> */}

           
        </Container>
    );
};

export default PollingStation;
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap'
// import LoadingPic from '../assets/profile-logo.png'
// const PollingStation = props => {

//     const [candidate1URL, setCandidate1URL] = useState(LoadingPic)
//     const [candidate2URL, setCandidate2URL] = useState(LoadingPic)
//     // const [isLoading, setIsLoading] = useState(true)
//     const [showResults, setShowResults] = useState(false)
//     const [candidate1votes, setCandidate1Votes] = useState('--')
//     const [candidate2votes, setCandidate2Votes] = useState('--')

//     useEffect(()=>{
//         const getInfo = async () => {
//             let voteCount = await window.contract.getVotes({
//                 prompt: localStorage.getItem('prompt')
//             })
//             setCandidate1Votes(voteCount[0])
//             setCandidate2Votes(voteCount[1])
//             console.log(localStorage.getItem('Candidate1'))
//             console.log(localStorage.getItem('Candidate2'))
//             setCandidate1URL(await window.contract.getUrl({name: localStorage.getItem('Candidate1')}))
//             setCandidate2URL(await window.contract.getUrl({name: localStorage.getItem('Candidate2')}))
//             let didUserVote = await window.contract.didParticipate({ prompt: localStorage.getItem('prompt'), user: window.accountId })
//             setShowResults(didUserVote)
//         }
//         getInfo()
//     })

//     const addVote = async (index) => {
//         await window.contract.addVote({ prompt: localStorage.getItem('prompt'), index: index})
//         await window.contract.recordUser({ prompt: localStorage.getItem('prompt'), user: window.accountId })
//         setShowResults(true)
//     }

//     return (
//         <Container>
//             <Row>
//                 <Col className="justify-content-center d-flex" >
//                     <Container>
//                         <Row style={{ marginTop: '5vg', backgroundColor: 'grey' }}>
//                             <div style={{ display: 'flex',justifyContent: 'center',padding: '3vw'}}>
//                                 <img style={{height: '35vh',width: '20vw'}} src={candidate1URL}></img>
//                             </div>
//                         </Row>
//                     {showResults ? (
//                         <Row style={{ margin: '5vh' }} className="justify-content-center d-flex">
//                             <div style={{ display: 'flex', justifyContent: 'center', fontSize: '8vw', padding: '10px', backgroundColor: 'grey' }}>
//                                 {candidate1votes}
//                             </div>
//                         </Row>
//                     ) : null}
//                         <Row style={{ marginTop: '5vh'}}className="justify-content-center d-flex">
//                             <Button disabled={showResults} onClick={() => addVote(0)}>Vote</Button>
//                         </Row>
//                     </Container>
//                 </Col>
//                 <Col className="justify-content-center d-flex align-items-center">
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         backgroundColor: 'grey',
//                         height: '20vh',
//                         alignItems: 'center',
//                         padding: '2vh',
//                         textAlign: 'center'
//                     }}>
//                         who would win
//                     </div>
//                 </Col>
//                 <Col className="justify-content-center d-flex" >
//                     <Container>
//                         <Row style={{ marginTop: '5vg', backgroundColor: 'grey' }}>
//                             <div style={{ display: 'flex',justifyContent: 'center',padding: '3vw'}}>
//                                 <img style={{height: '35vh',width: '20vw'}} src={candidate2URL}></img>
//                             </div>
//                         </Row>
//                     {showResults ? (
//                         <Row style={{ margin: '5vh' }} className="justify-content-center d-flex">
//                             <div style={{ display: 'flex', justifyContent: 'center', fontSize: '8vw', padding: '10px', backgroundColor: 'grey' }}>
//                             {candidate2votes}
//                             </div>
//                         </Row>
//                     ) : null}
//                         <Row style={{ marginTop: '5vh'}}className="justify-content-center d-flex">
//                             <Button disabled={showResults} onClick={() => addVote(1)}>Vote</Button>
//                         </Row>
//                     </Container>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default PollingStation;