import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { MovieService } from "../../../services/MovieService";
import { IMovie, IMovieChangeSwitch, ISearchCondition } from "../types/CommonTypes";
import { IMovieState, TAction } from "./type";

/**
 * 获取电影数据
 */
export const fetchMovieDataThunk = createAsyncThunk(
  "getMovies",
  async (condition: ISearchCondition, { dispatch, getState }) => {
    // 设置加载状态
    dispatch(setLoadingAction(true));
    // 设置加载条件
    dispatch(changeConditionAction(condition));
    // 获取电影数据
    const result = await MovieService.getMovies((getState() as IMovieState).condition);
    // 更改仓库数据
    dispatch(changeMoviesAction({ movie: result!.data, total: result!.total }));

    // 关闭加载状态
    dispatch(setLoadingAction(false));
  }
);

/**
 * 删除电影
 */
export const deleteMovieThunk = createAsyncThunk("deleteMovie", async (id: string, { dispatch }) => {
  // 设置加载状态
  dispatch(setLoadingAction(true));
  // 删除电影
  const res = await MovieService.delete(id);
  message.success(res?.message);

  // 删除本地仓库电影
  dispatch(deleteMovieAction(id));
  // 关闭加载状态
  dispatch(setLoadingAction(false));
});

/**
 * 切换开关
 */
export const changeSwitchThunk = createAsyncThunk("movieSwitch", async (data: IMovieChangeSwitch, { dispatch }) => {
  const res = await MovieService.edit(data.id, { [data.type]: data.newValue });
  if (res.code === 1) {
    dispatch(changeSwitchAction(data));
    message.success(res.message);
  }
});

const initialState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 6,
    key: "",
  },
  total: 0,
  isLoading: false,
  totalPage: 0,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    changeMoviesAction(state, action: TAction<{ movie: IMovie[]; total: number }>) {
      state.data = action.payload.movie;
      state.total = action.payload.total;
      state.totalPage = Math.ceil(action.payload.total / state.condition.limit);
    },
    changeConditionAction(state, action: TAction<ISearchCondition>) {
      state.condition = {
        ...state.condition,
        ...action.payload,
      };
      state.totalPage = Math.ceil(state.total / state.condition.limit);
    },
    deleteMovieAction(state, action: TAction<string>) {
      state.data = state.data.filter((item) => item._id !== action.payload);
      state.total = state.total - 1;
      state.totalPage = Math.ceil(state.total / state.condition.limit);
    },
    setLoadingAction(state, action: TAction<boolean>) {
      state.isLoading = action.payload;
    },
    changeSwitchAction(state, action: TAction<IMovieChangeSwitch>) {
      state.data.forEach((item) => {
        if (item._id === action.payload.id) {
          item[action.payload.type] = action.payload.newValue;
        }
      });
    },
  },
});

export const { changeConditionAction, changeMoviesAction, deleteMovieAction, setLoadingAction, changeSwitchAction } =
  movieSlice.actions;

export default movieSlice.reducer;
