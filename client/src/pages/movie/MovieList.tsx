import { Button, Card } from "antd";
import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import MovieTable from "../../components/MovieTable";
import {
  changeConditionAction,
  changeSwitchThunk,
  deleteMovieThunk,
  fetchMovieDataThunk,
} from "../../redux/modules/Movie";
import { IMovieState } from "../../redux/modules/Movie/type";
import { SwitchType } from "../../redux/modules/types/CommonTypes";
import { AppThunkDispatch } from "../../redux/store";

const MovieList: React.FC = memo(function () {
  const { condition, data, isLoading, total, totalPage } = useSelector<IMovieState, IMovieState>(
    (state) => state,
    shallowEqual
  );
  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    dispatch(fetchMovieDataThunk({}));
  }, [dispatch]);

  const onSwitchChangeHandle = (type: SwitchType, newValue: boolean, id: string) => {
    dispatch(changeSwitchThunk({ type, newValue, id }));
  };

  const onDeleteHandle = (id: string) => {
    dispatch(deleteMovieThunk(id));
    dispatch(fetchMovieDataThunk({}));
  };

  const onPageChangeHandle = (newPage: number) => {
    dispatch(fetchMovieDataThunk({ page: newPage }));
  };

  const onKeyChangeHandle = (key: string) => {
    dispatch(changeConditionAction({ key }));
  };

  const onSearchHandle = () => {
    dispatch(fetchMovieDataThunk({ page: 1 }));
  };

  const onResetHandle = () => {
    dispatch(changeConditionAction({ key: "", page: 1 }));
    dispatch(fetchMovieDataThunk({}));
  };

  return (
    <div className="movieList">
      <Card title="电影列表" extra={<Button type="primary">添加电影</Button>}>
        <MovieTable
          data={data}
          condition={condition}
          isLoading={isLoading}
          total={total}
          totalPage={totalPage}
          onSwitchChange={onSwitchChangeHandle}
          onDelete={onDeleteHandle}
          onChange={onPageChangeHandle}
          onKeyChange={onKeyChangeHandle}
          onSearch={onSearchHandle}
          onReset={onResetHandle}
        />
      </Card>
    </div>
  );
});

export default MovieList;
