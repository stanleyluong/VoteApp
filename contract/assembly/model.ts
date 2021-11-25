// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

// Think of this PersistentUnorderedMap like a database table.
// We'll use this to persist and retrieve data.
export const elections = new PersistentUnorderedMap<u32, Election>("elections");

// Think of this like a model class in something like mongoose or
// sequelize. It defines the shape or schema for our data. It will
// also contain static methods to read and write data from and to
// the todos PersistentUnorderedMap.
@nearBindgen
export class Election {
  id: u32
  candidate1Name: string
  candidate2Name: string
  candidate1URL: string
  candidate2URL: string
  description: string
  candidate1Votes: i32
  candidate2Votes: i32
  voters: string[]

  constructor( candidate1Name: string, candidate2Name: string, candidate1URL: string, candidate2URL: string, description: string, candidate1Votes: i32, candidate2Votes: i32, voters: string[]) {
    this.id = math.hash32(description)
    this.candidate1Name = candidate1Name
    this.candidate2Name = candidate2Name
    this.candidate1URL = candidate1URL
    this.candidate2URL = candidate2URL  
    this.description = description
    this.candidate1Votes =  0
    this.candidate2Votes = 0
    this.voters = []
  }

  static insert( candidate1Name: string, candidate2Name: string, candidate1URL: string, candidate2URL: string, description: string,  candidate1Votes: i32, candidate2Votes: i32,voters: string[]): Election {
    const election = new Election( candidate1Name, candidate2Name, candidate1URL, candidate2URL, description, candidate1Votes, candidate2Votes, voters)
    elections.set(election.id, election)
    return election
    }
}