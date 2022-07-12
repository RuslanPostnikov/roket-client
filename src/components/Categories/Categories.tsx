import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCategories} from "../../features/categories/categoriesSlice";
import Category from "./Category/Category";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector(state => state.categories);

  useEffect(() => {
    if(status === 'idle') dispatch(fetchCategories());
  }, [dispatch, status]);

  const renderCategories = () => {
    if(status === 'loading') {
      return <CircularProgress />
    } else if(status === 'succeeded') {
      return (
        <Container>
          <Typography variant={'h3'} style={{ textAlign: 'center' }}>Categories</Typography>
          <Grid container flexDirection={'column'}>
            {categories.map(({id, title}) => (
              <Grid item key={id} style={{ textAlign: 'center' }}>
                <Category title={title} id={id}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    } else if (status === 'failed') {
      return <div>{error}</div>
    }
  }

  return (
    <>
      {renderCategories()}
    </>
  )
}

export default Categories;
