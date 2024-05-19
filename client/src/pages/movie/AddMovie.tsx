import React from "react";
import MovieForm from "../../components/MovieForm";
import { IMovie } from "../../redux/modules/types/CommonTypes";
import { MovieService } from "../../services/MovieService";

const AddMovie: React.FC = function () {
  const onSubmitHandle = async (movie: IMovie): Promise<string | undefined> => {
    const res = await MovieService.add(movie);
    if (res.code === 0) {
      return res.error!;
    }
    return;
  };

  return (
    <div>
      <MovieForm onSubmit={onSubmitHandle}></MovieForm>
    </div>
  );
};

export default AddMovie;
