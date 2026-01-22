import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ICourseItem {
  id: string;
  slug: string;
  title: string;
  moduleId: string;
  moduleSlug: string;
  lessonId: string;
  lessonSlug: string;
}

interface IInitialState {
  courses: ICourseItem[];
}

const initialState: IInitialState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    addCourse: (state, action: PayloadAction<ICourseItem>) => {
      state.courses.push(action.payload);
    },

    setCourses: (state, action: PayloadAction<ICourseItem[]>) => {
      state.courses = action.payload;
    },

    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCourse, removeCourse, setCourses } = courseSlice.actions;
export default courseSlice.reducer;
