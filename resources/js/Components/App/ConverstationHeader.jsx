import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import GroupDescriptionPopover from "./GroupDescriptionPopover";
import GroupUsersPopupover from "./GroupUsersPopupover";



const ConverstationHeader = ({ selectedConverstation }) => {

    const onDeleteGroup = () => {
        if (!window.confirm("Are you sure you want to delete this group?")) {
            return;
        }

        axios.delete(route("group.destroy", selectedConverstation.id))
            .then((res)=> {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            {selectedConverstation && (
                <div className="p-3 flex justify-between items-center border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('dashboard')}
                            className="inline-block sm:hidden"
                        >
                            <ArrowLeftIcon className="w-6" />
                        </Link>

                        {selectedConverstation.is_user && (
                            <UserAvatar user={selectedConverstation} />
                        )}

                        {selectedConverstation.is_group && <GroupAvatar />}

                        <div>
                            <h3>{selectedConverstation.name}</h3>
                            {selectedConverstation.is_group && (
                                <p className="text-xs text-gray-500">
                                    {selectedConverstation.users.length} members
                                </p>
                            )}
                        </div>
                    </div>

                    {selectedConverstation.is_group && (
                        <div className="flex gap-3">
                            <GroupDescriptionPopover
                                description={selectedConverstation.description}
                            />

                            <GroupUsersPopupover
                                users={selectedConverstation.users}
                            />

                            {selectedConverstation.owner.id == authUser.id && (
                                <>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Edit Group">

                                        <button
                                            onClick={(ev) =>
                                                emit("GroupModel.show", selectedConverstation)
                                            }
                                            className="text-gray-400 hover:text-gray-200">

                                            <PencilSquareIcon className="w-4" />

                                        </button>

                                    </div>

                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Delete Group">

                                        <button
                                            onClick={onDeleteGroup}
                                            className="text-gray-400 hover:text-gray-200">

                                            <TrashIcon className="w-4" />

                                        </button>

                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );

};

export default ConverstationHeader;
