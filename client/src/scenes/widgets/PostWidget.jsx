import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, 
    FavoriteOutlined, ShareOutlined } from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state'
import { server } from 'constants'

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,

}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likesCount = Object.keys(likes).length

    const { palette } = useTheme() 
    const main = palette.neutral.main
    const primary = palette.primary.main

    const patchLike = async () => {
        const response = await fetch(
            `${server}/posts/${postId}/like`,{
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: loggedInUserId })
            })
        const updatedPost = await response.json()
        dispatch(setPost({ post: updatedPost }))
    }
    return (
        <WidgetWrapper margin='2rem 0' >
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{marginTop: '1rem'}}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width='100%'
                    height='auto'
                    alt='post'
                    style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                    src={`${server}/assets/${picturePath}`}
                />
            )}
            <FlexBetween marginTop='0.25rem'>
                <FlexBetween gap='1rem'>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ): (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likesCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={()=>setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box marginTop='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography
                                sx={{ color: main, margin: '0.5rem 0', paddingLeft: '1rem' }}
                            >
                                {comment}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget

//continue at 05:06:20