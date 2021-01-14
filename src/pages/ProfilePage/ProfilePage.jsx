import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import PageHeader from '../../components/Header/Header';
import * as likesAPI from '../../utils/likesService';
import { useLocation } from 'react-router-dom';

export default function ProfilePage() {

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()


    async function getProfile() {

        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }



    useEffect(() => {
        getProfile()

    }, [])



    return (

        <>
            { loading ?
                <h1>Loading.....</h1>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ProfileBio user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                            <PostFeed isProfile={true} posts={posts} numPhotosCol={3} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
        </>
    )
}
