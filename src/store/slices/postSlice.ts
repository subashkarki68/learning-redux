import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
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
  body: string;
  userId: string;
  timestamp: string;
  reactions: ReactionState;
}

export interface PostsState {
  posts: PostState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, description, userId, userAgent) => {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            userId,
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
      const existingPost: any = state.posts.find((post) => post.id === postID);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: PostState) => {
          post.timestamp = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            coffee: 0,
            heart: 0,
            like: 0,
            rocket: 0,
            wow: 0,
          };
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { addPost, addReaction } = postSlice.actions;
export default postSlice.reducer;
