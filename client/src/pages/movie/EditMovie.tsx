import React, { useEffect, useState } from "react";
import MovieForm from "../../components/MovieForm";
import { IMovie } from "../../redux/modules/types/CommonTypes";
import { MovieService } from "../../services/MovieService";
import { useParams } from "react-router-dom";

const EditMovie: React.FC = function () {
  const { id } = useParams();

  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    MovieService.getMovieById(id!).then((res) => {
      res && setMovie(res.data!);
    });
  }, [id]);

  const onSubmitHandle = async (movie: IMovie): Promise<string | undefined> => {
    const res = await MovieService.edit(id!, movie);
    if (res.code === 0) {
      return res.error!;
    }
    return;
  };

  return (
    <div>
      <MovieForm movie={movie} onSubmit={onSubmitHandle}></MovieForm>
    </div>
  );
};

export default EditMovie;
