import * as fs from 'fs'

const locationIDsGroup1: number[] = []
const locationIDsGroup2: number[] = [] 

//reading file with both locationID lists
const file = fs.readFileSync("./src/inputs.txt", "utf-8")

//parse lists out of file
file.trim().split("\n").forEach( row => {
  const [left, right] = row.split(/\s+/)
  locationIDsGroup1.push(Number(left))
  locationIDsGroup2.push(Number(right))
})

//sort both list from smallest to largest
locationIDsGroup1.sort()
locationIDsGroup2.sort()

//ensure both lists are equal length to ensure numbers can be compared
if(locationIDsGroup1.length !== locationIDsGroup2.length) {
  throw new Error("To compare distances, both lists need to be the same length")
}

//get the absolute value difference between the 2 values per row and total the values
const totalDistance = locationIDsGroup1
  .map((Id, index) => Math.abs(Id - locationIDsGroup2[index]))
  .reduce((previousTotal, currentValue) => previousTotal + currentValue, 0)

//Part 1 Answer
console.log("Part 1 answer", totalDistance)

//get the frequency of group 2 list
const group2Fequency = new Map<number, number>()
locationIDsGroup2.forEach(id => {

  //if id hasn't been seen before, start count at 0
  const frequency = group2Fequency.get(id) ?? 0
  group2Fequency.set(id, frequency + 1)
})

const similarityScore = locationIDsGroup1.map(id => {
  //if the id doesn't exist in in group2, we are multiplying 0
  const group2Count = group2Fequency.get(id) ?? 0
  return id * group2Count
}).reduce((previousTotal, currentValue) => previousTotal + currentValue, 0)

//Part 2 Answer
console.log("Part 2 answer", similarityScore)



