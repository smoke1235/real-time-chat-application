
export const formatMessageDateLong = (date) => {
    const now  = new Date();
    const inputData = new Date(date);

    if (isToday(inputData)) {
        return inputData.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    else if (isYesterday(inputData)) {
        return (
            'Yesterday ' +
            inputData.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    }
    else if (inputData.getFullYear() === now.getFullYear()) {
        return inputData.toLocaleTimeString([], {
            day: "2-digit",
            month: "short",
        });
    }
    else {
        return inputData.toLocaleDateString();
    }
};

export const formatMessageDateShort = (date) => {
    const now  = new Date();
    const inputData = new Date(date);

    if (isToday(inputData)) {
        return inputData.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
    else if (isYesterday(inputData)) {
        return 'Yesterday';
    }
    else if (inputData.getFullYear() === now.getFullYear()) {
        return inputData.toLocaleTimeString([], {
            day: "2-digit",
            month: "short"
        })
    }
    else {
        return inputData.toLocaleDateString();
    }
};

export const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
}
