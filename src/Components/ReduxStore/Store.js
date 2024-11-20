import { configureStore, createSlice } from "@reduxjs/toolkit";



const postData = createSlice({
    name: 'postData',
    initialState: null,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const comments = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})


const isAlreadySaved = createSlice({
    name: 'isAlreadySaved',
    initialState: false,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})


const isAlreadyLiked = createSlice({
    name: 'isAlreadyLiked',
    initialState: false,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})


const isAlreadyfollowed = createSlice({
    name: 'isAlreadyfollowed',
    initialState: false,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const isRequestedUserExist = createSlice({
    name: 'isRequestedUserExist',
    initialState: true,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})




const savedPosts = createSlice({
    name: 'savedPosts',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const createdPosts = createSlice({
    name: 'createdPosts',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const searches = createSlice({
    name: 'searches',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const totalLikesOnPost = createSlice({
    name: 'totalLikesOnPost',
    initialState: 0,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const isProfileEditable = createSlice({
    name: 'isProfileEditable',
    initialState: false,
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})




const allFollowers = createSlice({
    name: 'allFollowers',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})




const allFollowings = createSlice({
    name: 'allFollowings',
    initialState: [],
    reducers: {
        update: (state, action) => {
            return action.payload;
        }
    }
})



const ReduxStore = configureStore({
    reducer: {
        postData: postData.reducer,
        comments: comments.reducer,
        isAlreadySaved: isAlreadySaved.reducer,
        isAlreadyLiked: isAlreadyLiked.reducer,
        isAlreadyfollowed: isAlreadyfollowed.reducer,
        savedPosts: savedPosts.reducer,
        createdPosts: createdPosts.reducer,
        searches: searches.reducer,
        totalLikesOnPost: totalLikesOnPost.reducer,
        isProfileEditable: isProfileEditable.reducer,
        allFollowers: allFollowers.reducer,
        allFollowings: allFollowings.reducer,
        isRequestedUserExist: isRequestedUserExist.reducer,
    }
})

export const postDataActions = postData.actions;
export const commentsActions = comments.actions;
export const isAlreadySavedActions = isAlreadySaved.actions;
export const isAlreadyLikedActions = isAlreadyLiked.actions;
export const isAlreadyfollowedActions = isAlreadyfollowed.actions;
export const savedPostsActions = savedPosts.actions;
export const createdPostsActions = createdPosts.actions;
export const searchActions = searches.actions;
export const totalLikesActions = totalLikesOnPost.actions;
export const editableActions = isProfileEditable.actions;
export const followersActions = allFollowers.actions;
export const followingsActions = allFollowings.actions;
export const isRequestedUserExistActions = isRequestedUserExist.actions;


export default ReduxStore;