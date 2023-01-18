function areInputsEqual(newInputs, lastInputs) {
    // Using for loop for speed. It generally performs better than array.every
    // https://github.com/alexreardon/memoize-one/pull/59
    for (let i = 0; i < newInputs.length; i++) {
        // using shallow equality check
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}
let lastArgs = [];
let lastResult = 0;
function mergeExtraData(...newArgs) {
    if (areInputsEqual(newArgs, lastArgs)) {
        return lastResult;
    }
    // Something shallowly changed - return a new number from [0-10]
    lastResult = lastResult === 10 ? 0 : lastResult + 1;
    lastArgs = newArgs;
    return lastResult;
}
export default mergeExtraData;
