import React from 'react';
import { Card, Grid } from 'semantic-ui-react'
import Post from '../PostCard/PostCard';


export default function ProfilePostDisplay(props){
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 750 }}>
        <Card.Group itemsPerRow="3">
           
               {props.posts.map((post) => {
               return ( 
                       <Post post={post} key={post._id} profileBool={props.profileBool}/>
                   )
               })}
           
        </Card.Group>
       </Grid.Column>
      </Grid>
    )
}