import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PostState {
  id: number;
  title: string;
  description: string;
  authorID: string;
}

const initialState: { posts: PostState[] } = {
  posts: [
    {
      id: 1,
      title: "Learning Redux Toolkit",
      description:
        "Redux Toolkit is a powerful tool for managing application state in Redux. It simplifies the process of writing Redux code by providing utility functions for creating actions, reducers, and selectors. With Redux Toolkit, you can write less boilerplate code and focus on the logic of your application.",
      authorID: "20",
    },
    {
      id: 2,
      title: "Slices",
      description:
        "In Redux Toolkit, a slice is a collection of Redux logic related to a particular feature or domain of your application. A slice typically contains a reducer function, actions, and selectors, all organized in a single file. By using slices, you can keep your Redux code organized and easy to understand, making it simpler to maintain and scale your application over time.",
      authorID: "3",
    },
  ],
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialState.posts,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, description, authorID, userAgent) => {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            authorID,
          },
          meta: {
            timestamp: new Date().getTime(),
            userAgent,
          },
          error: false,
        };
      },
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { addPost } = postSlice.actions;
export default postSlice.reducer;
