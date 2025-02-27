import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";


const ConverstationHeader = ({ selectedConverstation }) => {



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
                </div>
            )}
        </>
    );

};

export default ConverstationHeader;
