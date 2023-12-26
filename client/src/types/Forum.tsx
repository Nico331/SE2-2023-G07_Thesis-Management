import professor from "./Professor";

export class Topic {
    id: string | null;
    name: string;
    thesis: string;
    creationDate: string;
    closeDate: string | null;
    lastMessage: string | null;
    description: string;
    author: professor | null;
    responseCount: number;
    status: ForumStatus;
    visibility: ForumVisibility;
    viewedBy: ForumUser[];

    constructor(id: string | null, name: string, thesis: string, creationDate: string, closeDate: string | null, lastMessage: string | null, description: string, author: professor, responseCount: number, status: ForumStatus, visibility: ForumVisibility, viewedBy: ForumUser[]) {
        this.id = id;
        this.name = name;
        this.thesis = thesis;
        this.creationDate = creationDate;
        this.closeDate = closeDate;
        this.lastMessage = lastMessage;
        this.description = description;
        this.author = author;
        this.responseCount = responseCount;
        this.status = status;
        this.visibility = visibility;
        this.viewedBy = viewedBy;
    }
    toNewTopic() {
        return {
            name: this.name,
            description: this.description,
            thesis: this.thesis,
            visibility: this.visibility,
        };
    }
}

export class newTopic {
    name: string;
    description: string;
    thesis: string;
    visibility: ForumVisibility;

    constructor(name: string, description: string, thesis: string, visibility: ForumVisibility) {
        this.thesis= thesis;
        this.visibility=visibility;
        this.name = name;
        this.description = description;
    }
}
export enum ForumStatus {
    OPENED,
    CLOSED,
}

export enum ForumVisibility {
    PUBLIC,
    PROTECTED,
    PRIVATE,
}

export interface Professor {
    id: string;
    name: string;
    surname: string;
}

export interface ForumUser {
    id: string;
    name: string;
    surname: string;
}
