export default (workouts, filter) => {

    let callback = (workout) => {
        for(let key in filter) {
            if(workout[key] !== filter[key])
            return false
        }

       return true
    };
    return workouts.filter(callback);
}