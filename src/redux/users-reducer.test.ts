// import usersReducer, { InitialState, actions } from "./users-reducer"

// let state: InitialState;

// beforeEach(() => {
//     state = {
//         users: [
//             {
//                 id: 0, name: 'nika', photos: {
//                     large: null,
//                     small: null
//                 },
//                 status: "hello world",
//                 followed: false
//             },
//             {
//                 id: 1, name: 'vera', photos: {
//                     large: null,
//                     small: null
//                 },
//                 status: "hi world",
//                 followed: false
//             },
//             {
//                 id: 2, name: 'vlada', photos: {
//                     large: null,
//                     small: null
//                 },
//                 status: "toma",
//                 followed: true
//             },
//             {
//                 id: 3, name: 'josik', photos: {
//                     large: null,
//                     small: null
//                 },
//                 status: " world",
//                 followed: true
//             },
//         ],
//         pageSize: 10,
//         totalUsersCount: 0,
//         currentPage: 1,
//         isFetching: true,
//         followingInProgress: []
//     }
// })

// test("follow success", () => {

//     const newState = usersReducer(state, actions.followSuccess(1))

//     expect(newState.users[0].followed).toBeFalsy()
//     expect(newState.users[1].followed).toBeTruthy()
// })

// test("unfollow success", () => {

//     const newState = usersReducer(state, actions.unfollowSuccess(1))

//     expect(newState.users[2].followed).toBeTruthy()
//     expect(newState.users[1].followed).toBeFalsy()
// })