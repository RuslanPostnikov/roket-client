import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button, CircularProgress, Container, Grid, Pagination} from "@mui/material";
import {fetchNewsByCategory, setCurrentStory} from "../../features/news/newsSlice";
import Story from "./Story/Story";
import {useNavigate} from "react-router";

export interface NewsInterface {
  id: number,
  image: string,
  title: string,
  date: string,
  shortDescription: string,
  likesQuantity: string,
}

const News = () => {
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const { categoryId, news, pages, status, error } = useAppSelector(state => state.news);
  let navigate = useNavigate();

  useEffect(() => {
    if(status === 'idle' && typeof categoryId === 'number') dispatch(fetchNewsByCategory({ id: categoryId, page }));
  }, [dispatch, status, categoryId, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    dispatch(fetchNewsByCategory({ id: categoryId as number, page }))
  };

  const handleStoryChoice = (storyId: number) => {
    dispatch(setCurrentStory(storyId));
  }

  const renderNews = () => {
    if(status === 'loading') {
      return <CircularProgress />
    } else if(status === 'succeeded') {
      return (
        <Container>
          <Button onClick={() => navigate('/')}>Back</Button>
          <Grid container style={{margin: '20px'}} alignItems={'center'} spacing={2}>
            {news.map(story => (
              <Grid item key={story.id} sm={12}
                    style={{cursor: 'pointer'}}
              >
                <Story story={story} handleStoryChoice={handleStoryChoice}/>
              </Grid>
            ))}
            <Pagination count={pages ? pages : undefined} page={page} onChange={handleChange}/>
          </Grid>
        </Container>
      );
    } else if (status === 'failed') {
      return <div>{error}</div>
    }
  }

  return (
    <>
      {renderNews()}
    </>
  );
};

export default News;
