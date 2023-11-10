import User from "../models/User.js"

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

export const getUserFriends = async (req, res) => {
try {
    const { id } = req.params
    const user = await User.findById(id)
     const friends = []
     for (let friendId of user.friends){
        const { _id, firstName, lastName, occupation, location, picturePath } = await User.findById(friendId)
        friends.push({ _id, firstName, lastName, occupation, location, picturePath })
     }

     res.status(200).json(friends)

    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

       const friends = []
       for (let id of user.friends){
         const friend = await User.findById(id)
         const { _id, firstName, lastName, occupation, location, picturePath } = friend
         friends.push({ _id, firstName, lastName, occupation, location, picturePath })
       }
      
        res.status(200).json(friends)
    } catch (err) {

    }
}
