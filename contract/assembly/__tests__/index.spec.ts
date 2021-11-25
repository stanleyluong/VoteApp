// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
import { Election, elections } from "../model";

describe("contract methods", () => {
  it("creates a election", () => {
    // call the create method
    let candidate1Name = "Goku"
    let candidate2Name = "superman"
    let candidate1URL = ""
    let candidate2URL = ""
    let description = "Goku vs Superman"
    let candidate1Votes = 0
    let candidate2Votes = 0
    let voters: string[] = []
    const newElection = new Election(description, candidate1Name, candidate2Name, candidate1URL, candidate2URL, candidate1Votes, candidate2Votes, voters)
    const election = create(description, candidate1Name, candidate2Name, candidate1URL, candidate2URL, candidate1Votes, candidate2Votes, voters);

    // lookup in the PersistentUnorderedMap for our todo
    // expect the persisted todo to equal the todo returned
    // by the create method above.
    expect(elections.getSome(election.id)).toStrictEqual(election);
  });
});