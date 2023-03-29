// import React from "react";
// import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

// let state = {
//     posts: [
//         { id: 1, message: "hi, how are you?", likesCount: 12 },
//         { id: 2, message: "it's my first post", likesCount: 10 },
//     ]
// }

// it('lenght of posts should be incremented', ()=>{
//     let action = addPostActionCreator('niksaaaa');
//     let newState = profileReducer(state, action);
//     expect(newState.posts.length).toBe(5);
//     expect(newState.posts[2].message).toBe('niksaaaa');
// })


// test('message of new post should be correct', () => {
//     let action = addPostActionCreator('niksaaaa')
//     let newState = profileReducer(state, action);
//     expect(newState.posts[2].message).toBe('niksaaaa');
// });

// test('after deleting lenght of message should be decrement', () => {
//     let action = deletePost(1)
//     let newState = profileReducer(state, action);
//     expect(newState.posts.length).toBe(3);
// });

// test('after deleting should not be decrement if id is incorrect', () => {
//     let action = deletePost(1000)
//     let newState = profileReducer(state, action);
//     expect(newState.posts.length).toBe(3);
// });