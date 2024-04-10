import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { RootState } from "../store";

export interface ReactionState {
  like: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface PostState {
  id: string;
  title: string;
  description: string;
  authorID: string;
  timestamp: string;
  reactions: ReactionState;
}

const initialState: { posts: PostState[] } = {
  posts: [
    {
      id: "1",
      title: "Learning Redux Toolkit",
      description:
        "Redux Toolkit is a powerful tool for managing application state in Redux. It simplifies the process of writing Redux code by providing utility functions for creating actions, reducers, and selectors. With Redux Toolkit, you can write less boilerplate code and focus on the logic of your application.",
      authorID: "20",
      timestamp: sub(new Date(), { minutes: 60 }).toISOString(),
      reactions: {
        like: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
    {
      id: "2",
      title: "Slices",
      description:
        "In Redux Toolkit, a slice is a collection of Redux logic related to a particular feature or domain of your application. A slice typically contains a reducer function, actions, and selectors, all organized in a single file. By using slices, you can keep your Redux code organized and easy to understand, making it simpler to maintain and scale your application over time.",
      authorID: "3",
      timestamp: sub(new Date(), { days: 2 }).toISOString(),
      reactions: {
        like: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
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
            timestamp: new Date().toISOString(),
            reactions: {
              like: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
          meta: {
            userAgent,
          },
          error: false,
        };
      },
    },
    addReaction: (state, action) => {
      const { postID, reaction } = action.payload;
      const existingPost: any = state.find((post) => post.id === postID);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { addPost, addReaction } = postSlice.actions;
export default postSlice.reducer;
