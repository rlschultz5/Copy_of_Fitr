import filterWorkout from "../utility/filterWorkout"

//Sample Test
describe('truth', () => {
    it('is true', () => {
        expect(true).toEqual(true);
    });
});

//Filter Function Test
describe('Filter Workout Function', () => {
    const data = [{
        title: "4v4 Basketball at the Nick!",
        level: "All",
        sports: "Basketball",
        location: "Nick court 3",
        capacity: 8,
        filled: 3
    }, {
        title: "Casual Jog around Campus",
        level: "All",
        sports: "Running",
        location: "College Library",
        capacity: 12,
        filled: 3
    }]

    it('filters workout when one filter property', () => {
        expect(filterWorkout(data, { sports: "Running" })).toEqual([{
            title: "Casual Jog around Campus",
            level: "All",
            sports: "Running",
            location: "College Library",
            capacity: 12,
            filled: 3
        }]);
    })
    it('filters workout when multiple filter property', () => {
        expect(filterWorkout(data, { sports: "Running", capacity: 12 })).toEqual([{
            title: "Casual Jog around Campus",
            level: "All",
            sports: "Running",
            location: "College Library",
            capacity: 12,
            filled: 3
        }]);
    });
    it('filters multiple workouts', () => {
        expect(filterWorkout(data, { level: "All"})).toEqual(data);
    });
    it('returns all workouts no filter', () => {
        expect(filterWorkout(data, {})).toEqual(data);
    });
});
