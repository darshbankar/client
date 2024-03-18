import React, { useEffect, useState } from 'react'

import { Avatar, useChatContext } from 'stream-chat-react'

import { InviteIcon } from '../assets/InviteIcon'

const ListContainer = ({ children }) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user}) => {
    const [selected, setselected] = useState(false)
    return (
        <div className='user-item__wrapper'>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} user={user.fullName || user.id}  size={32}/>
                <p className='user-item__name'>{user.fullName || user.id}</p>
            </div>
            {selected? <InviteIcon /> : <div className='user-item__invite-empty'></div>}
           
        </div>
    )
}

const UserList = () => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setloading] = useState(false);
    const [listEmpty, setlistEmpty] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setloading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );
                if (response.users.length) {
                    setUsers(response.users);
                } else {
                    setlistEmpty(true);
                }
            } catch (error) {
                console.log(error);
            }

            setloading(false);
        }

        if (client) getUsers()
    }, [])
    return (
        <ListContainer>
            {loading ? <div className='user-list__message'>
                Loading users...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} />
                ))
            )}
        </ListContainer>
    )
}

export default UserList