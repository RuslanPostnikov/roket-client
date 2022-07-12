import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";

const Story = ({ story }: any) => {
  const title = story.title[0].toUpperCase() + story.title.slice(1);

  return (
    <Card>
      <CardHeader title={title}/>
      <CardMedia
        component={'img'}
        height={'140'}
        image={story.image}
        alt={title}
      />
      <CardContent>
        <Typography variant={'body2'}>{story.shortDescription}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Likes {story.likesQuantity}</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Story;
