import * as fs from 'fs'

//gets the file with both the available towel patterns and the design lines
const file = fs.readFileSync("./src/inputs/day19Inputs.txt", "utf-8")

//breaks the file into their indiviual rows
const rows = file.trim().split("\n")

//removes the pattern row
const patternRow = rows.shift()

if(!patternRow) {
    throw new Error("The available pattern row is missing")
}

//converts pattern row into an array of patterns
const availablePatterns = patternRow.split(",").map(pattern => pattern.trim())

// remove the blank space row
if (!rows[0]) {
    rows.shift()
}

const isDesignPossible = (design: string) => {
    //This is the possibility tracker if the final bool is true, the pattern is possible
    //in the first example 'brwrr' the array will look like this [t, t, t, f, t, t]
    //the false is because the 'w' is not possible but 'wr' makes it possible
    //if wr was not the rest of the array would be false
    const possibilityTracker = new Array<boolean>(design.length + 1).fill(false)
    possibilityTracker[0] = true

    for (let i = 0; i < design.length; i++) {
        if(!possibilityTracker[i]) continue

        //we want to find all possible patterns instead of just the first one
        //this is because some patterns may prevent later patterns from working
        availablePatterns.forEach(pattern => {
            if(design.slice(i, i + pattern.length) === pattern) {
                possibilityTracker[i + pattern.length] = true
            }
        })
    }
    return possibilityTracker[design.length]
}

const possibleDesigns = rows.filter(design => isDesignPossible(design))
   
console.log("Day 19 - part 1 answer", possibleDesigns.length)


const getTotalpossibleCombinations = (design: string) => {
    //changed possibilityTacker to number to count instead of just possible
    const possibilityTracker = new Array<number>(design.length + 1).fill(0)
    possibilityTracker[0] = 1

    for (let i = 0; i < design.length; i++) {
        if(!possibilityTracker[i]) continue

        //we want to find all possible patterns instead of just the first one
        //this is because some patterns may prevent later patterns from working
        availablePatterns.forEach(pattern => {
            if(design.slice(i, i + pattern.length) === pattern) {
                possibilityTracker[i + pattern.length] += possibilityTracker[i]
            }
        })
    }
    return possibilityTracker[design.length]
}

const totalPossibilities = possibleDesigns.reduce((sum, design) => sum + getTotalpossibleCombinations(design), 0)

console.log("Day 19 - part 2 answer", totalPossibilities)

