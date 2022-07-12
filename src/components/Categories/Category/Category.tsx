import React from 'react';
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {setCategoryId} from "../../../features/news/newsSlice";

export interface CategoryInterface {
  id: number,
  title: string,
}

const Category = ({ title, id }: CategoryInterface ) => {
  const dispatch = useAppDispatch();

  return (
    <Typography variant={'h6'}>
      <Button component={Link} to={`/categories/${id}`} onClick={() => dispatch(setCategoryId(id))}>{title}</Button>
    </Typography>
  );
}

export default Category;
