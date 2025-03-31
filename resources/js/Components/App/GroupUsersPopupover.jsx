import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";



function GroupUsersPopupover({description}) {
    return (
        <Popover className="relative">
            {({open}) => (
                <>
                    <PopoverButton
                        className={`${
                            open ? "text-gray-200" : "text-gray-400"
                        } hover:text-gray-200`}
                    >
                        <ExclamationCircleIcon className="w-4" />
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        anchor="bottom"
                        className="absolute right-0 z-10 mt-3 w-[300px] px-4 sm:px-0"
                    >
                        <div className=" overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="bg-gray-800 p-4">
                                <h2 className="text-lg mb-3">
                                    Description
                                </h2>
                                {description && (
                                    <div className="text-xs">
                                        {description}
                                    </div>
                                )}

                                {!description && (
                                    <div className="text-xs text-gray-500 text-center py-4">
                                        No description is defined.
                                    </div>
                                )}
                            </div>
                        </div>

                    </PopoverPanel>

                </>
            )}
        </Popover>
    );
}

export default GroupUsersPopupover;
