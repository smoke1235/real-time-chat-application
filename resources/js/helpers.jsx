
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

export const isImage = (attachment) => {
    let mime = attachment.mime || attachment.type;

    mime = mime.split("/");
    return mime[0].toLowerCase() === "image";
};

export const isVideo = (attachment) => {
    let mime = attachment.mime || attachment.type;

    mime = mime.split("/");
    return mime[0].toLowerCase() === "video";
};

export const isAudio = (attachment) => {
    let mime = attachment.mime || attachment.type;

    mime = mime.split("/");
    return mime[0].toLowerCase() === "audio";
};

export const isPdf = (attachment) => {
    let mime = attachment.mime || attachment.type;
    return mime === "application/pdf";
};

export const isPreviewable = (attachment) => {
    return (
        isImage(attachment) ||
        isVideo(attachment) ||
        isAudio(attachment) ||
        isPdf(attachment)
    );
};

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) {
        return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals <0 ? 0: decimals;
    const sizes = ['Bytes', 'KB', "MB", "GB"];

    let i = 0;
    let size = bytes;
    while(size >= k) {
        size /= k;
        i++;
    }

    return parseFloat(size.toFixed(dm)) + " " + sizes[i];

}
