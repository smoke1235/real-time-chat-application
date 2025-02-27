
import { usePage } from "@inertiajs/react";

import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ConversationItem from "@/Components/App/ConversationItem";

const ChatLayout = ({children}) => {
    const page = usePage();
    const converstations = page.props.converstations;
    const selectedConverstation = page.props.selectedConversation;
    console.log("converstations", converstations);
    console.log("selectedConverstation", selectedConverstation);

    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    const isUserOnline = (userId) => onlineUsers[userId];
    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(
            converstations.filter((converstation) => {
                return converstation.name.toLowerCase().includes(search);
            })
        )
    }

    useEffect(()=> {
        setLocalConversations(converstations);
    }, [converstations]);

    useEffect(()=> {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                }
                else if (a.blocked_at) {
                    return 1;
                }
                else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    )
                }
                else if (a.last_message_date) {
                    return -1;
                }
                else if (b.last_message_date) {
                    return 1;
                }
                else {
                    return 0;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        Echo.join("online")
        .here((users) => {
            console.log("here", users);
            const onlineUsersObj = Object.fromEntries(
                users.map((user) => [user.id, user])
            );

            setOnlineUsers((prevOnlineUsers) => {
                return {...prevOnlineUsers, ...onlineUsersObj};
            });
        })
        .joining((user) => {
            console.log("joining", user);
            setOnlineUsers((prevOnlineUsers) => {
                const updatedUsers = {...prevOnlineUsers};
                updatedUsers[user.id] = user;
                return updatedUsers;
            })
        })
        .leaving((user) => {
            console.log("leaving", user);
            setOnlineUsers((prevOnlineUsers) => {
                const updatedUsers = {...prevOnlineUsers};
                delete updatedUsers[user.id];
                return updatedUsers;
            })
        })
        .error((error)=> {
            console.error("error", error);
        })

        return () => {
            Echo.leave("online");
        }
    }, []);

    return (
        <>
            <div className="flex-1 w-full flex overflow-hidden">
                <div
                    className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${
                        selectedConverstation ? "-ml-[100%] sm:ml-0" : ""
                    }`}
                >
                    <div className="flex items-center justify-between py-2 px-3 text-xl font-medium text-gray-200">
                        My Conversations
                        <div className="tooltip tooltip-left" data-tip="Create new Group">
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter users and groups"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                            sortedConversations.map((converstation) => (
                                <ConversationItem
                                    key={`${
                                        converstation.is_group
                                            ? "group_"
                                            : "user_"
                                    }${converstation.id}`}
                                    conversation={converstation}
                                    online={!!isUserOnline(converstation.id)}
                                    selectedConverstation={selectedConverstation}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>

            </div>
        </>
    )
}

export default ChatLayout;
