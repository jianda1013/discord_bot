interface Channel {
    id: number;
    channelId: string;
}

interface Sticker {
    id: number;
    channelId: string;
    command: string;
    url: string;
}

export { Channel, Sticker };