"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const ChatForum = ({ clerkUser, slug }) => {
    const apiKey = 'qshfzk7b6unm';
    const userId = clerkUser.id;
    const userName = clerkUser.name;
    const userToken = clerkUser.token;

    const user = {
        id: userId,
        name: userName,
        image: `https://getstream.io/random_png/?name=${userName}`,
    };

    const [channel, setChannel] = useState();
    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: userToken,
        userData: user,
    });

    useEffect(() => {
        if (!client) return;

        const channel = client.channel('messaging', slug, {
            image: 'https://getstream.io/random_png/?name=react',
            name: capitalize(slug) + " Discussion",
            // members: [userId],
        });

        setChannel(channel);
        // channel.addMembers([userId])

    }, [client]);

    if (!client) return <div>Setting up client & connection...</div>;

    return (
        <div className='max-h-[90vh] md:pt-20 pt-24'>
            <Chat client={client}>
                <Channel channel={channel}>
                    <div className='h-[90vh] w-full'>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </div >
                </Channel>
            </Chat>
        </div>

    );
}

export default ChatForum
