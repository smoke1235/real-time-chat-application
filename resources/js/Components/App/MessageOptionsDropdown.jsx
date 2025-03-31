
import { useEventBus } from "@/EventBus";
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";


import { Fragment } from "react";

function MessageOptionsDropdown ({message}) {
    const { emit } = useEventBus();

    const onMessageDelete = () => {
        console.log("Delete message");

        axios
            .delete(route("message.destroy", message.id))
            .then((res) => {
                emit("message.deleted", {
                    message,
                    prevMessage: res.data.message
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className=" absolute right-full text-gray-100 top-1/2 -translate-y-1/2 z-10">
            <Menu as="div" className="relative inline-blocks text-left">
                <div>
                    <MenuButton className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </MenuButton>
                </div>


                    <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                       <div className="px-1 py-1">
                            <MenuItem>
                                {({focus}) => (
                                    <button
                                        onClick={onMessageDelete}
                                        className={`
                                            ${focus
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                            }
                                            group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <TrashIcon className="w-4 h-4 mr-2" />
                                        Delete
                                    </button>
                                )}
                            </MenuItem>
                        </div>


                    </MenuItems>


            </Menu>
        </div>
    );
}

export default MessageOptionsDropdown;
