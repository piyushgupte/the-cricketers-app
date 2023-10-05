 export const calculateAge = (dobEpoch: number) => {
    // Get the current date in epoch time (in seconds)
    const currentDateEpoch = Math.floor(Date.now() / 1000);
    // Convert the DOB epoch time to milliseconds
    const dobMillis = dobEpoch;
    // Calculate the time difference in milliseconds
    const timeDiffMillis = currentDateEpoch * 1000 - dobMillis;
    // Convert milliseconds to years
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Account for leap years
    const age = Math.floor(timeDiffMillis / millisecondsPerYear);
    return age;
}