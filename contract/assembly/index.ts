// contract/assembly/index.ts
import { Election, elections } from "./model";
import { logging, PersistentUnorderedMap, math } from 'near-sdk-as'

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(
    // id: i32,
    candidate1Name: string, 
    candidate2Name: string, 
    candidate1URL: string, 
    candidate2URL: string, 
    description: string, 
    candidate1Votes: i32, 
    candidate2Votes: i32, 
    voters: string[]
    ): Election {
      // if(elections.contains('elections')){

      // }
      // const election = {
      //               id: math.hash32<string>(description),
      //               candidate1Name: candidate1Name,
      //               candidate2Name: candidate2Name,
      //               candidate1URL: candidate1URL,
      //               candidate2URL: candidate2URL,
      //               description: description,
      //               candidate1Votes: candidate1Votes,
      //               candidate2Votes: candidate2Votes,
      //               voters: voters
      //           }
      // let id = math.hash32<string>(description)
      // elections.set(id, election)
    //   elections.set(id, {
    //     candidate1Name: candidate1Name,
    //     candidate2Name: candidate2Name,
    //     candidate1URL: candidate1URL,
    //     candidate2URL: candidate2URL,
    //     description: description,
    //     candidate1Votes: 0,
    //     candidate2Votes: 0,
    //     voters: []
    // })
      logging.log('in create')
  // let candidate1Name = election.candidate1Name
  // let candidate2Name = election.candidate2Name
  // let candidate1URL = election.candidate1URL
  // let candidate2URL = election.candidate2URL
  // let description = election.description
  // let voters: string[] = []
  // let candidate1Votes = 0
  // let candidate2Votes = 0
  // use the Todo class to persist the todo data
  // logging.log('in create')
  // logging.log(candidate1Name)
  // logging.log(candidate2Name)
  // logging.log(candidate1URL)
  // logging.log(candidate2URL)
  // logging.log(description)
        // let id = math.hash32<string>(description)

  return Election.insert(
    candidate1Name,
    candidate2Name,
    candidate1URL,
    candidate2URL,
    description, 
    // 0, 0, []
    candidate1Votes,
    candidate2Votes,
    voters
    );
}


//above this line is testing Election model and crud functions

const CandidateURL = new PersistentUnorderedMap<string,string>("CandidateURL")
const CandidatePair = new PersistentUnorderedMap<string,string[]>("Candidate Pair")
const PromptArray = new PersistentUnorderedMap<string,string[]>("AllArrays")
const VoteArray = new PersistentUnorderedMap<string,i32[]>("stores votes ")
const UserParticipation = new PersistentUnorderedMap<string,string[]>('user Participation Record')

//view


export function getUrl(name:string):string{
  if(CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  } else {
    logging.log('cant find user: ' + name)
    return ''
  }
}

export function didParticipate(prompt:string, user:string):bool{
  if(UserParticipation.contains(prompt)){
    let getArray = UserParticipation.getSome(prompt)
    return getArray.includes(user)
  } else {
    logging.log('prompt not found')
    return false
  }
}

export function getAllPrompt():string[]{
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome('AllArrays')
  } else {
    logging.log('no prompts found')
    return []
  }
}

export function getVotes(prompt:string):i32[]{
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt)
  } else {
    logging.log('prompt not found for this vote')
    return [0,0]
  }
}

export function getCandidatePair(prompt:string):string[]{
  if(CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt)
  } else {
    logging.log('prompt not found')
    return []
  }
}
//change

export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url)
  logging.log(`Set ${url} for ${name}`)
}

export function addCandidatePair(prompt:string, name1:string, name2:string):void{
  CandidatePair.set(prompt, [name1, name2])
  logging.log('added candidate pair' + prompt)
}

export function addToPromptArray(prompt:string):void{
  logging.log(PromptArray)
  if(PromptArray.contains('AllArrays')){
    let tempArray = PromptArray.getSome('AllArrays')
    tempArray.push(prompt)
    PromptArray.set('AllArrays',tempArray)
  } else {
    PromptArray.set('AllArrays',[prompt])
  }
  logging.log('added to prompt array')
}

export function deletePrompt(prompt:string):void{
  logging.log('in deletePrompt function')
  logging.log(prompt)

  PromptArray.delete(prompt)
  // if(PromptArray.contains('AllArrays')){
  //    let prompts = PromptArray.getSome('AllArrays')
    //  prompts = prompts.filter((poll) => poll !== prompt)
    //cant filter, must find delete function in docs
  //    PromptArray.set('AllArrays',prompts)
  // } else {
  //   logging.log('no prompts found')
    // return []
  // }
}

export function addVote(prompt:string,index:i32):void{
  if(VoteArray.contains(prompt)){
    let tempArray = VoteArray.getSome(prompt)
    let tempVal = tempArray[index]
    let newVal = tempVal+1
    tempArray[index] = newVal
    VoteArray.set(prompt,tempArray)
  } else {
    let newArray = [0,0]
    newArray[index]=1
    VoteArray.set(prompt, newArray)
  }
}

export function recordUser(prompt:string,user:string):void{
  if(UserParticipation.contains(prompt)){
    let tempArray = UserParticipation.getSome(prompt)
    tempArray.push(user)
    UserParticipation.set(prompt,tempArray)
  } else {
    UserParticipation.set(prompt,[user])
  }

}